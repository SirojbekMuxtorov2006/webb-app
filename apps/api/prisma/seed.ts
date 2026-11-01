import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for Uzbekistan AI Marketplace...');

  // 1. Clean existing records if any
  try {
    await prisma.reviewImage.deleteMany();
    await prisma.review.deleteMany();
    await prisma.commission.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.refund.deleteMany();
    await prisma.transaction.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.shipment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.wishlistItem.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.inventory.deleteMany();
    await prisma.productSpecification.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.category.deleteMany();
    await prisma.sellerPayout.deleteMany();
    await prisma.sellerBalance.deleteMany();
    await prisma.sellerVerification.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.address.deleteMany();
    await prisma.session.deleteMany();
    await prisma.chatMessage.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.searchHistory.deleteMany();
    await prisma.recentlyViewed.deleteMany();
    await prisma.auditLog.deleteMany();
    await prisma.coupon.deleteMany();
    await prisma.promotion.deleteMany();
    await prisma.user.deleteMany();
  } catch (err) {
    console.log('Clean up note:', err);
  }

  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 2. Create Users
  const superAdmin = await prisma.user.create({
    data: {
      email: 'admin@uzum-marketplace.uz',
      phone: '+998901234567',
      passwordHash,
      firstName: 'Rustam',
      lastName: 'Karimov',
      role: 'SUPER_ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
  });

  const moderator = await prisma.user.create({
    data: {
      email: 'moderator@uzum-marketplace.uz',
      phone: '+998902345678',
      passwordHash,
      firstName: 'Dilshod',
      lastName: 'Nazarov',
      role: 'MODERATOR',
    },
  });

  const sellerUser1 = await prisma.user.create({
    data: {
      email: 'artel@seller.uz',
      phone: '+998903456789',
      passwordHash,
      firstName: 'Artel',
      lastName: 'Official',
      role: 'SELLER',
      avatarUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150',
    },
  });

  const sellerUser2 = await prisma.user.create({
    data: {
      email: 'texnomart@seller.uz',
      phone: '+998904567890',
      passwordHash,
      firstName: 'Texnomart',
      lastName: 'Partners',
      role: 'SELLER',
      avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: 'bekzod.alimov@gmail.com',
      phone: '+998905678901',
      passwordHash,
      firstName: 'Bekzod',
      lastName: 'Alimov',
      role: 'CUSTOMER',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    },
  });

  // Addresses
  await prisma.address.create({
    data: {
      userId: customer1.id,
      title: 'Uy (Toshkent)',
      recipientName: 'Bekzod Alimov',
      phone: '+998905678901',
      region: 'Toshkent shahri',
      city: 'Yunusobod tumani',
      street: 'Amir Temur shox ko\'chasi, 45-uy',
      apartment: '12',
      isDefault: true,
    },
  });

  // 3. Create Sellers & Balances
  const seller1 = await prisma.seller.create({
    data: {
      userId: sellerUser1.id,
      storeName: 'Artel Flagship Store',
      storeSlug: 'artel-electronics',
      description: 'O\'zbekiston bo\'yicha sifatli maishiy texnika va elektronika rasmiy do\'koni.',
      logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
      inn: '305128492',
      legalBusinessName: 'OOO "ARTEL ELECTRONICS MANUFACTURING"',
      bankAccount: '20208000900123456001',
      mfo: '00412',
      verificationStatus: 'APPROVED',
      commissionRate: 4.5,
      rating: 4.9,
      totalSales: 450000000,
    },
  });

  await prisma.sellerBalance.create({
    data: {
      sellerId: seller1.id,
      availableBalance: 85000000,
      pendingBalance: 12000000,
      totalEarned: 450000000,
    },
  });

  const seller2 = await prisma.seller.create({
    data: {
      userId: sellerUser2.id,
      storeName: 'Texnomart Premium',
      storeSlug: 'texnomart-premium',
      description: 'Smartfonlar, noutbuklar va gadjetlar eng yaxshi narxlarda.',
      logoUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=200',
      bannerUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200',
      inn: '308941203',
      legalBusinessName: 'IP "TEXNOMART RETAIL GROUP"',
      bankAccount: '20208000500987654001',
      mfo: '00890',
      verificationStatus: 'APPROVED',
      commissionRate: 5.0,
      rating: 4.8,
      totalSales: 890000000,
    },
  });

  await prisma.sellerBalance.create({
    data: {
      sellerId: seller2.id,
      availableBalance: 140000000,
      pendingBalance: 25000000,
      totalEarned: 890000000,
    },
  });

  // 4. Create Categories
  const catLaptops = await prisma.category.create({
    data: {
      nameUz: 'Noutbuklar va kompyuterlar',
      nameRu: 'Ноутбуки и компьютеры',
      nameEn: 'Laptops & Computers',
      slug: 'laptops-computers',
      icon: 'Laptop',
      imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      sortOrder: 1,
    },
  });

  const catSmartphones = await prisma.category.create({
    data: {
      nameUz: 'Smartfonlar va gadjetlar',
      nameRu: 'Смартфоны и гаджеты',
      nameEn: 'Smartphones & Gadgets',
      slug: 'smartphones-gadgets',
      icon: 'Smartphone',
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      sortOrder: 2,
    },
  });

  const catAppliances = await prisma.category.create({
    data: {
      nameUz: 'Maishiy texnika',
      nameRu: 'Бытовая техника',
      nameEn: 'Home Appliances',
      slug: 'home-appliances',
      icon: 'Tv',
      imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500',
      sortOrder: 3,
    },
  });

  const catFashion = await prisma.category.create({
    data: {
      nameUz: 'Kiyim va poyabzallar',
      nameRu: 'Одежда и обувь',
      nameEn: 'Fashion & Shoes',
      slug: 'fashion-shoes',
      icon: 'Shirt',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
      sortOrder: 4,
    },
  });

  // 5. Create Brands
  const brandLenovo = await prisma.brand.create({
    data: { name: 'Lenovo', slug: 'lenovo', isPopular: true },
  });
  const brandApple = await prisma.brand.create({
    data: { name: 'Apple', slug: 'apple', isPopular: true },
  });
  const brandSamsung = await prisma.brand.create({
    data: { name: 'Samsung', slug: 'samsung', isPopular: true },
  });
  const brandArtel = await prisma.brand.create({
    data: { name: 'Artel', slug: 'artel', isPopular: true },
  });
  const brandAsus = await prisma.brand.create({
    data: { name: 'Asus', slug: 'asus', isPopular: true },
  });

  // 6. Products
  // Product 1: Lenovo IdeaPad (Under 5M UZS - directly solves user request)
  const productLenovo = await prisma.product.create({
    data: {
      sellerId: seller2.id,
      categoryId: catLaptops.id,
      brandId: brandLenovo.id,
      titleUz: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-avlod / 8GB / 256GB SSD',
      titleRu: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-го поколения / 8GB / 256GB SSD',
      titleEn: 'Lenovo IdeaPad 3 15IAU7 Intel Core i3 12th Gen / 8GB / 256GB SSD',
      slug: 'lenovo-ideapad-3-15iau7-i3',
      descriptionUz: 'O\'qish, ofis ishlari va kundalik vazifalar uchun ajoyib va baquvvat noutbuk. 15.6 dyuymli FHD IPS ekran, tezkor SSD xotira va kuchli batareya 7 soatgacha avtonom ishlaydi.',
      descriptionRu: 'Надежный ноутбук для учебы и офисной работы. Четкий IPS экран 15.6 дюймов Full HD, быстрый NVMe SSD и процессор Intel Core 12-го поколения.',
      descriptionEn: 'Reliable everyday laptop for students and office tasks. Features sharp 15.6" FHD IPS display, fast SSD, and long-lasting battery.',
      price: 4799000,
      discountPrice: 4499000,
      stock: 35,
      rating: 4.8,
      reviewCount: 42,
      soldCount: 128,
      status: 'ACTIVE',
      isFeatured: true,
      tags: 'noutbuk, laptop, lenovo, arzon noutbuk, oqish uchun, budget laptop',
    },
  });

  await prisma.productImage.createMany({
    data: [
      { productId: productLenovo.id, url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', isThumbnail: true, sortOrder: 1 },
      { productId: productLenovo.id, url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800', isThumbnail: false, sortOrder: 2 },
    ],
  });

  await prisma.productSpecification.createMany({
    data: [
      { productId: productLenovo.id, keyUz: 'Protsessor', keyRu: 'Процессор', keyEn: 'Processor', valueUz: 'Intel Core i3-1215U (6 yadro)', valueRu: 'Intel Core i3-1215U (6 ядер)', valueEn: 'Intel Core i3-1215U (6 cores)' },
      { productId: productLenovo.id, keyUz: 'Operativ xotira (RAM)', keyRu: 'Оперативная память', keyEn: 'RAM', valueUz: '8 GB DDR4 3200MHz', valueRu: '8 ГБ DDR4', valueEn: '8GB DDR4' },
      { productId: productLenovo.id, keyUz: 'Doimiy xotira (SSD)', keyRu: 'Накопитель', keyEn: 'Storage', valueUz: '256 GB M.2 NVMe SSD', valueRu: '256 ГБ SSD', valueEn: '256GB SSD' },
      { productId: productLenovo.id, keyUz: 'Ekran', keyRu: 'Экран', keyEn: 'Display', valueUz: '15.6" Full HD IPS (1920x1080) Matte', valueRu: '15.6" FHD IPS', valueEn: '15.6" FHD IPS' },
      { productId: productLenovo.id, keyUz: 'Vazni', keyRu: 'Вес', keyEn: 'Weight', valueUz: '1.63 kg', valueRu: '1.63 кг', valueEn: '1.63 kg' },
    ],
  });

  await prisma.inventory.create({
    data: { productId: productLenovo.id, quantity: 35, reserved: 2, warehouseLocation: 'Tashkent Hub #1' },
  });

  // Product 2: Asus Vivobook 15 (Around 5.35M UZS)
  const productAsus = await prisma.product.create({
    data: {
      sellerId: seller2.id,
      categoryId: catLaptops.id,
      brandId: brandAsus.id,
      titleUz: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
      titleRu: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
      titleEn: 'Asus Vivobook 15 X1504VA Core i5-1335U / 16GB / 512GB SSD',
      slug: 'asus-vivobook-15-x1504va-i5',
      descriptionUz: 'Dasturlash, dizayn va yuqori unumdorlik talab qiladigan vazifalar uchun mukammal noutbuk. 16GB RAM va 512GB tezkor xotira bilan har qanday dastur chaqqon ishlaydi.',
      descriptionRu: 'Мощный ноутбук для программирования, учебы и работы. 16 ГБ оперативной памяти и процессор i5 13-го поколения.',
      descriptionEn: 'High-performance laptop for coding and multitasking. 16GB RAM and Intel Core i5 processor.',
      price: 5800000,
      discountPrice: 5350000,
      stock: 20,
      rating: 4.9,
      reviewCount: 29,
      soldCount: 84,
      status: 'ACTIVE',
      isFeatured: true,
      tags: 'noutbuk, asus, vivobook, dasturlash uchun, i5, laptop uzbekistan',
    },
  });

  await prisma.productImage.createMany({
    data: [
      { productId: productAsus.id, url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800', isThumbnail: true, sortOrder: 1 },
    ],
  });

  await prisma.productSpecification.createMany({
    data: [
      { productId: productAsus.id, keyUz: 'Protsessor', keyRu: 'Процессор', keyEn: 'Processor', valueUz: 'Intel Core i5-1335U (10 yadro)', valueRu: 'Intel Core i5-1335U (10 ядер)', valueEn: 'Intel Core i5-1335U (10 cores)' },
      { productId: productAsus.id, keyUz: 'Operativ xotira (RAM)', keyRu: 'Оперативная память', keyEn: 'RAM', valueUz: '16 GB DDR4', valueRu: '16 ГБ DDR4', valueEn: '16GB DDR4' },
      { productId: productAsus.id, keyUz: 'Doimiy xotira (SSD)', keyRu: 'Накопитель', keyEn: 'Storage', valueUz: '512 GB NVMe SSD', valueRu: '512 ГБ SSD', valueEn: '512GB SSD' },
    ],
  });

  await prisma.inventory.create({
    data: { productId: productAsus.id, quantity: 20, reserved: 1, warehouseLocation: 'Tashkent Hub #1' },
  });

  // Product 3: iPhone 16 Pro Max 256GB
  const productIPhone = await prisma.product.create({
    data: {
      sellerId: seller2.id,
      categoryId: catSmartphones.id,
      brandId: brandApple.id,
      titleUz: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
      titleRu: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
      titleEn: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
      slug: 'apple-iphone-16-pro-max-256gb',
      descriptionUz: 'Eng so\'nggi flagman smartfon. A18 Pro protsessori, Camera Control tugmasi, titanium korpus va eng kuchli batareya quvvati.',
      descriptionRu: 'Флагманский смартфон с процессором A18 Pro, титановым корпусом и продвинутой системой камер с кнопкой Camera Control.',
      descriptionEn: 'Flagship smartphone featuring A18 Pro chip, titanium design, and revolutionary camera control.',
      price: 16800000,
      discountPrice: 15990000,
      stock: 45,
      rating: 5.0,
      reviewCount: 78,
      soldCount: 310,
      status: 'ACTIVE',
      isFeatured: true,
      tags: 'apple, iphone, iphone 16, pro max, smartfon, telefon, ios',
    },
  });

  await prisma.productImage.createMany({
    data: [
      { productId: productIPhone.id, url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800', isThumbnail: true, sortOrder: 1 },
      { productId: productIPhone.id, url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800', isThumbnail: false, sortOrder: 2 },
    ],
  });

  await prisma.inventory.create({
    data: { productId: productIPhone.id, quantity: 45, reserved: 3, warehouseLocation: 'Tashkent Central Hub' },
  });

  // Product 4: Artel Smart TV 55" 4K UHD
  const productArtelTV = await prisma.product.create({
    data: {
      sellerId: seller1.id,
      categoryId: catAppliances.id,
      brandId: brandArtel.id,
      titleUz: 'Artel Smart TV 55 dyuym 4K UHD Android TV',
      titleRu: 'Телевизор Artel Smart TV 55" 4K UHD Android TV',
      titleEn: 'Artel 55" Smart TV 4K UHD Android TV',
      slug: 'artel-smart-tv-55-4k-uhd',
      descriptionUz: 'Yorqin va tiniq tasvir beruvchi 55 dyuymli 4K Smart televizor. Ovozli boshqaruv, o\'rnatilgan YouTube, Netflix va barcha mahalliy telekanallar.',
      descriptionRu: 'Современный 4K Smart телевизор с диагональю 55 дюймов на базе Android TV. Поддержка голосового поиска и стриминговых сервисов.',
      descriptionEn: '55" Ultra HD Smart TV powered by Android TV. Vibrant colors and immersive audio.',
      price: 4950000,
      discountPrice: 4490000,
      stock: 18,
      rating: 4.7,
      reviewCount: 65,
      soldCount: 140,
      status: 'ACTIVE',
      isFeatured: true,
      tags: 'televizor, tv, artel, 4k, smart tv, maishiy texnika',
    },
  });

  await prisma.productImage.createMany({
    data: [
      { productId: productArtelTV.id, url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800', isThumbnail: true, sortOrder: 1 },
    ],
  });

  await prisma.inventory.create({
    data: { productId: productArtelTV.id, quantity: 18, reserved: 0, warehouseLocation: 'Artel Factory Depot' },
  });

  // 7. Coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'UZUM2026',
        discountType: 'PERCENT',
        discountValue: 10,
        minOrderValue: 500000,
        maxDiscount: 200000,
        validUntil: new Date('2027-12-31'),
        usageLimit: 1000,
        isActive: true,
      },
      {
        code: 'YANGIYIL',
        discountType: 'FIXED',
        discountValue: 50000,
        minOrderValue: 300000,
        validUntil: new Date('2027-12-31'),
        usageLimit: 500,
        isActive: true,
      },
    ],
  });

  // 8. Sample Customer Order
  const sampleOrder = await prisma.order.create({
    data: {
      orderNumber: 'UZM-2026-87123',
      userId: customer1.id,
      customerName: 'Bekzod Alimov',
      customerPhone: '+998905678901',
      status: 'PROCESSING',
      paymentMethod: 'CLICK',
      paymentStatus: 'COMPLETED',
      deliveryMethod: 'COURIER_STANDARD',
      shippingFee: 20000,
      subtotal: 4499000,
      discountAmount: 200000,
      totalAmount: 4319000,
      deliveryAddressJson: JSON.stringify({
        region: 'Toshkent shahri',
        city: 'Yunusobod tumani',
        street: 'Amir Temur shox ko\'chasi, 45-uy',
        apartment: '12',
      }),
      trackingNumber: 'UZM-TRK-9812984',
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: sampleOrder.id,
      sellerId: seller2.id,
      productId: productLenovo.id,
      productTitle: 'Lenovo IdeaPad 3 15IAU7 Core i3 / 8GB / 256GB SSD',
      productImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
      quantity: 1,
      unitPrice: 4499000,
      totalPrice: 4499000,
    },
  });

  await prisma.payment.create({
    data: {
      orderId: sampleOrder.id,
      method: 'CLICK',
      status: 'COMPLETED',
      amount: 4319000,
      currency: 'UZS',
      externalTransactionId: 'CLICK_PAY_87123681',
    },
  });

  // 9. Initial Review for Lenovo IdeaPad
  await prisma.review.create({
    data: {
      productId: productLenovo.id,
      userId: customer1.id,
      rating: 5,
      comment: 'O\'qish va ofis uchun narxiga arziydigan zo\'r noutbuk! 5 milliondan arzon oldim, dasturlar juda tez ochiladi.',
      isVerifiedPurchase: true,
      isApproved: true,
      likesCount: 14,
    },
  });

  console.log('✅ Seeding completed successfully!');
  console.log('Admin: admin@uzum-marketplace.uz / Password123!');
  console.log('Seller: artel@seller.uz / Password123!');
  console.log('Customer: bekzod.alimov@gmail.com / Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
