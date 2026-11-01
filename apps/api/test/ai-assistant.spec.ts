import { Test, TestingModule } from '@nestjs/testing';
import { AIService } from '../src/modules/ai/ai.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AIService - Grounded Shopping Assistant', () => {
  let aiService: AIService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 'mock-lenovo',
          titleUz: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-avlod',
          titleRu: 'Lenovo IdeaPad 3 15IAU7 Core i3 12-го поколения',
          slug: 'lenovo-ideapad-3-15iau7-i3',
          price: 4799000,
          discountPrice: 4499000,
          rating: 4.8,
          reviewCount: 42,
          stock: 35,
          images: [{ url: 'https://images.unsplash.com/mock.jpg' }],
          seller: { storeName: 'Texnomart Premium', rating: 4.8 },
        },
      ]),
    },
    review: {
      findMany: jest.fn().mockResolvedValue([
        { rating: 5, comment: 'Zo\'r noutbuk!' },
        { rating: 4, comment: 'Yaxshi' },
      ]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AIService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    aiService = module.get<AIService>(AIService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(aiService).toBeDefined();
  });

  it('should parse budget "5 million so\'mgacha noutbuk" and return grounded products from DB', async () => {
    const query = "Menga 5 million so'mgacha yaxshi noutbuk kerak";
    const result = await aiService.processShoppingAssistantQuery(query, [], 'uz');

    expect(result).toBeDefined();
    expect(result.language).toBe('uz');
    expect(result.recommendedProducts.length).toBeGreaterThan(0);
    expect(result.recommendedProducts[0].titleUz).toContain('Lenovo IdeaPad');
    expect(result.message).toContain('4 499 000');
    expect(mockPrismaService.product.findMany).toHaveBeenCalled();
  });

  it('should generate professional multilingual seller product descriptions without hallucinations', async () => {
    const result = await aiService.generateProductDescription({
      productTitle: 'IdeaPad 3',
      brand: 'Lenovo',
      keyFeatures: ['8GB RAM', '256GB SSD', 'Intel i3'],
    });

    expect(result.titleUz).toContain('Lenovo IdeaPad 3');
    expect(result.descriptionUz).toContain('8GB RAM, 256GB SSD, Intel i3');
    expect(result.suggestedTags).toContain('lenovo');
  });

  it('should summarize reviews and calculate positive sentiment percentages', async () => {
    const summary = await aiService.summarizeReviews('mock-lenovo');

    expect(summary).toBeDefined();
    expect(summary.averageRating).toBe(4.5);
    expect(summary.totalReviews).toBe(2);
    expect(summary.positivePoints.length).toBeGreaterThan(0);
  });
});
