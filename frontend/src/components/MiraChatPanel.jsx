import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse, QUICK_QUESTIONS } from '../services/mockAI';
import { RISK_COLORS } from '../types/analysis';

/**
 * MiraChatPanel — Full chat interface for conversing with Mira about scan results.
 * Shows chat messages, supports quick-reply chips, and handles typing animation.
 */
export default function MiraChatPanel({ result, onBack, initialQuestion, lang }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasInitialized = useRef(false);

  const colors = RISK_COLORS[result?.riskLevel] || RISK_COLORS.Safe;

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle the initial question that triggered the chat
  useEffect(() => {
    if (initialQuestion && !hasInitialized.current) {
      hasInitialized.current = true;
      sendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: text.trim(), id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    try {
      const response = await getChatResponse(text.trim(), result);
      setIsTyping(false);

      // Add Mira's response
      const miraMsg = { role: 'mira', text: response, id: Date.now() + 1 };
      setMessages((prev) => [...prev, miraMsg]);
    } catch {
      setIsTyping(false);
      const errorMsg = {
        role: 'mira',
        text: "Sorry, I couldn't process that right now. Please try again! 💜",
        id: Date.now() + 1,
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isTyping) {
      sendMessage(inputValue);
    }
  };

  const handleQuickQuestion = (q) => {
    if (!isTyping) {
      sendMessage(q);
    }
  };

  // Short labels for quick-reply chips
  const chipLabels = [
    { full: QUICK_QUESTIONS[0], short: 'Why?' },
    { full: QUICK_QUESTIONS[1], short: 'What to do?' },
    { full: QUICK_QUESTIONS[2], short: 'Is it fake?' },
    { full: QUICK_QUESTIONS[3], short: 'Recognize?' },
    { full: QUICK_QUESTIONS[4], short: 'Teach me' },
  ];

  return (
    <div className="flex flex-col h-full phase-enter-chat">
      {/* Chat Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm"
          title="Back to summary"
        >
          ←
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm">🛡️</span>
          <span className="text-xs font-bold text-gray-800 truncate">Chat with Mira</span>
        </div>
        <span
          className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {result?.riskLevel}
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2.5 chat-scroll min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message-in flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'mira' && (
              <span className="text-base mr-1.5 flex-shrink-0 mt-0.5">🛡️</span>
            )}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              {/* Render markdown-like bold text */}
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-1.5' : ''}>
                  {line.split(/(\*\*.*?\*\*)/).map((segment, j) =>
                    segment.startsWith('**') && segment.endsWith('**') ? (
                      <strong key={j} className="font-bold">
                        {segment.slice(2, -2)}
                      </strong>
                    ) : (
                      <span key={j}>{segment}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 chat-message-in">
            <span className="text-base">🛡️</span>
            <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2.5">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Reply Chips — only show if few messages */}
      {messages.length <= 2 && (
        <div className="px-3 pb-1.5 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {chipLabels.map(({ full, short }) => (
              <button
                key={short}
                onClick={() => handleQuickQuestion(full)}
                disabled={isTyping}
                className="text-[10px] font-medium px-2.5 py-1 rounded-full border border-indigo-200 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-3 py-2 border-t border-gray-100 flex-shrink-0 bg-white"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask Mira anything..."
          disabled={isTyping}
          className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-2 outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200 transition-all disabled:opacity-50 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center text-sm hover:shadow-md hover:shadow-indigo-300/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
        >
          ↑
        </button>
      </form>
    </div>
  );
}
