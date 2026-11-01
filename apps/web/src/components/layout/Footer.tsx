'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Shield, Truck, RefreshCw, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800">
      {/* Guarantees Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-gray-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-brand-400 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">1 kunda yetkazish</h4>
            <p className="text-xs text-gray-400">O'zbekiston bo'ylab 1 kunda bepul yetkazib beramiz</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-brand-400 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Uzum Nasiya 0-0-12</h4>
            <p className="text-xs text-gray-400">Boshlang'ich to'lovsiz, foizsiz muddatli to'lov</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-brand-400 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">100% Rasmiy Kafolat</h4>
            <p className="text-xs text-gray-400">Faqat original mahsulotlar va xavfsiz to'lovlar</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-900/40 text-brand-400 flex items-center justify-center flex-shrink-0">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">Oson qaytarish</h4>
            <p className="text-xs text-gray-400">10 kun ichida mahsulotni bepul qaytarib olish</p>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div>
          <h5 className="font-bold text-white text-sm mb-4">Biz haqimizda</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Topshirish punktlari</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Vakansiyalar</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Yuridik ma'lumotlar</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Foydalanish shartlari</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white text-sm mb-4">Xaridorlarga</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/catalog" className="hover:text-white transition-colors">Katalog</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Savat</Link></li>
            <li><Link href="/checkout" className="hover:text-white transition-colors">Buyurtmani rasmiylashtirish</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Savol-javoblar</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white text-sm mb-4">Tadbirkorlarga</h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/seller" className="text-brand-400 font-semibold hover:text-brand-300 transition-colors">Uzumda soting (Seller Hub)</Link></li>
            <li><Link href="/seller" className="hover:text-white transition-colors">Sotuvchi kabinetiga kirish</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Tariflar va komissiyalar</Link></li>
            <li><Link href="/admin" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">Admin Console</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-white text-sm mb-4">To'lov usullari</h5>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-gray-800 rounded font-semibold text-emerald-400 border border-gray-700">Payme</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded font-semibold text-blue-400 border border-gray-700">Click</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded font-semibold text-purple-400 border border-gray-700">Uzum Nasiya</span>
            <span className="px-2.5 py-1 bg-gray-800 rounded font-semibold text-yellow-400 border border-gray-700">Naqd / Karta</span>
          </div>
        </div>

        <div>
          <h5 className="font-bold text-white text-sm mb-4">Bog'lanish (24/7)</h5>
          <div className="space-y-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-400" />
              <span className="text-white font-bold">+998 78 777-00-00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400" />
              <span>support@uzum.ai</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Toshkent sh., Yunusobod t.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <span>© 2026 Uzum AI E-Commerce Marketplace. Barcha huquqlar himoyalangan.</span>
        <div className="flex gap-4">
          <span>Maxfiylik siyosati</span>
          <span>Ommaviy oferta</span>
          <span>Xavfsizlik</span>
        </div>
      </div>
    </footer>
  );
};
