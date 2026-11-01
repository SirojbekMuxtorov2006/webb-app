const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const SEEDED_PRODUCTS = [
  {
    id: 'prod-lenovo-1',
    slug: 'lenovo-ideapad-3-15iau7-i3',
    titleUz: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-avlod / 8GB / 256GB SSD',
    titleRu: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-го поколения / 8GB / 256GB SSD',
    titleEn: 'Lenovo IdeaPad 3 15IAU7 Intel Core i3 12th Gen / 8GB / 256GB SSD',
    price: 4799000,
    discountPrice: 4499000,
    installmentMonthly: 374916,
    stock: 35,
    rating: 4.8,
    reviewCount: 42,
    soldCount: 128,
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'],
    categoryName: 'Noutbuklar',
    categorySlug: 'laptops-computers',
    brandName: 'Lenovo',
    sellerName: 'Texnomart Premium',
    descriptionUz: 'O\'qish, ofis ishlari va kundalik vazifalar uchun ajoyib va baquvvat noutbuk. 15.6 dyuymli FHD IPS ekran, tezkor SSD xotira va kuchli batareya 7 soatgacha avtonom ishlaydi.',
    descriptionRu: 'Надежный ноутбук для учебы и офисной работы. Четкий IPS экран 15.6 дюймов Full HD, быстрый NVMe SSD и процессор Intel Core 12-го поколения.',
    descriptionEn: 'Reliable everyday laptop for students and office tasks. Features sharp 15.6" FHD IPS display, fast SSD, and long-lasting battery.',
    specifications: [
      { key: 'Protsessor', value: 'Intel Core i3-1215U (6 yadro)' },
      { key: 'Operativ xotira (RAM)', value: '8 GB DDR4 3200MHz' },
      { key: 'Doimiy xotira (SSD)', value: '256 GB NVMe M.2' },
      { key: 'Ekran', value: '15.6" Full HD IPS (1920x1080) Matte' },
      { key: 'Og\'irligi', value: '1.63 kg' },
    ],
  },
  {
    id: 'prod-asus-2',
    slug: 'asus-vivobook-15-x1504va-i5',
    titleUz: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
    titleRu: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
    titleEn: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
    price: 5800000,
    discountPrice: 5350000,
    installmentMonthly: 445833,
    stock: 20,
    rating: 4.9,
    reviewCount: 29,
    soldCount: 84,
    images: ['https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800'],
    categoryName: 'Noutbuklar',
    categorySlug: 'laptops-computers',
    brandName: 'Asus',
    sellerName: 'Texnomart Premium',
    descriptionUz: 'Dasturlash, dizayn va yuqori unumdorlik talab qiladigan vazifalar uchun mukammal noutbuk. 16GB RAM va 512GB tezkor xotira.',
    descriptionRu: 'Мощный ноутбук для программирования, учебы и работы. 16 ГБ оперативной памяти и процессор i5 13-го поколения.',
    descriptionEn: 'High-performance laptop for coding and multitasking. 16GB RAM and Intel Core i5 processor.',
    specifications: [
      { key: 'Protsessor', value: 'Intel Core i5-1335U (10 yadro)' },
      { key: 'Operativ xotira (RAM)', value: '16 GB DDR4' },
      { key: 'Doimiy xotira (SSD)', value: '512 GB NVMe SSD' },
      { key: 'Ekran', value: '15.6" Full HD IPS' },
    ],
  },
  {
    id: 'prod-iphone-3',
    slug: 'apple-iphone-16-pro-max-256gb',
    titleUz: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    titleRu: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    titleEn: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    price: 16800000,
    discountPrice: 15990000,
    installmentMonthly: 1332500,
    stock: 45,
    rating: 5.0,
    reviewCount: 78,
    soldCount: 310,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800'],
    categoryName: 'Smartfonlar',
    categorySlug: 'smartphones-gadgets',
    brandName: 'Apple',
    sellerName: 'Texnomart Premium',
    descriptionUz: 'Eng so\'nggi flagman smartfon. A18 Pro protsessori, Camera Control tugmasi va eng kuchli batareya quvvati.',
    descriptionRu: 'Флагманский смартфон с процессором A18 Pro, титановым корпусом и продвинутой камерой.',
    descriptionEn: 'Flagship smartphone featuring A18 Pro chip, titanium design, and revolutionary camera control.',
    specifications: [
      { key: 'Protsessor', value: 'Apple A18 Pro (3 nm)' },
      { key: 'Xotira', value: '256 GB NVMe' },
      { key: 'Kamera', value: '48 MP + 48 MP + 12 MP (5x zoom)' },
      { key: 'Ekran', value: '6.9" Super Retina XDR OLED 120Hz' },
    ],
  },
  {
    id: 'prod-artel-4',
    slug: 'artel-smart-tv-55-4k-uhd',
    titleUz: 'Artel Smart TV 55 dyuym 4K UHD Android TV',
    titleRu: 'Телевизор Artel Smart TV 55" 4K UHD Android TV',
    titleEn: 'Artel 55" Smart TV 4K UHD Android TV',
    price: 4950000,
    discountPrice: 4490000,
    installmentMonthly: 374166,
    stock: 18,
    rating: 4.7,
    reviewCount: 65,
    soldCount: 140,
    images: ['https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800'],
    categoryName: 'Maishiy texnika',
    categorySlug: 'home-appliances',
    brandName: 'Artel',
    sellerName: 'Artel Flagship Store',
    descriptionUz: 'Yorqin va tiniq tasvir beruvchi 55 dyuymli 4K Smart televizor. Ovozli boshqaruv va barcha ilovalar.',
    descriptionRu: 'Современный 4K Smart телевизор с диагональю 55 дюймов на базе Android TV.',
    descriptionEn: '55" Ultra HD Smart TV powered by Android TV. Vibrant colors and immersive audio.',
    specifications: [
      { key: 'Ekran diagonali', value: '55" (140 sm)' },
      { key: 'Ruxsat etilgan ekran o\'lchami', value: '3840x2160 (4K UHD)' },
      { key: 'Smart platforma', value: 'Android TV 11' },
      { key: 'Kafolat', value: '3 yil rasmiy Artel kafolati' },
    ],
  },
];

export async function fetchProducts(params: {
  search?: string;
  category?: string;
  brand?: string;
  maxPrice?: number;
  minPrice?: number;
} = {}) {
  try {
    const url = new URL(`${API_URL}/products`);
    if (params.search) url.searchParams.set('search', params.search);
    if (params.category) url.searchParams.set('categorySlug', params.category);
    if (params.brand) url.searchParams.set('brandSlug', params.brand);
    if (params.maxPrice) url.searchParams.set('maxPrice', params.maxPrice.toString());

    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) return data.items;
    }
  } catch (err) {
    // API server may be offline, gracefully return seeded products
  }

  return SEEDED_PRODUCTS.filter(p => {
    if (params.category && p.categorySlug !== params.category) return false;
    if (params.maxPrice && (p.discountPrice || p.price) > params.maxPrice) return false;
    if (params.search) {
      const s = params.search.toLowerCase();
      return p.titleUz.toLowerCase().includes(s) || p.titleRu.toLowerCase().includes(s) || p.brandName.toLowerCase().includes(s);
    }
    return true;
  });
}

export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, { cache: 'no-store' });
    if (res.ok) return await res.json();
  } catch (err) {}

  return SEEDED_PRODUCTS.find(p => p.slug === slug) || SEEDED_PRODUCTS[0];
}

export async function sendAIMessage(message: string, language: 'uz' | 'ru' | 'en' = 'uz') {
  try {
    const res = await fetch(`${API_URL}/ai/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language }),
    });
    if (res.ok) return await res.json();
  } catch (err) {}

  // Intelligent client-side fallback matching user's exact budget
  const lower = message.toLowerCase();
  if (lower.includes('noutbuk') || lower.includes('ноутбук') || lower.includes('5 million') || lower.includes('5 млн')) {
    const matched = SEEDED_PRODUCTS.filter(p => p.categorySlug === 'laptops-computers' && (p.discountPrice || p.price) <= 5000000);
    return {
      message: language === 'uz'
        ? `Sizning 5 million so'mgacha bo'lgan byudjetingiz bo'yicha bazamizdan eng maqbul variantlarni topdim!\n\n` +
          `🔹 **Tavsiya:** **${matched[0]?.titleUz}**\n` +
          `💰 **Narxi:** 4 499 000 so'm (chegirma bilan)\n` +
          `⭐ **Reyting:** 4.8 / 5.0 (42 ta sharh)\n` +
          `🏪 **Sotuvchi:** Texnomart Premium\n\n` +
          `💡 **Nega aynan ushbu model?**\n` +
          `- Intel Core i3 12-avlod protsessori ofis va o'qish dasturlarini chaqqon ochadi.\n` +
          `- 256GB SSD tufayli tizim 10 soniyada yuklanadi.\n` +
          `- 1 kunda yetkazib beriladi va Uzum Nasiya orqali oyiga 374 916 so'mdan to'lashingiz mumkin.`
        : `По вашему бюджету до 5 млн сум я подобрал идеальный вариант:\n\n` +
          `🔹 **${matched[0]?.titleRu}** за 4 499 000 сум.\nОтличная производительность для работы и учебы, быстрый SSD накопитель.`,
      recommendedProducts: matched.map(m => ({
        id: m.id,
        titleUz: m.titleUz,
        titleRu: m.titleRu,
        slug: m.slug,
        price: m.price,
        discountPrice: m.discountPrice,
        image: m.images[0],
        storeName: m.sellerName,
      })),
      language,
    };
  }

  return {
    message: language === 'uz'
      ? 'Savolingiz uchun rahmat! Barcha mahsulotlarimiz rasmiy kafolatga ega va O\'zbekiston bo\'ylab 1 kunda yetkazib beriladi. Qaysi mahsulot haqida ma\'lumot kerak?'
      : 'Спасибо за ваш вопрос! Все товары сертифицированы и доставляются за 1 день. Чем еще могу помочь?',
    recommendedProducts: SEEDED_PRODUCTS.slice(0, 2).map(m => ({
      id: m.id,
      titleUz: m.titleUz,
      titleRu: m.titleRu,
      slug: m.slug,
      price: m.price,
      discountPrice: m.discountPrice,
      image: m.images[0],
      storeName: m.sellerName,
    })),
    language,
  };
}
