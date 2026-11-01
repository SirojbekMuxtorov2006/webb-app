'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Star, 
  ShoppingCart, 
  Check, 
  ArrowRight, 
  Laptop, 
  Smartphone, 
  Tv, 
  Shirt, 
  Zap,
  TrendingUp,
  Tag
} from 'lucide-react';
import { SEEDED_PRODUCTS } from '../lib/api';
import { useMarketplaceStore } from '../lib/store';
import { formatUZS } from '@ecommerce/shared';

export default function HomePage() {
  const { setAiOpen, addToCart } = useMarketplaceStore();
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: typeof SEEDED_PRODUCTS[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      title: product.titleUz,
      price: product.discountPrice || product.price,
      image: product.images[0],
      sellerName: product.sellerName,
    });
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const categories = [
    { title: 'Noutbuklar', slug: 'laptops-computers', icon: Laptop, count: '140+ mahsulot' },
    { title: 'Smartfonlar', slug: 'smartphones-gadgets', icon: Smartphone, count: '320+ mahsulot' },
    { title: 'Maishiy texnika', slug: 'home-appliances', icon: Tv, count: '210+ mahsulot' },
    { title: 'Kiyim-kechak', slug: 'fashion-shoes', icon: Shirt, count: '500+ mahsulot' },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900 via-brand-600 to-indigo-800 text-white shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative max-w-4xl px-6 py-12 sm:px-12 sm:py-16 flex flex-col items-start gap-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400 text-gray-950 text-xs font-black uppercase tracking-wider shadow-sm">
            <Zap className="w-4 h-4 fill-current" />
            <span>Katta Bahor Savdosi • Uzum Nasiya 0-0-12</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            O'zbekistondagi ilk <br className="hidden sm:inline" />
            <span className="text-yellow-300">AI-quvvatlangan</span> internet-bozor
          </h1>

          <p className="text-sm sm:text-base text-purple-100 max-w-xl leading-relaxed">
            100 000 dan ortiq mahsulotlar 1 kunda bepul yetkazib beriladi. Kerakli mahsulotni topish uchun aqlli AI yordamchisidan foydalaning!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setAiOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-white text-brand-700 font-bold text-sm shadow-lg hover:bg-purple-50 transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 text-brand-600 group-hover:rotate-12 transition-transform" />
              <span>AI Yordamchidan so'rash</span>
            </button>

            <Link
              href="/catalog"
              className="px-6 py-3.5 rounded-2xl bg-brand-700/60 hover:bg-brand-700 text-white font-semibold text-sm border border-purple-400/30 transition-all flex items-center gap-2"
            >
              <span>Katalogni ko'rish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Category Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>Ommabop toifalar</span>
          </h2>
          <Link href="/catalog" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            Barchasini ko'rish →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={`/catalog?category=${cat.slug}`}
                className="bg-white p-4 rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all group flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-brand-600 transition-colors">
                    {cat.title}
                  </h3>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* AI Search Assistant Prompt Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Qidirayotgan narsangizni topa olmayapsizmi?
            </h3>
            <p className="text-xs text-gray-600">
              "Menga 5 million so'mgacha yaxshi noutbuk kerak" deb yozing, sun'iy intellekt eng mosini saralab beradi.
            </p>
          </div>
        </div>
        <button
          onClick={() => setAiOpen(true)}
          className="px-4 py-2.5 bg-brand-600 text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-brand-700 shadow-md transition-colors whitespace-nowrap"
        >
          AI Yordamchini ochish
        </button>
      </div>

      {/* Featured / Trending Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-red-100 text-red-600">
              <Flame className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              Ommabop va trenddagi mahsulotlar
            </h2>
          </div>
          <Link href="/catalog" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
            Barchasi ({SEEDED_PRODUCTS.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {SEEDED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.images[0]}
                  alt={product.titleUz}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {product.discountPrice && (
                    <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">
                      Chegirma
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-brand-600 text-white text-[10px] font-semibold">
                    1 kunda yetkazish
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-gray-800">{product.rating}</span>
                    <span className="text-gray-400">({product.reviewCount} ta sharh)</span>
                  </div>

                  <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                    {product.titleUz}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  {/* Monthly installment badge */}
                  <div className="mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-yellow-300 text-gray-900 text-[10px] font-bold">
                      {formatUZS(product.installmentMonthly)} / oyiga
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.discountPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-400 line-through">
                            {formatUZS(product.price)}
                          </span>
                          <span className="text-sm font-black text-gray-900">
                            {formatUZS(product.discountPrice)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-black text-gray-900">
                          {formatUZS(product.price)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`p-2.5 rounded-xl transition-all ${
                        addedIds[product.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-brand-50 text-brand-600 hover:bg-brand-600 hover:text-white'
                      }`}
                      title="Savatga qo'shish"
                    >
                      {addedIds[product.id] ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
