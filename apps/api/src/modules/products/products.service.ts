import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    search?: string;
    categorySlug?: string;
    brandSlug?: string;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
    sort?: 'popular' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
    page?: number;
    limit?: number;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 12));
    const skip = (page - 1) * limit;

    const where: any = {
      status: 'ACTIVE',
    };

    if (query.search) {
      const term = query.search.trim().toLowerCase();
      where.OR = [
        { titleUz: { contains: term } },
        { titleRu: { contains: term } },
        { titleEn: { contains: term } },
        { descriptionUz: { contains: term } },
        { descriptionRu: { contains: term } },
        { tags: { contains: term } },
      ];
    }

    if (query.categorySlug) {
      where.category = { slug: query.categorySlug };
    }

    if (query.brandSlug) {
      where.brand = { slug: query.brandSlug };
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      where.price = {};
      if (query.minPrice !== undefined) where.price.gte = Number(query.minPrice);
      if (query.maxPrice !== undefined) where.price.lte = Number(query.maxPrice);
    }

    if (query.rating) {
      where.rating = { gte: Number(query.rating) };
    }

    if (query.inStock) {
      where.stock = { gt: 0 };
    }

    let orderBy: any = { createdAt: 'desc' };
    if (query.sort === 'popular') orderBy = { soldCount: 'desc' };
    if (query.sort === 'price_asc') orderBy = { price: 'asc' };
    if (query.sort === 'price_desc') orderBy = { price: 'desc' };
    if (query.sort === 'rating') orderBy = { rating: 'desc' };
    if (query.sort === 'newest') orderBy = { createdAt: 'desc' };

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
          brand: true,
          images: { orderBy: { sortOrder: 'asc' } },
          seller: { select: { id: true, storeName: true, storeSlug: true, rating: true } },
          variants: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findFeatured() {
    return this.prisma.product.findMany({
      where: { status: 'ACTIVE', isFeatured: true },
      take: 8,
      include: {
        category: true,
        brand: true,
        images: true,
        seller: { select: { storeName: true, storeSlug: true, rating: true } },
      },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        brand: true,
        images: { orderBy: { sortOrder: 'asc' } },
        specifications: true,
        variants: true,
        seller: {
          select: {
            id: true,
            storeName: true,
            storeSlug: true,
            description: true,
            rating: true,
            totalSales: true,
            logoUrl: true,
          },
        },
        reviews: {
          where: { isApproved: true },
          include: {
            user: { select: { firstName: true, lastName: true, avatarUrl: true } },
            images: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with slug '${slug}' was not found.`);
    }

    return product;
  }

  async create(sellerId: string, data: any) {
    const slug = data.titleUz.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
    return this.prisma.product.create({
      data: {
        sellerId,
        categoryId: data.categoryId,
        brandId: data.brandId,
        titleUz: data.titleUz,
        titleRu: data.titleRu || data.titleUz,
        titleEn: data.titleEn || data.titleUz,
        slug,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu || data.descriptionUz,
        descriptionEn: data.descriptionEn || data.descriptionUz,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
        stock: Number(data.stock) || 0,
        tags: data.tags,
        images: {
          create: (data.images || []).map((img: string, idx: number) => ({
            url: img,
            isThumbnail: idx === 0,
            sortOrder: idx,
          })),
        },
        specifications: {
          create: (data.specifications || []).map((spec: any) => ({
            keyUz: spec.keyUz,
            keyRu: spec.keyRu || spec.keyUz,
            keyEn: spec.keyEn || spec.keyUz,
            valueUz: spec.valueUz,
            valueRu: spec.valueRu || spec.valueUz,
            valueEn: spec.valueEn || spec.valueUz,
          })),
        },
      },
      include: {
        images: true,
        specifications: true,
      },
    });
  }

  async update(id: string, sellerId: string, role: string, data: any) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    if (role !== 'SUPER_ADMIN' && role !== 'ADMIN' && product.sellerId !== sellerId) {
      throw new ForbiddenException('You can only update your own store products.');
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        titleUz: data.titleUz,
        titleRu: data.titleRu,
        titleEn: data.titleEn,
        descriptionUz: data.descriptionUz,
        descriptionRu: data.descriptionRu,
        descriptionEn: data.descriptionEn,
        price: data.price !== undefined ? Number(data.price) : undefined,
        discountPrice: data.discountPrice !== undefined ? Number(data.discountPrice) : undefined,
        stock: data.stock !== undefined ? Number(data.stock) : undefined,
        tags: data.tags,
      },
    });
  }
}
