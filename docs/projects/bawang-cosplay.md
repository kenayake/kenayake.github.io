# Bawang Cosplay — Costume Rental Marketplace & Community Forum

I developed Bawang Cosplay as a two-sided digital marketplace and community forum platform for anime and costume enthusiasts. The platform provides size-matched costume rental listings alongside dedicated community discussion channels.

---

<ProjectCarousel
  title="Bawang Cosplay Marketplace Platform"
  :slides="[
    { src: '/images/bawang/screenshot1.jpeg', alt: 'Bawang Cosplay Marketplace', caption: 'Costume Rental Marketplace Catalog & Profile Filters' }
  ]"
/>

---

## 🛠️ Technology Stack & Architecture

- **Frontend Application**: Next.js, React, Tailwind CSS.
- **Data Modeling & ORM**: Drizzle ORM (type-safe schema definitions and query building).
- **Backend & Cloud Services**: Firebase Firestore, Firebase Cloud Storage, Next.js Server Actions.
- **Authentication**: Firebase Auth with Role-Based Access Control (RBAC).

```
┌──────────────────┐
│  Next.js Client  │ ── Next.js API Routes ──> ┌─────────────────────────┐
│ (Catalog & Forum)│                           │  Drizzle ORM Engine     │
└────────┬─────────┘                           │  - Type-safe queries    │
         │ Auth Tokens                         └────────────┬────────────┘
         ▼                                                  │
┌──────────────────┐                                        ▼
│  Firebase Auth   │ ────────────────────────────────> ┌─────────────────────────┐
│  - RBAC Claims   │                                   │ Firebase Cloud Services │
└──────────────────┘                                   │ - Firestore Database    │
                                                       │ - Storage Buckets       │
                                                       └─────────────────────────┘
```

---

## 🚀 Key Engineering Contributions

### 1. Relational & Document Schema Architecture
I designed structured schemas for marketplace entities including item condition grades, multi-variant sizing matrices, lender security deposits, and booking availability windows.

### 2. Type-Safe Data Layer with Drizzle ORM
I utilized Drizzle ORM to maintain strict TypeScript end-to-end type safety between data access layers and frontend components, eliminating runtime data anomalies.

### 3. Role-Based Access Control (RBAC)
I implemented authorization guards distinguishing regular marketplace shoppers, verified costume lenders, and platform administrators.

---

## 🔗 Project Links

- 💻 [GitHub Repository](https://github.com/kenayake/bawang-2)
- 🌐 [Visit Live Deployment](https://bawang-2.vercel.app/)
