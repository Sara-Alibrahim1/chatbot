import React, { useState } from "react";
import { FAQItem, BusinessInfo, BUSINESS_TYPES, SAUDI_CITIES, TONES, FAQ_CATEGORIES } from "../types";
import { Sparkles, Search, Edit2, Check, RefreshCw, AlertCircle, FileText, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQManagerProps {
  businessInfo: BusinessInfo;
  setBusinessInfo: React.Dispatch<React.SetStateAction<BusinessInfo>>;
  faqs: FAQItem[];
  setFaqs: (faqs: FAQItem[]) => void;
  onGenerateAI: () => Promise<void>;
  isGenerating: boolean;
}

export default function FAQManager({
  businessInfo,
  setBusinessInfo,
  faqs,
  setFaqs,
  onGenerateAI,
  isGenerating,
}: FAQManagerProps) {
  const [activeCategory, setActiveCategory] = useState<string>(FAQ_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuestion, setEditQuestion] = useState<string>("");
  const [editAnswer, setEditAnswer] = useState<string>("");

  // Filter FAQs based on search and selected category (if not searching)
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (searchQuery) {
      return matchesSearch;
    }
    
    return faq.category === activeCategory && matchesSearch;
  });

  // Start inline editing
  const handleStartEdit = (faq: FAQItem) => {
    setEditingId(faq.id);
    setEditQuestion(faq.question);
    setEditAnswer(faq.answer);
  };

  // Save inline edit
  const handleSaveEdit = (id: string) => {
    if (!editQuestion.trim() || !editAnswer.trim()) return;
    const updated = faqs.map((f) =>
      f.id === id ? { ...f, question: editQuestion, answer: editAnswer } : f
    );
    setFaqs(updated);
    setEditingId(null);
  };

  // Quick reset to default
  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset the questions and business info to the default Cloud Cafe settings?")) {
      import("../defaultData").then((data) => {
        setFaqs(data.DEFAULT_FAQS);
        setBusinessInfo(data.DEFAULT_BUSINESS_INFO);
      });
    }
  };

  // Count FAQs per category for indicators
  const getCategoryCount = (category: string) => {
    return faqs.filter((f) => f.category === category).length;
  };

  return (
    <div id="faq-manager-container" className="bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-lg p-5 flex flex-col h-full text-white">
      {/* Header Information & Business Specs */}
      <div id="faq-manager-header" className="mb-5 border-b border-white/10 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              FAQ Database Manager
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Configure business details and generate/edit the 50 customer FAQs.
            </p>
          </div>
          <button
            id="reset-defaults-btn"
            onClick={handleResetToDefault}
            className="text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5 transition-all self-start cursor-pointer"
          >
            Reset to Default
          </button>
        </div>

        {/* Business Settings Form */}
        <div id="business-config-form" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-white/5 p-3.5 rounded-xl border border-white/10">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Business Name</label>
            <input
              type="text"
              value={businessInfo.name}
              onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
              className="w-full text-xs bg-slate-900/60 border border-white/10 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-blue-500/50"
              placeholder="e.g., Cloud Cafe"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Industry Type</label>
            <select
              value={businessInfo.type}
              onChange={(e) => setBusinessInfo({ ...businessInfo, type: e.target.value })}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-blue-500/50"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type.value} value={type.value} className="bg-slate-950 text-white">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target City</label>
            <select
              value={businessInfo.city}
              onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-blue-500/50"
            >
              {SAUDI_CITIES.map((city) => (
                <option key={city.value} value={city.value} className="bg-slate-950 text-white">
                  {city.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Brand Tone</label>
            <select
              value={businessInfo.tone}
              onChange={(e) => setBusinessInfo({ ...businessInfo, tone: e.target.value })}
              className="w-full text-xs bg-slate-900 border border-white/10 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-blue-500/50"
            >
              {TONES.map((tone) => (
                <option key={tone.value} value={tone.value} className="bg-slate-950 text-white">
                  {tone.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 md:col-span-4 mt-0.5">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Additional Brand Context / Key Offerings</label>
            <input
              type="text"
              value={businessInfo.customPrompt}
              onChange={(e) => setBusinessInfo({ ...businessInfo, customPrompt: e.target.value })}
              className="w-full text-xs bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500/50"
              placeholder="e.g., Offers light breakfast, premium imported beans, study-friendly spaces..."
            />
          </div>
        </div>

        {/* Generate with AI Button */}
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Customize parameters above and click generate to populate new smart FAQs.</span>
          </div>
          <button
            id="ai-generate-btn"
            disabled={isGenerating}
            onClick={onGenerateAI}
            className={`flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer select-none ${
              isGenerating
                ? "bg-blue-500/10 text-blue-300 border border-blue-500/20 cursor-not-allowed animate-pulse"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Generating 50 FAQs...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Generate FAQs with AI ✨
              </>
            )}
          </button>
        </div>
      </div>

      {/* Search & Categories Navigation */}
      <div id="faq-search-navigation" className="mb-3">
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
            placeholder="Search questions or answers..."
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Database Status Tracker */}
        <div id="database-status-bar" className="flex items-center justify-between bg-blue-500/5 border border-blue-500/20 rounded-xl px-3.5 py-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            <span className="text-xs font-semibold text-blue-300">
              Active Knowledge Base (MVP Sandbox Mode)
            </span>
          </div>
          <div className="text-[10px] font-bold text-blue-200 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
            Total FAQs: <span className="text-xs font-extrabold">{faqs.length}</span>
          </div>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div id="category-tabs" className="flex gap-1 overflow-x-auto pb-1.5 border-b border-white/10">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                      : "bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* FAQ Scrollable List */}
      <div id="faq-scrollable-list" className="flex-1 overflow-y-auto space-y-2 max-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-white/5 rounded-xl border border-dashed border-white/10">
              <AlertCircle className="w-6 h-6 text-slate-500 mb-2" />
              <p className="text-xs">No matching results found</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isEditing = editingId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 hover:border-white/10 transition-all shadow-md group"
                >
                  {isEditing ? (
                    <div className="space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">Question</label>
                        <input
                          type="text"
                          value={editQuestion}
                          onChange={(e) => setEditQuestion(e.target.value)}
                          className="w-full text-xs border border-blue-500/50 bg-slate-900/60 text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">Answer</label>
                        <textarea
                          rows={2}
                          value={editAnswer}
                          onChange={(e) => setEditAnswer(e.target.value)}
                          className="w-full text-xs border border-blue-500/50 bg-slate-900/60 text-white rounded-lg px-2.5 py-1.5 focus:outline-none"
                        />
                      </div>
                      <div className="flex gap-1.5 justify-end">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-[11px] px-2 py-1 text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(faq.id)}
                          className="flex items-center gap-1 text-[11px] bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-extrabold bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-md mt-0.5">
                            Q{index + 1}
                          </span>
                          <h3 className="text-xs font-semibold text-white leading-relaxed">
                            {faq.question}
                          </h3>
                        </div>
                        <button
                          onClick={() => handleStartEdit(faq)}
                          className="text-slate-400 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="ml-7 mt-1.5 bg-white/5 rounded-lg p-2.5 border border-white/5">
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                      <div className="ml-7 mt-1 flex justify-between items-center text-[9px] text-slate-400">
                        <span>{faq.category}</span>
                        <span>Instantly active in chat simulator</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
