# Positopia.Lab — Photography Studio Booking System

I co-developed Positopia.Lab as a commercial web portal and automated reservation engine for a boutique photography studio. The platform replaces manual WhatsApp scheduling with an automated real-time booking pipeline, overlap detection algorithm, and integrated payment gateway.

---

<ProjectCarousel
  title="Positopia.Lab Studio Booking Interface"
  :slides="[
    { src: '/images/positopia/screenshot1.png', alt: 'Positopia Home Gallery', caption: 'Photography Studio Showcase & Equipment Gallery' },
    { src: '/images/positopia/screenshot2.png', alt: 'Positopia Booking Calendar', caption: 'Real-Time Schedule Grid & Slot Reservation Matrix' },
    { src: '/images/positopia/screenshot3.png', alt: 'Positopia Booking Details', caption: 'Checkout Workflow & Midtrans Payment Gateway Integration' }
  ]"
/>

---

## 🛠️ Technology Stack & System Architecture

- **Frontend & SSR**: Next.js, Tailwind CSS, Next-auth.js, TypeScript.
- **Backend Service**: Express.js REST APIs, Node.js runtime, Prisma ORM.
- **Database & Storage**: Supabase (PostgreSQL with Row Level Security), Google OAuth 2.0.
- **Payment Processing**: Midtrans Payment Gateway SDK (Virtual Accounts, QRIS, Credit Cards).

```
┌──────────────────┐
│  Next.js Portal  │ ── Google OAuth ──> ┌─────────────────────────┐
│ (Customer & Host)│                     │  Supabase Auth & RDBMS  │
└────────┬─────────┘                     │  - Users & Roles        │
         │ REST Requests                 │  - Bookings & Calendar  │
         ▼                               └────────────▲────────────┘
┌──────────────────┐                                  │
│ Express.js API   │ ─────────────────────────────────┘
│ - Slot Algorithm │
│ - Webhook Engine │ ──────────────────> ┌─────────────────────────┐
└──────────────────┘     Payment HTTPS   │ Midtrans Payment Gateway│
                                         │ - QRIS / Bank Transfer  │
                                         └─────────────────────────┘
```

---

## 🚀 Key Engineering Contributions

### 1. Conflict-Free Booking & Overlap Prevention Logic
To ensure that studio spaces and equipment sets are never double-booked, I engineered an algorithmic time-range collision detector in the reservation service:
- Validated requested timestamp bounds `[start, end)` against existing confirmed reservations.
- Used optimistic locks and database transactional guards to handle concurrent reservation requests.

### 2. End-to-End Payment Lifecycle (Midtrans SDK)
- I integrated the official **Midtrans Node.js SDK** to generate Snap tokens for secure frontend modal checkouts.
- I implemented signature-validated webhook endpoints that receive asynchronous settlement callbacks from Midtrans, automatically transitioning booking states from `PENDING` to `PAID`.

### 3. Authentication & Access Control
- I configured Google OAuth 2.0 via Supabase Auth for seamless user onboarding.
- I enforced Row Level Security (RLS) policies ensuring customers only have read access to their own booking invoices.

---

## 🔗 Project Links

- 🌐 [Visit Live Deployment](https://positopia-git-dev-positopialab-team.vercel.app/)
