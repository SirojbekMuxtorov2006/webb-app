# Production Deployment Guide

## 1. Prerequisites
- Docker & Docker Compose
- Node.js 20+
- PostgreSQL 16
- Redis 7

## 2. Docker Compose Deployment

Run the complete multi-container stack:
```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build -d
```

This starts:
1. `ecommerce_postgres` on port `5432`
2. `ecommerce_redis` on port `6379`
3. `ecommerce_meilisearch` on port `7700`
4. `ecommerce_api` on port `4000` (NestJS REST API)
5. `ecommerce_web` on port `3000` (Next.js Frontend)

## 3. Database Migration in Production
```bash
docker exec -it ecommerce_api npx prisma migrate deploy --schema=infrastructure/database/schema.postgres.prisma
```

## 4. Health Checks
- API Health & Swagger: `http://localhost:4000/api/docs`
- Web Frontend: `http://localhost:3000`
