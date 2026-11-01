# Architecture & System Design — AI E-Commerce Platform (Uzbekistan)

## 1. High-Level System Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │               Client Devices                 │
                    │      (Desktop Web, Mobile Responsive)        │
                    └──────────────────────┬───────────────────────┘
                                           │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │            Next.js 14 App Router             │
                    │   Storefront, Seller Portal, Admin Console   │
                    │    Zustand, Tailwind CSS, TanStack Query     │
                    └──────────────────────┬───────────────────────┘
                                           │
                                           ▼ HTTP / REST / WebSockets
                    ┌──────────────────────────────────────────────┐
                    │           NestJS Modular Backend             │
                    │   Auth, Products, Cart, Orders, AI, Admin    │
                    │     JWT / RBAC Guards, Swagger OpenAPI       │
                    └───────────┬──────────────────────┬───────────┘
                                │                      │
                 Prisma ORM     │                      │ AI Function Calling
                                ▼                      ▼
    ┌─────────────────────────────────┐   ┌────────────────────────────────┐
    │     PostgreSQL / SQLite DB      │   │   Google Gemini / AI Engine    │
    │  Users, Sellers, Products,      │   │  Grounded Vector & SQL Search  │
    │  Orders, Payments, Commissions  │   │  0% Hallucination Architecture │
    └─────────────────────────────────┘   └────────────────────────────────┘
```

## 2. Market-Specific Uzbekistan Integrations

### A. National Payment Gateways
- **Payme**: Implements the official JSON-RPC 2.0 merchant protocol with states:
  - `CheckPerformTransaction`
  - `CreateTransaction`
  - `PerformTransaction`
  - `CancelTransaction`
- **Click**: Merchant webhook integration with preparation (`action=0`) and completion (`action=1`).
- **Uzum Nasiya**: Installment computation engine for 3, 6, 12, and 24 month tenures with instant monthly cost breakdowns (`calculateInstallment()`).
- **Cash on Delivery (Naqd pul / Qabulda karta)**: Traditional localized checkout option.

### B. Logistics & Uzbekistan Regional Support
- Complete dataset of **12 Provinces (Viloyatlar) + Tashkent City + Republic of Karakalpakstan**.
- Pickup Point network simulation (1-day free delivery guarantee).
- Express door-to-door courier routing with real-time tracking IDs (`UZM-TRK-XXXX`).

## 3. Grounded AI Architecture (0% Hallucination Guarantee)
The AI shopping assistant connects directly to real database models:
1. **Query Intent & Budget Extraction**:
   Extracts budget ceilings from natural language expressions (e.g., *"Menga 5 million so'mgacha yaxshi noutbuk kerak"* -> `category: laptops-computers`, `maxPrice: 5,000,000 UZS`).
2. **Grounded Database Filtering**:
   Queries PostgreSQL / SQLite via Prisma for active, in-stock products within budget.
3. **Conversational Synthesis**:
   Constructs helpful bilingual (Uzbek Latin / Russian) guidance explaining hardware trade-offs (e.g., SSD speed, RAM, processor cores) and returns direct interactive product cards into the chat drawer.
