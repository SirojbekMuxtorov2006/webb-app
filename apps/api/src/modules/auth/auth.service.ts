import { Injectable, BadRequestException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto, LoginDto, RegisterSellerDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerCustomer(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email.toLowerCase() },
          dto.phone ? { phone: dto.phone } : undefined,
        ].filter(Boolean) as any,
      },
    });

    if (existing) {
      throw new ConflictException('A user with this email or phone number already exists.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        role: 'CUSTOMER',
      },
    });

    return this.generateTokens(user);
  }

  async registerSeller(dto: RegisterSellerDto) {
    const existing = await this.prisma.user.findFirst({
      where: { email: dto.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('A user with this email already exists.');
    }

    const existingStore = await this.prisma.seller.findFirst({
      where: {
        OR: [
          { storeName: dto.storeName },
          { inn: dto.inn },
        ],
      },
    });

    if (existingStore) {
      throw new ConflictException('A store with this name or INN is already registered.');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const storeSlug = dto.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email.toLowerCase(),
          passwordHash,
          firstName: dto.firstName,
          lastName: dto.lastName,
          phone: dto.phone,
          role: 'SELLER',
        },
      });

      const seller = await tx.seller.create({
        data: {
          userId: user.id,
          storeName: dto.storeName,
          storeSlug,
          inn: dto.inn,
          legalBusinessName: dto.legalBusinessName,
          verificationStatus: 'PENDING',
        },
      });

      await tx.sellerBalance.create({
        data: {
          sellerId: seller.id,
          availableBalance: 0,
          pendingBalance: 0,
          totalEarned: 0,
        },
      });

      return user;
    });

    return this.generateTokens(result);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: { sellerProfile: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return this.generateTokens(user);
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'supersecretuzbekistankey2026_refresh_token',
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        include: { sellerProfile: true },
      });

      if (!user) {
        throw new UnauthorizedException('User no longer exists.');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired.');
    }
  }

  private generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      sellerId: user.sellerProfile?.id || null,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'supersecretuzbekistankey2026_jwt_token_auth',
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'supersecretuzbekistankey2026_refresh_token',
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        sellerId: user.sellerProfile?.id || null,
        storeName: user.sellerProfile?.storeName || null,
      },
    };
  }
}
