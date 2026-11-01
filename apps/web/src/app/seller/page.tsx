'use client';

import React, { useState } from 'react';
import { 
  Store, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  ArrowUpRight, 
  CheckCircle,
  Copy,
  AlertCircle
} from 'lucide-react';
import { formatUZS } from '@ecommerce/shared';
import { SEEDED_PRODUCTS } from '../../lib/api';

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'ai-generator'>('overview');
  
  // AI Generator state
  const [genTitle, setGenTitle] = useState('Samsung Galaxy S24 Ultra');
  const [genBrand, setGenBrand] = useState('Samsung');
  const [genFeatures, setGenFeatures] = useState('200MP kamera, Titanium korpus, S-Pen, 5000mAh batareya');
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedResult({
        titleUz: `${genBrand} ${genTitle} 256GB — Rasmiy kafolat bilan`,
        titleRu: `${genBrand} ${genTitle} 256GB — С официальной гарантией`,
        descriptionUz: `Yangi ${genBrand} ${genTitle} eng so'nggi flagman texnologiyalarini o'zida jamlagan. Asosiy xususiyatlari: ${genFeatures}. O'zbekiston bo'ylab 1 kunda yetkazib berish xizmati va 1 yil to'liq rasmiy kafolat taqdim etiladi. Uzum Nasiya orqali oyiga foizsiz bo'lib to'lash mumkin.`,
        descriptionRu: `Флагманский ${genBrand} ${genTitle} с передовыми возможностями. Ключевые преимущества: ${genFeatures}. Быстрая доставка по всему Узбекистану и 1 год официальной гарантии. Доступна рассрочка через Uzum Nasiya.`,
        tags: [genBrand.toLowerCase(), 'flagman', 'original', 'uzum-nasiya', 'uzbekistan'],
      });
      setIsGenerating(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 to-brand-700 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-black text-2xl border border-white/20">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Texnomart Premium</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                Tasdiqlangan sotuvchi
              </span>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              INN: 308941203 • Reyting: 4.8 ⭐ (310 ta xarid)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('ai-generator')}
            className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Tavsif Generatori</span>
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'overview'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Umumiy ko'rsatkichlar
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'products'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Mahsulotlarim ({SEEDED_PRODUCTS.length})
        </button>
        <button
          onClick={() => setActiveTab('ai-generator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'ai-generator'
              ? 'bg-brand-600 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          AI Tovarlar Yordamchisi ✨
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-xs text-gray-500 font-medium">Jami savdo aylanmasi (GMV):</span>
              <div className="text-xl font-black text-gray-900">{formatUZS(890000000)}</div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>+18.4% o'tgan oyga nisbatan</span>
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-xs text-gray-500 font-medium">Yechib olish uchun mavjud:</span>
              <div className="text-xl font-black text-brand-600">{formatUZS(140000000)}</div>
              <button className="text-[11px] text-brand-700 underline font-semibold">
                Kartaga / Hisob raqamga yechish →
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-xs text-gray-500 font-medium">Jami yetkazilgan buyurtmalar:</span>
              <div className="text-xl font-black text-gray-900">428 ta</div>
              <span className="text-[11px] text-gray-400">Bekor qilinganlar: 0.8%</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <span className="text-xs text-gray-500 font-medium">Ombordagi kam qolgan tovarlar:</span>
              <div className="text-xl font-black text-amber-600">2 ta mahsulot</div>
              <span className="text-[11px] text-amber-600 font-semibold">Qoldiq &lt; 5 dona</span>
            </div>
          </div>

          {/* Recent Orders table */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900">Yangi va so'nggi buyurtmalar</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Buyurtma ID</th>
                    <th className="p-3">Xaridor</th>
                    <th className="p-3">Mahsulot</th>
                    <th className="p-3">Summa</th>
                    <th className="p-3">Holat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-3 font-bold text-brand-600">UZM-2026-87123</td>
                    <td className="p-3 font-medium">Bekzod Alimov</td>
                    <td className="p-3">Lenovo IdeaPad 3 Core i3</td>
                    <td className="p-3 font-bold">{formatUZS(4499000)}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">Yetkazilmoqda</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-brand-600">UZM-2026-65492</td>
                    <td className="p-3 font-medium">Malika Karimova</td>
                    <td className="p-3">Apple iPhone 16 Pro Max</td>
                    <td className="p-3 font-bold">{formatUZS(15990000)}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold">Yetkazildi</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <h3 className="font-bold text-sm text-gray-900">Katalogdagi tovarlar</h3>
            <button className="px-3.5 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold hover:bg-brand-700 transition-colors flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi mahsulot qo'shish</span>
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {SEEDED_PRODUCTS.map((p) => (
              <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={p.images[0]} alt={p.titleUz} className="w-12 h-12 object-cover rounded-xl bg-gray-50" />
                  <div>
                    <h4 className="font-semibold text-xs text-gray-900">{p.titleUz}</h4>
                    <span className="text-[11px] text-gray-400">Qoldiq: {p.stock} dona • Sotilgan: {p.soldCount} ta</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900 block">{formatUZS(p.discountPrice || p.price)}</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Faol (Sotuvda)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'ai-generator' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
            <div className="p-2 rounded-xl bg-purple-100 text-brand-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">
                AI Mahsulot Nomi va SEO Tavsif Generatori
              </h3>
              <p className="text-xs text-gray-500">
                O'zbek, rus va ingliz tillarida qidiruvda (SEO) yuqori o'rin egallaydigan professional tavsiflarni yarating.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Input form */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Mahsulot nomi:</label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Brend:</label>
                <input
                  type="text"
                  value={genBrand}
                  onChange={(e) => setGenBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Asosiy parametrlari va ustunliklari:</label>
                <textarea
                  rows={3}
                  value={genFeatures}
                  onChange={(e) => setGenFeatures(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500"
                />
              </div>

              <button
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>{isGenerating ? 'AI generatsiya qilmoqda...' : 'Tavsifni generatsiya qilish'}</span>
              </button>
            </div>

            {/* Generated output */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4 text-xs">
              {generatedResult ? (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      Generatsiya muvaffaqiyatli yakunlandi!
                    </span>
                    <button
                      onClick={() => copyToClipboard(generatedResult.descriptionUz)}
                      className="text-gray-500 hover:text-gray-800 flex items-center gap-1 font-semibold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Nusxa olindi!' : 'Nusxalash'}</span>
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Sarlavha (UZ):</span>
                    <p className="font-bold text-gray-900 mt-0.5">{generatedResult.titleUz}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">SEO Tavsif (UZ):</span>
                    <p className="text-gray-700 leading-relaxed mt-0.5">{generatedResult.descriptionUz}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Tavsiya etilgan teglari:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {generatedResult.tags.map((t: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-purple-100 text-brand-700 font-semibold text-[10px]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400 space-y-2">
                  <Sparkles className="w-8 h-8 mx-auto text-gray-300" />
                  <p>Mahsulot ma'lumotlarini kiriting va "Generatsiya qilish" tugmasini bosing.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
