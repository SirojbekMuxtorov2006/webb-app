'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck,
  Check
} from 'lucide-react';
import { useMarketplaceStore } from '../../lib/store';
import { formatUZS } from '@ecommerce/shared';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, appliedCoupon, setAppliedCoupon } = useMarketplaceStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon === 'UZUM2026') {
    discount = Math.min(200000, subtotal * 0.1);
  } else if (appliedCoupon === 'YANGIYIL') {
    discount = 50000;
  }

  const shippingFee = subtotal > 500000 || subtotal === 0 ? 0 : 20000;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'UZUM2026' || code === 'YANGIYIL') {
      setAppliedCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Kupon kodi noto\'g\'ri yoki muddati tugagan.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-purple-50 text-brand-600 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Savatingiz hozircha bo'sh</h2>
        <p className="text-xs text-gray-500">
          Katalogimizdan o'zingizga yoqqan mahsulotlarni tanlang va savatga qo'shing.
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
        >
          <span>Xaridni boshlash</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-black text-gray-900">Savatingiz ({cart.length})</h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Savatni tozalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.productId}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    Do'kon: {item.sellerName || 'Uzum Rasmiy'}
                  </span>
                  <div className="text-sm font-bold text-brand-600 mt-2">
                    {formatUZS(item.price)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Quantity Controls */}
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1 bg-gray-50">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="text-sm font-black text-gray-900 min-w-[100px] text-right">
                  {formatUZS(item.price * item.quantity)}
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  title="O'chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Delivery notice */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-800">
            <Truck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>1 kunda bepul yetkazish</strong> topshirish punktlariga. 500 000 so'mdan yuqori buyurtmalar uchun kuryerlik yetkazish ham bepul!
            </span>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Buyurtma xulosasi
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Mahsulotlar narxi:</span>
              <span className="font-semibold text-gray-900">{formatUZS(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Kupon chegirmasi ({appliedCoupon}):</span>
                <span>-{formatUZS(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>Yetkazib berish:</span>
              <span>{shippingFee === 0 ? 'Bepul' : formatUZS(shippingFee)}</span>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-black text-gray-900">
              <span>Jami to'lov:</span>
              <span className="text-lg text-brand-600">{formatUZS(total)}</span>
            </div>
          </div>

          {/* Coupon Input */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 block">
              Promokod / Kupon:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masalan: UZUM2026"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-brand-500 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors"
              >
                Qo'llash
              </button>
            </div>
            {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
            {appliedCoupon && (
              <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold">
                <Check className="w-3.5 h-3.5" />
                <span>{appliedCoupon} kuponi qo'llandi!</span>
              </p>
            )}
          </form>

          {/* Checkout Button */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Rasmiylashtirishga o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
