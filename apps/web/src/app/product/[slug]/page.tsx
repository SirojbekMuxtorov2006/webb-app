'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ShoppingCart, 
  Zap, 
  Sparkles, 
  Bot, 
  Check, 
  Share2, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { SEEDED_PRODUCTS } from '../../../lib/api';
import { useMarketplaceStore } from '../../../lib/store';
import { formatUZS, calculateInstallment } from '@ecommerce/shared';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const product = SEEDED_PRODUCTS.find((p) => p.slug === slug) || SEEDED_PRODUCTS[0];
  const { addToCart } = useMarketplaceStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedMonths, setSelectedMonths] = useState<3 | 6 | 12 | 24>(12);
  const [isAdded, setIsAdded] = useState(false);

  const price = product.discountPrice || product.price;
  const installment = calculateInstallment(price, selectedMonths);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.titleUz,
      price: product.discountPrice || product.price,
      image: product.images[0],
      sellerName: product.sellerName,
      quantity,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-brand-600">Bosh sahifa</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/catalog" className="hover:text-brand-600">Katalog</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-medium truncate max-w-xs">{product.titleUz}</span>
      </div>

      {/* Main Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm flex items-center justify-center p-4">
            <img
              src={product.images[0]}
              alt={product.titleUz}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                className="w-16 h-16 rounded-xl border-2 border-brand-500 overflow-hidden p-1 bg-white"
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover rounded-lg" />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Details */}
        <div className="lg:col-span-4 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-500 mb-2">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-gray-800">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount} ta sharh)</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{product.soldCount} ta xarid qilingan</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
              {product.titleUz}
            </h1>
          </div>

          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-600">Sotuvchi:</span>
            <span className="font-bold text-gray-900">{product.sellerName} (4.9 ⭐)</span>
          </div>

          {/* Delivery & Guarantees */}
          <div className="space-y-2.5 text-xs text-gray-600 border-y border-gray-100 py-4">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span><strong>1 kunda bepul yetkazish</strong> topshirish punktlariga</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span><strong>1 yil rasmiy kafolat</strong> rasmiy servis markazidan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span><strong>10 kun ichida</strong> bepul va qulay qaytarish</span>
            </div>
          </div>

          {/* Specifications snippet */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">
              Qisqacha xususiyatlari:
            </h3>
            <div className="space-y-2 text-xs">
              {product.specifications.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">{spec.key}</span>
                  <span className="font-medium text-gray-900">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Purchase & Installment Box */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-gray-100 shadow-md space-y-6">
          <div>
            <span className="text-xs text-gray-400">Umumiy narxi:</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gray-900">
                {formatUZS(price)}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatUZS(product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Uzum Nasiya Installment Calculator */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-600 fill-current" />
                Uzum Nasiya muddatli to'lov
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {([3, 6, 12, 24] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedMonths(m)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedMonths === m
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {m} oy
                </button>
              ))}
            </div>

            <div className="text-center pt-1">
              <span className="text-sm font-black text-brand-700">
                {formatUZS(installment.monthlyPayment)} / oyiga
              </span>
              <span className="text-[10px] text-gray-500 block">
                0% boshlang'ich to'lov
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-gray-700">Miqdori:</span>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded"
              >
                -
              </button>
              <span className="text-sm font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2.5">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-brand-600 hover:bg-brand-700 text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Savatga qo'shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Savatga qo'shish</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-2xl font-bold text-sm bg-yellow-400 hover:bg-yellow-500 text-gray-950 transition-colors"
            >
              1 bosishda xarid qilish
            </button>
          </div>
        </div>
      </div>

      {/* AI Review Summary Card (Section 4 differentiator) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-indigo-50 border border-purple-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 text-brand-700 font-bold text-base">
          <div className="p-1.5 rounded-xl bg-brand-600 text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <span>AI Tahlil: Xaridorlar fikrlari va xulosasi</span>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
          Xaridorlarning <strong>96% qismi</strong> ushbu mahsulotni tavsiya qilmoqda. Mahsulotning yetkazib berish tezligi (1 kunda topshirish punktida), mustahkam yig'ilishi va narx/unumdorlik nisbati yuqori baholangan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-xl bg-white border border-emerald-100 text-xs">
            <span className="font-bold text-emerald-700 block mb-1">👍 Eng ko'p maqtov olgan jihatlari:</span>
            <ul className="list-disc list-inside space-y-0.5 text-gray-600">
              <li>Tezkor SSD xotira va sovuq ishlashi</li>
              <li>15.6 dyuymli tiniq IPS ekran</li>
              <li>Sotuvchining 1 kunda yetkazib berishi</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-white border border-blue-100 text-xs">
            <span className="font-bold text-blue-700 block mb-1">💡 Xaridorlar uchun tavsiya:</span>
            <p className="text-gray-600">
              O'qish, buxgalteriya va ofis vazifalari uchun ideal. Og'ir 3D o'yinlar uchun moslashtirilmagan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
