import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { chatWithPortfolio } from '../services/geminiService';
import { ChatMessage } from '../types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Muhamed's AI Assistant. Ask me about his experience with FIDIC claims, AutoLISP automation, or his QS background." }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithPortfolio(userMsg, history);

    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 rounded-full shadow-lg shadow-blue-900/50 transition-all duration-300 bg-blue-600 text-white hover:bg-blue-500 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Interface - Responsive: Full screen on mobile, Widget on Desktop */}
      <div className={`fixed z-50 transition-all duration-300 transform 
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}
        bottom-0 right-0 w-full h-[100dvh] rounded-none
        md:bottom-6 md:right-6 md:w-96 md:h-[550px] md:rounded-2xl md:origin-bottom-right
        bg-slate-900 shadow-2xl border-slate-700 md:border flex flex-col overflow-hidden
      `}>
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-4 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-blue-400" />
            <h3 className="font-semibold text-slate-100">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-slate-700 p-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-400" />
                <span className="text-xs text-slate-400">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 pb-safe">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my skills..."
              className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-white placeholder-slate-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-2">
             <span className="text-[10px] text-slate-600 block">Powered by Gemini AI</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiAssistant;