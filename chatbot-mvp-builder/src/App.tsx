import React, { useState } from "react";
import { BusinessInfo, FAQItem, Message } from "./types";
import { DEFAULT_BUSINESS_INFO, DEFAULT_FAQS } from "./defaultData";
import FAQManager from "./components/FAQManager";
import ChatSimulator from "./components/ChatSimulator";
import { Bot, BookOpen, MessageSquare, Settings, ShieldCheck, HelpCircle } from "lucide-react";

export default function App() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(DEFAULT_BUSINESS_INFO);
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"chat" | "faq">("chat");
  
  // Initialize messages with welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: `Welcome! Thanks for reaching out to ${DEFAULT_BUSINESS_INFO.name} in ${DEFAULT_BUSINESS_INFO.city}. I am your smart AI support assistant (chatbot MVP sandbox). How can I help you today? You can choose from the quick-replies below or type a custom question!`,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  // Handler to trigger AI FAQ Generation
  const handleGenerateFAQ = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: businessInfo.name,
          type: businessInfo.type,
          city: businessInfo.city,
          tone: businessInfo.tone,
          customPrompt: businessInfo.customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate FAQs from the server.");
      }

      const data = await response.json();
      
      if (Array.isArray(data.faqs) && data.faqs.length > 0) {
        // Add random IDs to make them editable
        const mappedFaqs = data.faqs.map((f: any, idx: number) => ({
          id: `ai_${idx}_${Date.now()}`,
          category: f.category || "General & About",
          question: f.question,
          answer: f.answer,
        }));
        setFaqs(mappedFaqs);

        // Append a bot system-message notification in the chat
        const systemMessageText = `✨ Chatbot intelligence successfully updated! 
We have generated 50 smart, brand-tailored FAQs for [${businessInfo.name}] in the city of [${businessInfo.city}] with a [${businessInfo.tone}] brand tone.

I am now ready to answer your questions based on this updated data!`;
        
        setMessages((prev) => [
          ...prev,
          {
            id: `sys_${Date.now()}`,
            text: systemMessageText,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          }
        ]);
        
        // Auto switch back to simulator so they can test immediately
        setActiveTab("chat");
      } else {
        alert("Alert: Received response was not in the expected format. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      alert(`Sorry, an error occurred during AI generation: ${error.message || "Please check your API key"}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler to send a message to Chatbot
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsgId = `user_${Date.now()}`;
    const userMessage: Message = {
      id: userMsgId,
      text: text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };

    // Optimistically update message history on client
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: updatedMessages.slice(-6), // Send last 6 messages to keep context efficient
          faqContext: faqs, // The complete customizable FAQs
          businessInfo: businessInfo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the smart server.");
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          text: data.reply || "Sorry, I couldn't quite understand your inquiry.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          text: "⚠️ Connection error. Please make sure the backend server is running and a valid Gemini API key is configured in the Secrets panel.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-[#0d121f] text-slate-100 font-sans flex flex-col relative overflow-x-hidden" dir="ltr">
      {/* Background Decorative Blur Blobs for beautiful Frosted Glass theme */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[30%] left-[25%] w-[400px] h-[400px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Global Header */}
      <header id="main-app-header" className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Bot className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="text-md font-extrabold text-white tracking-tight">
                Mujeeb AI
              </h1>
              <p className="text-[10px] text-slate-400 font-medium">
                Customer Support Chatbot Sandbox
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md px-2 py-0.5 flex items-center gap-1 uppercase tracking-wider">
              <span className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              Live Bot Sandbox
            </span>
          </div>
        </div>
      </header>

      {/* Modern Centered Tab Controller */}
      <div className="max-w-md w-full mx-auto px-4 pt-6 relative z-10">
        <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "chat"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            💬 Chatbot Simulator
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === "faq"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            ⚙️ Configure 50 FAQs
          </button>
        </div>

        {/* Small live status indicator banner */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3 h-3 text-purple-400" />
            Database contains <strong className="text-white">{faqs.length} FAQs</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            Zero-Hallucination Fallback
          </span>
        </div>
      </div>

      {/* Main Single Column Workspace */}
      <main id="main-workspace-content" className="w-full flex-1 flex flex-col items-center justify-center py-4 px-4 relative z-10">
        {activeTab === "chat" ? (
          <section id="chat-simulator-section" className="max-w-md w-full flex flex-col h-[650px]">
            <ChatSimulator
              businessInfo={businessInfo}
              faqs={faqs}
              messages={messages}
              setMessages={setMessages}
              onSendMessage={handleSendMessage}
              isSending={isSending}
            />
          </section>
        ) : (
          <section id="faq-manager-section" className="max-w-3xl w-full flex flex-col h-full">
            <FAQManager
              businessInfo={businessInfo}
              setBusinessInfo={setBusinessInfo}
              faqs={faqs}
              setFaqs={setFaqs}
              onGenerateAI={handleGenerateFAQ}
              isGenerating={isGenerating}
            />
          </section>
        )}
      </main>

      {/* Elegant Compact Footer */}
      <footer id="main-app-footer" className="bg-black/10 border-t border-white/5 py-4 select-none text-center relative z-10 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Mujeeb AI Support Sandbox.</p>
          <div className="flex items-center gap-2">
            <span>50 structured categories active</span>
            <span className="w-1 h-1 bg-white/10 rounded-full" />
            <span>Tone & brand-adaptive fallback</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
