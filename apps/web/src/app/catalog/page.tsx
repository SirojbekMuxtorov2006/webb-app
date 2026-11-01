'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  Star, 
  ShoppingCart, 
  Check, 
  RotateCcw,
  SlidersHorizontal 
} from 'lucide-react';
import { SEEDED_PRODUCTS } from '../../lib/api';
import { useMarketplaceStore } from '../../lib/store';
import { formatUZS } from '@ecommerce/shared';

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const { addToCart } = useMarketplaceStore();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(20000000);
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = useMemo(() => {
    return SEEDED_PRODUCTS.filter((product) => {
      if (selectedCategory && product.categorySlug !== selectedCategory) return false;
      if (selectedBrand && product.brandName !== selectedBrand) return false;
      const actualPrice = product.discountPrice || product.price;
      if (actualPrice > maxPrice) return false;
      if (initialSearch) {
        const q = initialSearch.toLowerCase();
        const matchTitle = product.titleUz.toLowerCase().includes(q) || product.titleRu.toLowerCase().includes(q);
        const matchBrand = product.brandName.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price_asc') return priceA - priceB;
      if (sortBy === 'price_desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.soldCount - a.soldCount;
    });
  }, [selectedCategory, selectedBrand, maxPrice, sortBy, initialSearch]);

  const handleAddToCart = (product: typeof SEEDED_PRODUCTS[0], e: React.MouseEvent) => {
    e.preventDefault();
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

  return (
    <div className="space-y-6">
      {/* Title & Filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Mahsulotlar katalogi</h1>
          <p className="text-xs text-gray-500 mt-1">
            {filteredProducts.length} ta mahsulot topildi
            {initialSearch && ` "${initialSearch}" so'rovi bo'yicha`}
          </p>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-medium">Saralash:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-white border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-brand-500"
          >
            <option value="popular">Ommabopligi bo'yicha</option>
            <option value="price_asc">Avval arzonlari</option>
            <option value="price_desc">Avval qimmatlari</option>
            <option value="rating">Yuqori reytinglilar</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Filters Sidebar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-600" />
              <span>Filtrlar</span>
            </h3>
            {(selectedCategory || selectedBrand || maxPrice < 20000000) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedBrand('');
                  setMaxPrice(20000000);
                }}
                className="text-[11px] text-red-500 hover:text-red-600 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Tozalash</span>
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Toifalar
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                { name: 'Barcha toifalar', slug: '' },
                { name: 'Noutbuklar va kompyuterlar', slug: 'laptops-computers' },
                { name: 'Smartfonlar va gadjetlar', slug: 'smartphones-gadgets' },
                { name: 'Maishiy texnika', slug: 'home-appliances' },
                { name: 'Kiyim va poyabzallar', slug: 'fashion-shoes' },
              ].map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setSelectedCategory(c.slug)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                    selectedCategory === c.slug
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Maksimal narx (UZS)
            </h4>
            <input
              type="range"
              min={1000000}
              max={20000000}
              step={500000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between items-center text-xs font-bold text-gray-800 mt-2">
              <span>1 000 000</span>
              <span className="text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                {formatUZS(maxPrice)}
              </span>
            </div>
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
              Brendlar
            </h4>
            <div className="space-y-1.5 text-xs">
              {['', 'Lenovo', 'Apple', 'Asus', 'Artel'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                    selectedBrand === b
                      ? 'bg-brand-50 text-brand-700 font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {b || 'Barcha brendlar'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-3">
              <p className="text-base font-semibold text-gray-800">
                Ushbu parametrlar bo'yicha mahsulot topilmadi
              </p>
              <p className="text-xs text-gray-500">
                Filtr parametrlarini o'zgartirib ko'ring yoki AI Yordamchidan so'rang.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.titleUz}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {product.discountPrice && (
                        <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase">
                          Chegirma
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-gray-800">{product.rating}</span>
                        <span className="text-gray-400">({product.reviewCount})</span>
                      </div>
                      <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {product.titleUz}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-gray-500">Katalog yuklanmoqda...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
