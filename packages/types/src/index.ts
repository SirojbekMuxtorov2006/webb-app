export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  SELLER = 'SELLER',
  CUSTOMER = 'CUSTOMER',
  SUPPORT_AGENT = 'SUPPORT_AGENT'
}

export enum SellerVerificationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REJECTED = 'REJECTED'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum PaymentMethod {
  PAYME = 'PAYME',
  CLICK = 'CLICK',
  UZUM_NASIYA = 'UZUM_NASIYA',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

export enum DeliveryMethod {
  COURIER_STANDARD = 'COURIER_STANDARD',
  COURIER_EXPRESS = 'COURIER_EXPRESS',
  PICKUP_POINT = 'PICKUP_POINT'
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface SellerProfile {
  id: string;
  userId: string;
  storeName: string;
  storeSlug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  inn: string; // Uzbekistan Taxpayer Identification Number
  legalBusinessName: string;
  verificationStatus: SellerVerificationStatus;
  commissionRate: number; // e.g. 5.0%
  balance: number; // in UZS
  rating: number;
  totalSales: number;
}

export interface Category {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  slug: string;
  icon?: string;
  imageUrl?: string;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  isPopular?: boolean;
}

export interface ProductSpecification {
  id?: string;
  keyUz: string;
  keyRu: string;
  keyEn: string;
  valueUz: string;
  valueRu: string;
  valueEn: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  title: string;
  price: number; // UZS
  discountPrice?: number;
  stock: number;
  attributes: Record<string, string>; // e.g., { color: "Space Gray", storage: "256GB" }
  images: string[];
}

export interface Product {
  id: string;
  sellerId: string;
  seller?: {
    storeName: string;
    storeSlug: string;
    rating: number;
  };
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  slug: string;
  descriptionUz: string;
  descriptionRu: string;
  descriptionEn: string;
  price: number; // UZS
  discountPrice?: number;
  installmentPriceMonthly?: number; // Uzum Nasiya calculation e.g. 12 months
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  status: ProductStatus;
  images: string[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  shippingFee: number;
  total: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  variantTitle?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sellerId: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: {
    region: string; // e.g. "Toshkent shahri", "Samarqand viloyati"
    city: string;
    street: string;
    apartment?: string;
    notes?: string;
  };
  pickupPointId?: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  trackingNumber?: string;
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'uz' | 'ru' | 'en';
  recommendedProducts?: Product[];
  actionPrompt?: string;
}

export interface AISearchRequest {
  query: string;
  language?: 'uz' | 'ru' | 'en';
  categorySlug?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface AIDescriptionGenerateRequest {
  productTitle: string;
  brand?: string;
  category?: string;
  keyFeatures: string[];
  targetAudience?: string;
  languages: ('uz' | 'ru' | 'en')[];
}
