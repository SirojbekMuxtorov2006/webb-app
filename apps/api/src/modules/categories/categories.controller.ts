import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('categories')
export class CategoriesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getCategories() {
    return this.prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  }

  @Get(':slug')
  async getCategoryBySlug(@Param('slug') slug: string) {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        children: true,
        products: {
          take: 12,
          include: { images: true, brand: true },
        },
      },
    });
  }
}
