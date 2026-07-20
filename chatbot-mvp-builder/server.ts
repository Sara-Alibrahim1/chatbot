import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Initialize Groq Client
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  // Endpoint to handle chat interaction
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, faqContext, businessInfo } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

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
3. If the user asks something outside the FAQ database, generate a logical and helpful response aligned with the business identity, location, and tone.
4. ABSOLUTE BREVITY: Keep your responses short, concise, and easy to read (1 to 3 sentences maximum).
      `;

      const messages = [
        { role: "system", content: systemInstruction },
        ...(Array.isArray(history) ? history.map((msg: any) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text
        })) : []),
        { role: "user", content: message }
      ];

      const completion = await groq.chat.completions.create({
        messages: messages as any,
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 200,
      });

      const reply = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Groq Chat API Error:", error);
      res.status(500).json({ error: error.message || "An error occurred during chat processing" });
    }
  });

  // Endpoint to generate 50 custom questions and answers
  app.post("/api/generate-faq", async (req, res) => {
    try {
      const { name, type, city, tone, customPrompt } = req.body;

      if (!type || !city) {
        return res.status(400).json({ error: "Please specify the business type and city." });
      }

      const prompt = `
Generate a complete set of exactly 50 customer FAQ items in valid JSON format for:
- Business Name: ${name || "Mujeeb Support"}
- Industry/Type: ${type}
- City: ${city}
- Brand Tone: ${tone || "Casual & Friendly"}
- Additional Details: ${customPrompt || "None"}

Requirements:
Return ONLY a raw JSON Array of 50 objects without markdown formatting or code blocks.
Each object must have:
- "category": String (One of: "General & About", "Products & Services", "Pricing & Discounts", "Location & Hours", "Support & Policies")
- "question": String
- "answer": String (1-3 sentences)
Distribution: 10 items per category.
      `;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You output valid, raw JSON arrays only. Do not wrap in ```json blocks." },
          { role: "user", content: prompt }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const content = completion.choices[0]?.message?.content || "[]";
      
      // Parse JSON safely
      let generatedFAQs;
      try {
        const parsed = JSON.parse(content);
        generatedFAQs = Array.isArray(parsed) ? parsed : (parsed.faqs || parsed.items || []);
      } catch {
        generatedFAQs = [];
      }

      res.json({ faqs: generatedFAQs });
    } catch (error: any) {
      console.error("Groq Generate FAQ API Error:", error);
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
