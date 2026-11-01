# API Endpoints & Swagger Specification

Interactive OpenAPI Swagger UI is available at `http://localhost:4000/api/docs`.

## 1. Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a customer account
- `POST /api/auth/register-seller` — Onboard a new vendor with INN and store information
- `POST /api/auth/login` — Sign in and retrieve JWT access and refresh tokens
- `POST /api/auth/refresh` — Refresh expired JWT access token
- `GET /api/auth/me` — Authenticated profile (Bearer token required)

## 2. Product Catalog (`/api/products`)
- `GET /api/products` — Filter products by search keyword, categorySlug, brandSlug, minPrice, maxPrice, rating, inStock, and sort
- `GET /api/products/featured` — Homepage featured products
- `GET /api/products/:slug` — Detailed product specifications, seller profile, and customer reviews
- `POST /api/products` — Create a product (Seller/Admin only)
- `PUT /api/products/:id` — Update product details (Seller/Admin only)

## 3. Shopping Cart (`/api/cart`)
- `GET /api/cart` — Retrieve items in cart with subtotal and delivery cost
- `POST /api/cart/items` — Add an item to cart
- `PUT /api/cart/items/:id` — Update quantity
- `DELETE /api/cart/items/:id` — Remove item
- `DELETE /api/cart` — Clear cart

## 4. Orders & Checkout (`/api/orders`)
- `POST /api/orders` — Create a new order with items, address, delivery, and coupon
- `GET /api/orders/my-orders` — Customer order history with tracking codes
- `GET /api/orders/:id` — Detailed order status

## 5. Uzbekistan Payments & Webhooks (`/api/payments`)
- `POST /api/payments/initiate` — Generate payment redirect URL for Payme, Click, or Uzum Nasiya
- `POST /api/payments/webhook/payme` — Payme JSON-RPC 2.0 Webhook endpoint
- `POST /api/payments/webhook/click` — Click merchant webhook endpoint
- `POST /api/payments/sandbox/confirm/:orderId` — Instant payment confirmation simulator

## 6. AI Shopping Assistant (`/api/ai`)
- `POST /api/ai/assistant` — Process conversational queries in Uzbek, Russian, or English with grounded product recommendations
- `POST /api/ai/generate-description` — Generate trilingual SEO titles, specifications, and copy for sellers
- `GET /api/ai/reviews-summary/:productId` — AI sentiment analysis and review summarization
