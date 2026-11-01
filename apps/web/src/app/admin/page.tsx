'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  TrendingUp, 
  Check, 
  X, 
  AlertTriangle,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { formatUZS } from '@ecommerce/shared';

export default function AdminDashboardPage() {
  const [pendingSellers, setPendingSellers] = useState([
    {
      id: 'sel-101',
      storeName: 'Buxoro Ipak & Hunarmandchilik MCHJ',
      legalName: 'OOO "BUKHARA CARPETS CRAFT"',
      inn: '304918239',
      ownerName: 'Alisher Vohidov',
      phone: '+998 93 111-22-33',
      documents: 'Guvohnoma_PDF, Nizom_PDF',
      date: 'Bugun, 09:20',
    },
    {
      id: 'sel-102',
      storeName: 'Samarqand Shirinliklari',
      legalName: 'YaTT "SHIRINLIK MARKET"',
      inn: '309112844',
      ownerName: 'Nodira Salimova',
      phone: '+998 97 444-55-66',
      documents: 'Patent_PDF',
      date: 'Kecha, 17:40',
    },
  ]);

  const [verifiedCount, setVerifiedCount] = useState(24);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleApprove = (id: string, name: string) => {
    setPendingSellers((prev) => prev.filter((s) => s.id !== id));
    setVerifiedCount((prev) => prev + 1);
    setToastMessage(`"${name}" do'koni muvaffaqiyatli tasdiqlandi va platformaga qo'shildi!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReject = (id: string, name: string) => {
    setPendingSellers((prev) => prev.filter((s) => s.id !== id));
    setToastMessage(`"${name}" do'koni arizasi rad etildi.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-gray-900 text-white text-xs font-semibold shadow-xl flex items-center justify-between animate-in fade-in">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="bg-gray-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-2xl border border-emerald-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">Marketplace Admin Console</h1>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400/30 text-[10px] font-bold">
                Super Admin
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Platforma holati: Barcha modullar, to'lov shlyuzlari (Payme, Click) va AI xizmati faol
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-medium border border-gray-700">
            RBAC: To'liq boshqaruv
          </span>
        </div>
      </div>

      {/* Platform Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
          <span className="text-xs text-gray-500 font-medium">Jami savdo aylanmasi (GMV):</span>
          <div className="text-xl font-black text-gray-900">{formatUZS(1340000000)}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+24.5% oylik o'sish</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
          <span className="text-xs text-gray-500 font-medium">Platforma komissiyasi (5%):</span>
          <div className="text-xl font-black text-brand-600">{formatUZS(67000000)}</div>
          <span className="text-[11px] text-gray-400">Sof daromad</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
          <span className="text-xs text-gray-500 font-medium">Tasdiqlangan sotuvchilar:</span>
          <div className="text-xl font-black text-gray-900">{verifiedCount} ta do'kon</div>
          <span className="text-[11px] text-amber-600 font-semibold">{pendingSellers.length} ta navbatda</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-1.5">
          <span className="text-xs text-gray-500 font-medium">Ro'yxatdan o'tgan foydalanuvchilar:</span>
          <div className="text-xl font-black text-gray-900">14 250 ta</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+180 ta yangi bugun</span>
        </div>
      </div>

      {/* Seller Verification Queue */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold text-gray-900">
              Sotuvchilarni verifikatsiya qilish va KYC arizalari ({pendingSellers.length})
            </h2>
            <p className="text-xs text-gray-400">
              Yangi sotuvchilarning soliq (INN), yuridik ma'lumotlari va hujjatlarini tekshirish
            </p>
          </div>
        </div>

        {pendingSellers.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-400 space-y-2">
            <Check className="w-8 h-8 text-emerald-500 mx-auto" />
            <p>Barcha sotuvchi arizalari ko'rib chiqilgan!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pendingSellers.map((seller) => (
              <div key={seller.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-gray-900">{seller.storeName}</h3>
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
                      INN: {seller.inn}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Yuridik nomi: <span className="font-medium text-gray-800">{seller.legalName}</span> • Rahbar: {seller.ownerName}
                  </p>
                  <p className="text-[11px] text-brand-700 font-medium">
                    Hujjatlar: {seller.documents} • Telefon: {seller.phone} • {seller.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(seller.id, seller.storeName)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Tasdiqlash</span>
                  </button>
                  <button
                    onClick={() => handleReject(seller.id, seller.storeName)}
                    className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Rad etish</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Security & Audit Logs */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-600" />
          <span>Tizim xavfsizligi va Audit jurnali (So'nggi harakatlar)</span>
        </h2>

        <div className="space-y-2 text-xs font-mono text-gray-600">
          <div className="p-2.5 rounded-xl bg-gray-50 flex justify-between items-center">
            <span>[2026-11-01 10:14:20] CLICK_WEBHOOK: To'lov muvaffaqiyatli qabul qilindi (UZM-2026-87123, 4 319 000 UZS)</span>
            <span className="text-emerald-600 font-bold">200 OK</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 flex justify-between items-center">
            <span>[2026-11-01 09:45:10] SELLER_LOGIN: artel@seller.uz tizimga kirdi (IP: 178.218.201.45)</span>
            <span className="text-blue-600 font-bold">AUTHENTICATED</span>
          </div>
          <div className="p-2.5 rounded-xl bg-gray-50 flex justify-between items-center">
            <span>[2026-11-01 09:30:00] AI_ASSISTANT_QUERY: User qidiruvi "Menga 5 million so'mgacha noutbuk kerak"</span>
            <span className="text-purple-600 font-bold">GROUNDED_MATCH (Lenovo IdeaPad)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
