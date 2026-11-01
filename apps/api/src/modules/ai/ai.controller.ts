import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AIService } from './ai.service';

@Controller('ai')
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('assistant')
  shoppingAssistant(
    @Body() body: { message: string; history?: { role: string; content: string }[]; language?: 'uz' | 'ru' | 'en' },
  ) {
    return this.aiService.processShoppingAssistantQuery(body.message, body.history, body.language);
  }

  @Post('generate-description')
  generateDescription(
    @Body() body: { productTitle: string; brand?: string; category?: string; keyFeatures?: string[] },
  ) {
    return this.aiService.generateProductDescription(body);
  }

  @Get('reviews-summary/:productId')
  summarizeReviews(@Param('productId') productId: string) {
    return this.aiService.summarizeReviews(productId);
  }
}
