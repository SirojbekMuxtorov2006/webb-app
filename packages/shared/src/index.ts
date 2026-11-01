/**
 * Formats a numerical amount into Uzbek So'm currency string
 * e.g. 1500000 -> "1 500 000 so'm"
 */
export function formatUZS(amount: number, locale: 'uz' | 'ru' | 'en' = 'uz'): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '0 so\'m';
  }
  
  const formatted = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  switch (locale) {
    case 'ru':
      return `${formatted} сум`;
    case 'en':
      return `${formatted} UZS`;
    case 'uz':
    default:
      return `${formatted} so'm`;
  }
}

/**
 * Calculates monthly installment payment (e.g., Uzum Nasiya / Anorbank / Alif)
 */
export function calculateInstallment(
  totalAmount: number,
  months: 3 | 6 | 12 | 24 = 12,
  markupPercent: number = 24 // Annual percentage markup, e.g. 24% for 12 months
): { monthlyPayment: number; totalInstallmentPrice: number; markupAmount: number } {
  const markupFactor = 1 + (markupPercent / 100) * (months / 12);
  const totalInstallmentPrice = Math.round(totalAmount * markupFactor);
  const monthlyPayment = Math.round(totalInstallmentPrice / months);
  const markupAmount = totalInstallmentPrice - totalAmount;
  
  return {
    monthlyPayment,
    totalInstallmentPrice,
    markupAmount,
  };
}

/**
 * Uzbekistan Regions & Major Cities
 */
export interface UzbekistanRegion {
  id: string;
  nameUz: string;
  nameRu: string;
  nameEn: string;
  deliveryDays: number;
  deliveryBasePrice: number; // in UZS
  pickupPointsAvailable: boolean;
}

export const UZBEKISTAN_REGIONS: UzbekistanRegion[] = [
  {
    id: 'tashkent-city',
    nameUz: 'Toshkent shahri',
    nameRu: 'г. Ташкент',
    nameEn: 'Tashkent City',
    deliveryDays: 1,
    deliveryBasePrice: 20000,
    pickupPointsAvailable: true,
  },
  {
    id: 'tashkent-region',
    nameUz: 'Toshkent viloyati',
    nameRu: 'Ташкентская область',
    nameEn: 'Tashkent Region',
    deliveryDays: 1,
    deliveryBasePrice: 25000,
    pickupPointsAvailable: true,
  },
  {
    id: 'samarkand',
    nameUz: 'Samarqand viloyati',
    nameRu: 'Самаркандская область',
    nameEn: 'Samarkand Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'bukhara',
    nameUz: 'Buxoro viloyati',
    nameRu: 'Бухарская область',
    nameEn: 'Bukhara Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'fergana',
    nameUz: 'Farg\'ona viloyati',
    nameRu: 'Ферганская область',
    nameEn: 'Fergana Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'andijan',
    nameUz: 'Andijon viloyati',
    nameRu: 'Андижанская область',
    nameEn: 'Andijan Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'namangan',
    nameUz: 'Namangan viloyati',
    nameRu: 'Наманганская область',
    nameEn: 'Namangan Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'kashkadarya',
    nameUz: 'Qashqadaryo viloyati',
    nameRu: 'Кашкадарьинская область',
    nameEn: 'Kashkadarya Region',
    deliveryDays: 2,
    deliveryBasePrice: 35000,
    pickupPointsAvailable: true,
  },
  {
    id: 'surkhandarya',
    nameUz: 'Surxondaryo viloyati',
    nameRu: 'Сурхандарьинская область',
    nameEn: 'Surkhandarya Region',
    deliveryDays: 3,
    deliveryBasePrice: 35000,
    pickupPointsAvailable: true,
  },
  {
    id: 'khorezm',
    nameUz: 'Xorazm viloyati',
    nameRu: 'Хорезмская область',
    nameEn: 'Khorezm Region',
    deliveryDays: 3,
    deliveryBasePrice: 35000,
    pickupPointsAvailable: true,
  },
  {
    id: 'navoi',
    nameUz: 'Navoiy viloyati',
    nameRu: 'Навоийская область',
    nameEn: 'Navoi Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'jizzakh',
    nameUz: 'Jizzax viloyati',
    nameRu: 'Джизакская область',
    nameEn: 'Jizzakh Region',
    deliveryDays: 2,
    deliveryBasePrice: 30000,
    pickupPointsAvailable: true,
  },
  {
    id: 'sirdarya',
    nameUz: 'Sirdaryo viloyati',
    nameRu: 'Сырдарьинская область',
    nameEn: 'Sirdarya Region',
    deliveryDays: 2,
    deliveryBasePrice: 25000,
    pickupPointsAvailable: true,
  },
  {
    id: 'karakalpakstan',
    nameUz: 'Qoraqalpog\'iston Respublikasi',
    nameRu: 'Республика Каракалпакстан',
    nameEn: 'Republic of Karakalpakstan',
    deliveryDays: 3,
    deliveryBasePrice: 40000,
    pickupPointsAvailable: true,
  },
];

/**
 * Validates Uzbekistan phone number (+998 XX XXX XX XX or 998XXXXXXXXX)
 */
export function validateUzbekPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return /^998(90|91|93|94|95|97|98|99|88|33|20|71|77)\d{7}$/.test(cleaned);
}

/**
 * Formats clean phone number to international standard +998 (90) 123-45-67
 */
export function formatUzbekPhone(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  if (cleaned.length === 9) {
    // 901234567 -> +998 (90) 123-45-67
    return `+998 (${cleaned.slice(0, 2)}) ${cleaned.slice(2, 5)}-${cleaned.slice(5, 7)}-${cleaned.slice(7, 9)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('998')) {
    return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
}

/**
 * Generates SEO friendly slugs from multilingual text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
