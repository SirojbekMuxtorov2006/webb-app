'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  MapPin, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Phone,
  User
} from 'lucide-react';
import { useMarketplaceStore } from '../../lib/store';
import { formatUZS, UZBEKISTAN_REGIONS } from '@ecommerce/shared';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, appliedCoupon } = useMarketplaceStore();

  const [customerName, setCustomerName] = useState('Bekzod Alimov');
  const [customerPhone, setCustomerPhone] = useState('+998 90 123-45-67');
  const [selectedRegion, setSelectedRegion] = useState('tashkent-city');
  const [city, setCity] = useState('Yunusobod tumani');
  const [street, setStreet] = useState('Amir Temur shoh ko\'chasi, 45-uy');
  const [apartment, setApartment] = useState('12');
  const [deliveryMethod, setDeliveryMethod] = useState<'PICKUP' | 'COURIER'>('PICKUP');
  const [paymentMethod, setPaymentMethod] = useState<'PAYME' | 'CLICK' | 'UZUM_NASIYA' | 'COD'>('CLICK');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  if (appliedCoupon === 'UZUM2026') discount = Math.min(200000, subtotal * 0.1);
  if (appliedCoupon === 'YANGIYIL') discount = 50000;

  const shippingFee = deliveryMethod === 'COURIER' ? 20000 : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `UZM-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TRK-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setOrderConfirmed({
        orderNumber,
        trackingNumber,
        total,
        paymentMethod,
        deliveryMethod,
      });
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 bg-white rounded-3xl border border-gray-100 shadow-lg text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900">Buyurtmangiz qabul qilindi!</h1>
          <p className="text-xs text-gray-500 mt-1">
            Buyurtma raqami: <strong className="text-brand-600">{orderConfirmed.orderNumber}</strong>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Kuzatuv (tracking) kodi:</span>
            <span className="font-bold text-gray-900">{orderConfirmed.trackingNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">To'lov usuli:</span>
            <span className="font-bold text-gray-900">{orderConfirmed.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Yetkazib berish muddati:</span>
            <span className="font-bold text-emerald-600">Ertaga soat 18:00 gacha</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="text-gray-900 font-bold">To'langan summa:</span>
            <span className="font-black text-brand-600 text-sm">{formatUZS(orderConfirmed.total)}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 py-3 rounded-2xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors"
          >
            Bosh sahifaga qaytish
          </Link>
          <Link
            href="/catalog"
            className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-800 font-bold text-xs hover:bg-gray-200 transition-colors"
          >
            Katalogga o'tish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900 pb-4 border-b border-gray-200">
        Buyurtmani rasmiylashtirish
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer info */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-600" />
              <span>1. Qabul qiluvchi ma'lumotlari</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Ism va familiya:</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Telefon raqam:</label>
                <input
                  type="text"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address & Region */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-600" />
              <span>2. Yetkazib berish manzili (O'zbekiston hududlari)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Viloyat / Shahar:</label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 font-medium"
                >
                  {UZBEKISTAN_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nameUz} (1 kunda)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Tuman / Shaharcha:</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-semibold text-gray-700 block mb-1">Ko'cha, uy raqami va mo'ljal:</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 font-medium"
                />
              </div>
            </div>

            {/* Delivery type options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => setDeliveryMethod('PICKUP')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === 'PICKUP'
                    ? 'border-brand-600 bg-purple-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xs font-bold text-gray-900 block">
                  Uzum topshirish punkti
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Bepul • Ertagayoq tayyor
                </span>
              </div>

              <div
                onClick={() => setDeliveryMethod('COURIER')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === 'COURIER'
                    ? 'border-brand-600 bg-purple-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-xs font-bold text-gray-900 block">
                  Kuryer orqali eshikkacha
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  20 000 so'm • 1 kunda
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-brand-600" />
              <span>3. To'lov usulini tanlang</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'PAYME', label: 'Payme', badge: 'Karta orqali' },
                { id: 'CLICK', label: 'Click', badge: 'Karta orqali' },
                { id: 'UZUM_NASIYA', label: 'Uzum Nasiya', badge: '0-0-12 muddatli' },
                { id: 'COD', label: 'Naqd / Qabulda', badge: 'Yetkazilganda' },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPaymentMethod(p.id as any)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-center ${
                    paymentMethod === p.id
                      ? 'border-brand-600 bg-brand-50/80 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xs font-black text-gray-900 block">
                    {p.label}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium block mt-0.5">
                    {p.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Checkout summary */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            To'lov ma'lumotlari
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Mahsulotlar soni:</span>
              <span className="font-semibold text-gray-900">{cart.length} ta</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Oraliq summa:</span>
              <span className="font-semibold text-gray-900">{formatUZS(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Chegirma:</span>
                <span>-{formatUZS(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Yetkazib berish:</span>
              <span>{shippingFee === 0 ? 'Bepul' : formatUZS(shippingFee)}</span>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between text-base font-black text-gray-900">
              <span>To'lanishi kerak:</span>
              <span className="text-brand-600">{formatUZS(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Buyurtma rasmiylashtirilmoqda...</span>
            ) : (
              <>
                <span>Buyurtmani tasdiqlash</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
