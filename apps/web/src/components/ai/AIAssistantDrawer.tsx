'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { useMarketplaceStore } from '../../lib/store';
import { sendAIMessage } from '../../lib/api';
import { formatUZS } from '@ecommerce/shared';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendedProducts?: any[];
  timestamp: string;
}

export const AIAssistantDrawer: React.FC = () => {
  const { isAiOpen, setAiOpen, language, addToCart } = useMarketplaceStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: language === 'uz'
        ? "Assalomu alaykum! Men Uzum AI yordamchisiman. Sizga qanday mahsulot kerak? Masalan, byudjetingizga mos noutbuk yoki smartfon qidirayotgan bo'lsangiz, bemalol ayting!"
        : "Здравствуйте! Я AI помощник Uzum. Какой товар вас интересует? Напишите ваш бюджет или пожелания, и я подберу проверенные варианты из каталога!",
      timestamp: 'Hozir',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isAiOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: 'Hozir',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await sendAIMessage(text, language);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: response.message,
        recommendedProducts: response.recommendedProducts,
        timestamp: 'Hozir',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: 'Kechirasiz, tizimda vaqtinchalik xatolik yuz berdi. Qaytadan urinib ko\'ring.',
          timestamp: 'Hozir',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      productId: product.id,
      title: product.titleUz || product.titleRu,
      price: product.discountPrice || product.price,
      image: product.image,
      sellerName: product.storeName,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const quickPrompts = [
    "Menga 5 million so'mgacha yaxshi noutbuk kerak",
    "iPhone 16 Pro Max narxi qancha?",
    "Artel 55 dyuym 4K televizor",
    "Yetkazib berish qancha vaqt oladi?",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setAiOpen(false)}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-purple-700 via-brand-600 to-indigo-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">Uzum AI Shopping Assistant</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-green-500/30 text-green-200 border border-green-400/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-purple-100">
                0% gallyutsinatsiya — real narxlar va mahsulotlar
              </p>
            </div>
          </div>
          <button
            onClick={() => setAiOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 text-brand-600 font-semibold text-xs mb-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Uzum AI</span>
                  </div>
                )}
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Grounded Recommended Products Cards */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100 space-y-2.5">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                      Tavsiya etilgan mahsulotlar:
                    </span>
                    {msg.recommendedProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 flex items-center justify-between gap-3 hover:border-brand-300 transition-colors"
                      >
                        <img
                          src={prod.image}
                          alt={prod.titleUz}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-900 truncate">
                            {prod.titleUz || prod.titleRu}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-brand-600">
                              {formatUZS(prod.discountPrice || prod.price)}
                            </span>
                            {prod.discountPrice && (
                              <span className="text-[10px] text-gray-400 line-through">
                                {formatUZS(prod.price)}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-500 block">
                            Do'kon: {prod.storeName}
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(prod)}
                          className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all flex-shrink-0 ${
                            addedIds[prod.id]
                              ? 'bg-green-600 text-white'
                              : 'bg-brand-500 text-white hover:bg-brand-600'
                          }`}
                          title="Savatga qo'shish"
                        >
                          {addedIds[prod.id] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-brand-600 font-medium py-2">
              <Sparkles className="w-4 h-4 animate-spin text-brand-500" />
              <span>Katalogdan qidirilmoqda va narxlar tekshirilmoqda...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-gray-100 bg-white overflow-x-auto scrollbar-none flex gap-2">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-gray-100 hover:bg-brand-50 hover:text-brand-700 text-gray-700 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors border border-gray-200/60"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Savolingizni yozing (o'zbek yoki rus tilida)..."
            className="flex-1 px-4 py-2.5 text-sm bg-gray-100 border border-transparent focus:border-brand-500 focus:bg-white rounded-xl outline-none transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
