import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Initialize Gemini Client with standard headers
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Endpoint to handle chat interaction with simulation
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, faqContext, businessInfo } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Convert FAQs array to readable format for system prompt
      const formattedFAQs = Array.isArray(faqContext) 
        ? faqContext.map((item: any, i: number) => `Q${i + 1}: ${item.question}\nA${i + 1}: ${item.answer}`).join("\n\n")
        : "No previous FAQs database available currently.";

      const systemInstruction = `
You are an intelligent, friendly Customer Support Chatbot (MVP) representing:
- Business Name: ${businessInfo?.name || "Our Business"}
- Industry/Type: ${businessInfo?.type || "Retail & Services"}
- Location/City: ${businessInfo?.city || "Riyadh"}
- Conversation Tone & Style: ${businessInfo?.tone || "Casual & Friendly"}

Your knowledge base is strictly defined by the following Top Customer FAQ list:
${formattedFAQs}

CRITICAL GUIDELINES:
1. Respond in English. Match the requested tone and style precisely.
2. If the user asks a question that matches or is highly similar to one of the FAQs, answer it using the pre-defined FAQ answer. Keep it accurate and direct.
3. If the user asks something outside the FAQ database, generate a logical and helpful response aligned with the business identity, location, and tone. Politely state that for specific pricing/details not covered, they can leave their contact details or keep the answer short.
4. ABSOLUTE BREVITY: Keep your responses short, concise, and easy to read (1 to 3 sentences maximum).
      `;

      const contents = [
        ...(Array.isArray(history) ? history.map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        })) : []),
        {
          role: "user",
          parts: [{ text: message }]
        }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text || "I'm sorry, I couldn't quite understand that." });
    } catch (error: any) {
      console.error("Gemini Chat API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred during chat processing" });
    }
  });

  // Endpoint to generate 50 custom questions and answers using Gemini API structured schema
  app.post("/api/generate-faq", async (req, res) => {
    try {
      const { name, type, city, tone, customPrompt } = req.body;

      if (!type || !city) {
        return res.status(400).json({ error: "Please specify the business type and city." });
      }

      const prompt = `
Generate a complete, high-quality, smart set of exactly 50 customer FAQ items in English for:
- Business Name: ${name || "Mujeeb Support"}
- Industry/Type: ${type}
- City: ${city}
- Brand Tone: ${tone || "Casual & Friendly"}
- Additional Context/Details: ${customPrompt || "None"}

Please generate exactly 50 high-value FAQs, distributing them evenly with exactly 10 items in each of the following 5 categories:
1. "General & About"
2. "Products & Services"
3. "Pricing & Discounts"
4. "Location & Hours"
5. "Support & Policies"
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a professional customer experience designer and builder of high-conversion corporate FAQ lists. You write clean, direct, brand-aligned English questions and answers.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "List of exactly 50 FAQ items distributed across the 5 categories (10 items per category)",
            items: {
              type: Type.OBJECT,
              properties: {
                category: { 
                  type: Type.STRING, 
                  description: "Name of the category, must be one of the 5 listed above exactly" 
                },
                question: { 
                  type: Type.STRING, 
                  description: "Frequently asked question from a customer" 
                },
                answer: { 
                  type: Type.STRING, 
                  description: "Short, clear answer (1-3 sentences max) matching the tone and city" 
                }
              },
              required: ["category", "question", "answer"]
            }
          },
          temperature: 0.8,
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No valid response received from model");
      }

      const generatedFAQs = JSON.parse(responseText);
      res.json({ faqs: generatedFAQs });
    } catch (error: any) {
      console.error("Gemini Generate FAQ API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred while generating FAQs" });
    }
  });

  // Setup Vite Dev server or production static serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted (Development Mode)");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Static file serving active (Production Mode)");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal Server Bootstrap Error:", err);
});
