'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Sparkles, 
  Menu, 
  MapPin, 
  ChevronDown,
  Store,
  ShieldCheck
} from 'lucide-react';
import { useMarketplaceStore } from '../../lib/store';
import { formatUZS } from '@ecommerce/shared';

export const Header: React.FC = () => {
  const router = useRouter();
  const { language, setLanguage, cart, isAiOpen, setAiOpen } = useMarketplaceStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Toshkent sh.');

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-gray-50 border-b border-gray-100 text-xs text-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-gray-700">
              <MapPin className="w-3.5 h-3.5 text-brand-500" />
              <span>Shahar:</span>
              <button className="font-semibold underline hover:text-brand-500">
                {selectedRegion}
              </button>
            </div>
            <span className="hidden md:inline text-gray-400">|</span>
            <span className="hidden md:inline text-gray-500">
              Yetkazib berish punktlari: 1 kunda bepul yetkazish
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/seller" className="flex items-center gap-1 font-medium hover:text-brand-500 transition-colors">
              <Store className="w-3.5 h-3.5 text-brand-500" />
              <span>Uzumda soting (Seller Hub)</span>
            </Link>
            <Link href="/admin" className="hidden sm:flex items-center gap-1 font-medium hover:text-brand-500 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin Console</span>
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 font-semibold">
              <button 
                onClick={() => setLanguage('uz')} 
                className={`px-1.5 py-0.5 rounded ${language === 'uz' ? 'bg-brand-500 text-white' : 'hover:text-brand-500'}`}
              >
                O'z
              </button>
              <button 
                onClick={() => setLanguage('ru')} 
                className={`px-1.5 py-0.5 rounded ${language === 'ru' ? 'bg-brand-500 text-white' : 'hover:text-brand-500'}`}
              >
                Ру
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-brand-500 text-white' : 'hover:text-brand-500'}`}
              >
                En
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 sm:gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-xl tracking-tighter">UZ</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight text-gray-900 group-hover:text-brand-600 transition-colors">
              uzum<span className="text-brand-600">.ai</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 -mt-1">
              Marketplace
            </span>
          </div>
        </Link>

        {/* Catalog Button */}
        <Link 
          href="/catalog" 
          className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold rounded-xl text-sm transition-colors flex-shrink-0"
        >
          <Menu className="w-4 h-4 text-brand-600" />
          <span>Katalog</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 relative max-w-2xl">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={
                language === 'uz'
                  ? "Mahsulotlar va toifalardan qidirish... (Masalan: 5 milliongacha noutbuk)"
                  : "Искать товары и категории... (Например: ноутбук до 5 млн)"
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 bg-gray-100 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-brand-500 rounded-xl text-sm transition-all outline-none"
            />
            <button
              type="submit"
              className="absolute right-1.5 p-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
              title="Qidirish"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* AI Shopping Assistant Trigger */}
        <button
          onClick={() => setAiOpen(!isAiOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-xs sm:text-sm shadow-md shadow-purple-500/20 hover:opacity-95 hover:shadow-lg transition-all flex-shrink-0 animate-pulse"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="hidden sm:inline">AI Yordamchi</span>
        </button>

        {/* Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <Link href="/account" className="flex flex-col items-center text-gray-700 hover:text-brand-600 transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[11px] font-medium hidden sm:inline mt-0.5">Kirish</span>
          </Link>

          <Link href="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-brand-600 transition-colors relative">
            <Heart className="w-5 h-5" />
            <span className="text-[11px] font-medium hidden sm:inline mt-0.5">Saralangan</span>
          </Link>

          <Link href="/cart" className="flex flex-col items-center text-gray-700 hover:text-brand-600 transition-colors relative">
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium hidden sm:inline mt-0.5">Savat</span>
          </Link>
        </div>
      </div>

      {/* Secondary Category Navigation */}
      <div className="border-t border-gray-100 bg-white overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-6 text-xs font-medium text-gray-600 whitespace-nowrap">
          <Link href="/catalog?category=laptops-computers" className="hover:text-brand-600 flex items-center gap-1.5">
            <span>💻 Noutbuklar va kompyuterlar</span>
          </Link>
          <Link href="/catalog?category=smartphones-gadgets" className="hover:text-brand-600 flex items-center gap-1.5">
            <span>📱 Smartfonlar va gadjetlar</span>
          </Link>
          <Link href="/catalog?category=home-appliances" className="hover:text-brand-600 flex items-center gap-1.5">
            <span>📺 Maishiy texnika</span>
          </Link>
          <Link href="/catalog?category=fashion-shoes" className="hover:text-brand-600 flex items-center gap-1.5">
            <span>👕 Kiyim va poyabzallar</span>
          </Link>
          <Link href="/catalog" className="text-red-500 font-semibold hover:text-red-600 flex items-center gap-1">
            <span>🔥 Muddatli to'lov 0-0-12 (Uzum Nasiya)</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
