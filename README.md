# AI-Powered Multi-Vendor E-Commerce Platform (Uzbekistan) 🚀🇺🇿

An enterprise-grade, multi-vendor AI e-commerce marketplace built specifically for the Uzbekistan market, combining capabilities inspired by **Uzum Market, Amazon, and modern AI shopping assistants**.

---

## 🌟 Key Features

### 🛍️ 1. Customer Experience & Marketplace Storefront
- **Trilingual Interface**: Uzbek (Latin), Russian, and English.
- **National Currency**: Uzbekistani So'm (`UZS`) with formatted thousands separators (`4 499 000 so'm`).
- **Product Catalog with Dynamic Filters**: Category tree, brand filters, real-time price slider in UZS, rating filters, and in-stock badges.
- **Product Details Page**: High-resolution gallery, comprehensive technical specifications, seller store badges, and 10-day return guarantees.
- **Shopping Cart & Checkout**: Real-time total calculation, free 1-day delivery threshold, and coupon engine (`UZUM2026`, `YANGIYIL`).

### 🤖 2. Core AI Capabilities (Grounded & 0% Hallucination)
- **Natural Language Shopping Assistant**:
  - Understands conversational requests in Uzbek and Russian (e.g., *"Menga 5 million so'mgacha yaxshi noutbuk kerak"*).
  - Understands budget ceilings and extracts category intent.
  - Queries actual database products; **never invents prices, ratings, or specifications**.
  - Embeds interactive product cards with direct "Add to Cart" functionality right inside the chat drawer.
- **AI Seller Copilot**: Automatic trilingual product title generator, SEO metadata creation, and marketing copywriter.
- **AI Review Sentiment Summarizer**: Customer feedback sentiment analysis with breakdown of top praise and caveats.

### 💳 3. Uzbekistan Payment Gateways & Logistics
- **Payme**: Official JSON-RPC 2.0 merchant webhook handler (`CheckPerformTransaction`, `CreateTransaction`, `PerformTransaction`).
- **Click**: Complete merchant prepare (`action=0`) and complete (`action=1`) webhook integration.
- **Uzum Nasiya**: Real-time installment calculator for 3, 6, 12, and 24 months (`0-0-12`).
- **Cash on Delivery**: Cash or POS card terminal payment upon arrival.
- **12 Regions Coverage**: Tashkent City and all 12 Viloyatlar with automated tracking codes (`UZM-TRK-XXXX`).

### 🏪 4. Multi-Vendor Seller Portal
- Seller onboarding with **Uzbekistan Tax ID (INN)** and business registration.
- Store performance dashboard (revenue, total orders, available balance vs pending balance).
- Product management with inventory tracking and low-stock alerts.
- Payout request system to Uzbek national bank accounts (MFO, 20-digit bank account).

### 🛡️ 5. Enterprise Admin Console
- Platform GMV analytics, commission tracking (5% default rate), and order summaries.
- **Seller KYC Moderation Queue**: Review, approve, or reject vendor legal documents and applications.
- Role-Based Access Control (**RBAC**): `SUPER_ADMIN`, `ADMIN`, `MODERATOR`, `SELLER`, `CUSTOMER`, `SUPPORT_AGENT`.
- Comprehensive system audit logs for administrative actions and payment transactions.

---

## 🏗️ Monorepo Architecture

```
e-cormmes/
├── apps/
│   ├── web/                    # Next.js 14 App Router, Tailwind CSS, Zustand, Lucide Icons
│   ├── api/                    # NestJS Modular Backend, Prisma ORM, Passport JWT, Swagger
│   └── worker/                 # Background Queue Processor
├── packages/
│   ├── types/                  # Shared TypeScript interfaces & DTOs
│   ├── shared/                 # Uzbekistan currency formatters, region data, phone validators
│   └── ui/                     # Design tokens & UI utilities
├── infrastructure/
│   ├── docker/                 # Dockerfile.api, Dockerfile.web, docker-compose.yml
│   └── database/               # PostgreSQL & SQLite schemas, Migrations, Seeds
└── docs/
    ├── architecture/           # System design & architecture diagrams
    ├── api/                    # REST API & Webhook documentation
    └── deployment/             # Production deployment guide
```

---

## ⚡ Quickstart & Local Development

### 1. Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### 2. Install Dependencies & Build Packages
```bash
npm install
npm run build --workspace=@ecommerce/types
npm run build --workspace=@ecommerce/shared
npm run build --workspace=@ecommerce/ui
```

### 3. Database Setup & Seed
```bash
cd apps/api
npx prisma db push
npx ts-node prisma/seed.ts
```

**Pre-seeded Demo Accounts:**
- **Super Admin**: `admin@uzum-marketplace.uz` / `Password123!`
- **Seller (Texnomart)**: `texnomart@seller.uz` / `Password123!`
- **Seller (Artel)**: `artel@seller.uz` / `Password123!`
- **Customer**: `bekzod.alimov@gmail.com` / `Password123!`

### 4. Run the Development Servers
In two separate terminals:

**Backend API (Port 4000):**
```bash
npm run dev:api
```
- API Base: `http://localhost:4000/api`
- Swagger Docs: `http://localhost:4000/api/docs`

**Frontend Web (Port 3000):**
```bash
npm run dev:web
```
- Marketplace: `http://localhost:3000`
- Seller Portal: `http://localhost:3000/seller`
- Admin Console: `http://localhost:3000/admin`

---

## 🧪 Testing

Run the automated test suite covering AI assistant budget grounding, installment engines, and Payme/Click webhooks:
```bash
cd apps/api
npx jest --config jest.config.js
```

---

## 🐳 Docker Deployment

To launch the complete containerized stack (PostgreSQL 16, Redis 7, Meilisearch, API, and Next.js):
```bash
docker compose -f infrastructure/docker/docker-compose.yml up --build -d
```
# webb-app
