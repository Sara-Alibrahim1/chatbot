import React, { useState, useRef, useEffect } from "react";
import { FAQItem, BusinessInfo, Message } from "../types";
import { Send, Phone, Video, MoreVertical, CheckCheck, HelpCircle, Bot, Smartphone, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatSimulatorProps {
  businessInfo: BusinessInfo;
  faqs: FAQItem[];
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onSendMessage: (text: string) => Promise<void>;
  isSending: boolean;
}

export default function ChatSimulator({
  businessInfo,
  faqs,
  messages,
  setMessages,
  onSendMessage,
  isSending,
}: ChatSimulatorProps) {
  const [inputText, setInputText] = useState<string>("");
  const [quickSearch, setQuickSearch] = useState<string>("");
  const [showQuickReplies, setShowQuickReplies] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // Handle submit text
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isSending) return;
    const text = inputText;
    setInputText("");
    onSendMessage(text);
  };

  // Click on a quick reply question
  const handleQuickReplyClick = (faq: FAQItem) => {
    if (isSending) return;
    onSendMessage(faq.question);
  };

  // Filter quick replies based on search query
  const filteredQuickReplies = faqs.filter((f) =>
    f.question.toLowerCase().includes(quickSearch.toLowerCase())
  );

  // Clear chat history
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        text: `Welcome! Thanks for reaching out to ${businessInfo.name} in ${businessInfo.city}. I am your smart AI support assistant (chatbot MVP sandbox). How can I help you today? You can choose from the quick-replies below or type a custom question!`,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
    ]);
  };

  // Find if a message matches any of the FAQ answers to highlight the source
  const findMatchingFaq = (text: string) => {
    return faqs.find((f) => 
      text.toLowerCase().includes(f.answer.toLowerCase()) || 
      f.answer.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <div id="chat-simulator-container" className="flex flex-col h-full bg-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-lg text-white">
      {/* Container header info */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-blue-400" />
          <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">Interactive Chatbot Sandbox</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>WhatsApp API Channel • {businessInfo.city}</span>
        </div>
      </div>

      {/* Simulated Smartphone Frame */}
      <div className="relative flex-1 bg-slate-950/85 rounded-3xl border-4 border-white/10 overflow-hidden shadow-2xl flex flex-col min-h-[500px]">
        
        {/* Smartphone top bar (status, notch) */}
        <div className="bg-[#054c44]/90 backdrop-blur-md text-white/95 text-[10px] px-5 py-1.5 flex justify-between items-center relative z-20 select-none font-mono">
          <span>09:41 ☕</span>
          {/* Notch */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-slate-950 h-3 w-24 rounded-b-xl" />
          <div className="flex items-center gap-1">
            <span>5G</span>
            <div className="w-2.5 h-1.5 bg-white/80 rounded-2xs" />
          </div>
        </div>

        {/* WhatsApp App Header */}
        <div className="bg-[#054c44]/80 backdrop-blur-md px-3 py-2.5 flex items-center justify-between border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center">
                <Bot className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400 rounded-full border-2 border-[#054c44]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white leading-none tracking-tight truncate max-w-[140px]">
                {businessInfo.name}
              </h4>
              <span className="text-[9px] text-blue-200 font-medium">Chatbot Agent Online</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <Video className="w-4 h-4 cursor-pointer hover:text-white" />
            <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
            <div className="dropdown relative group">
              <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              <div className="absolute right-0 mt-2 w-32 bg-slate-900 rounded-lg shadow-lg border border-white/10 py-1 hidden group-hover:block text-[11px] text-slate-200">
                <button 
                  onClick={handleClearChat}
                  className="w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Reset Conversation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Message scroll area */}
        <div 
          className="flex-1 overflow-y-auto p-3.5 space-y-3.5 relative" 
          style={{ 
            backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", 
            backgroundBlendMode: "overlay",
            backgroundColor: "#080f14"
          }}
        >
          <div className="flex justify-center my-0.5">
            <span className="bg-white/5 backdrop-blur-md text-slate-400 text-[9px] px-2.5 py-0.5 rounded-md border border-white/5 select-none text-center">
              🔒 End-to-End Encrypted • MVP Test Environment
            </span>
          </div>

          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isBot = msg.sender === "bot";
              const matchedFaq = isBot ? findMatchingFaq(msg.text) : null;

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className={`flex ${isBot ? "justify-start" : "justify-end"} items-end gap-1.5`}
                >
                  {isBot && (
                    <div className="w-5.5 h-5.5 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  <div className="max-w-[85%] flex flex-col">
                    <div
                      className={`p-2.5 rounded-xl shadow-sm text-xs leading-relaxed relative ${
                        isBot
                          ? "bg-slate-900/90 text-white border border-white/10 rounded-tl-none"
                          : "bg-blue-600 text-white rounded-tr-none"
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs font-normal">{msg.text}</p>
                      
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[8px] text-slate-400 select-none">
                          {msg.timestamp}
                        </span>
                        {!isBot && <CheckCheck className="w-3 h-3 text-blue-300" />}
                      </div>
                    </div>

                    {/* Source mapping indicators */}
                    {isBot && (
                      <div className="mt-1 flex items-center gap-1 px-1">
                        {matchedFaq ? (
                          <span className="text-[9px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded px-1.5 py-0.2">
                            Direct Hit: {matchedFaq.category}
                          </span>
                        ) : msg.id === "welcome" ? null : (
                          <span className="text-[9px] font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded px-1.5 py-0.2 flex items-center gap-1">
                            <span>AI Answer (Out of Sandbox)</span>
                            <span className="w-1 h-1 bg-purple-400 rounded-full animate-ping" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isSending && (
            <div className="flex justify-start items-center gap-1.5">
              <div className="w-5.5 h-5.5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-slate-900/90 text-slate-300 rounded-xl rounded-tl-none p-2.5 shadow-sm text-xs flex items-center gap-1 border border-white/5">
                <span>Typing</span>
                <span className="inline-flex gap-0.5">
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-100" />
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-200" />
                  <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce delay-300" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies panel (Predefined FAQs) */}
        {showQuickReplies && (
          <div className="bg-[#0b141a]/95 border-t border-white/10 p-2.5 h-44 flex flex-col backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-blue-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                Predefined Knowledge Base (Click to test)
              </span>
              <button
                onClick={() => setShowQuickReplies(false)}
                className="text-[9px] bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-1.5 py-0.5 rounded-md transition-all cursor-pointer"
              >
                Hide
              </button>
            </div>

            {/* Mini search inside quick replies */}
            <div className="relative mb-1.5 shrink-0">
              <input
                type="text"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg pl-3 pr-8 py-1 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                placeholder="Filter predefined questions..."
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
              {filteredQuickReplies.map((faq, index) => (
                <button
                  key={faq.id}
                  onClick={() => handleQuickReplyClick(faq)}
                  className="w-full text-left bg-white/5 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/20 p-1.5 rounded text-[11px] text-slate-200 hover:text-blue-300 transition-all block truncate cursor-pointer"
                  title={faq.question}
                >
                  <span className="font-bold text-slate-500 mr-1.5">#{index + 1}</span>
                  {faq.question}
                </button>
              ))}
              {filteredQuickReplies.length === 0 && (
                <div className="text-center py-5 text-[10px] text-slate-500">
                  No matching questions found
                </div>
              )}
            </div>
          </div>
        )}

        {/* Closed Quick replies activator */}
        {!showQuickReplies && (
          <div className="bg-slate-900/40 border-t border-white/10 p-1.5 flex justify-center backdrop-blur-md relative z-10">
            <button
              onClick={() => setShowQuickReplies(true)}
              className="text-[11px] text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Show Knowledge Base Questions
            </button>
          </div>
        )}

        {/* WhatsApp Chat Input */}
        <form onSubmit={handleSubmit} className="bg-slate-900/90 p-2 flex items-center gap-2 relative z-10 border-t border-white/10 backdrop-blur-md">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-white/5 text-white text-xs rounded-full px-3.5 py-1.5 focus:outline-none border border-white/10 focus:bg-white/10 focus:border-blue-500/50 placeholder-slate-400"
            placeholder={isSending ? "Waiting for response..." : "Ask the chatbot anything..."}
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${
              !inputText.trim() || isSending
                ? "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
                : "bg-blue-600 hover:bg-blue-500 text-white active:scale-95 shadow-md shadow-blue-500/20 cursor-pointer"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
