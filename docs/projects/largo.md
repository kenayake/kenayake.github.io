# Largo id — E-Bikes Showcase & Content Management Portal

Largo id is a premium web portal and custom content management system (CMS) for a handcrafted vintage electric bicycle brand in which I engineered the backend for. The project features a public-facing product catalog alongside a password-protected administrative dashboard for managing inventory, technical specifications, and publishing rich editorial articles.

---

<ProjectCarousel
  title="Largo id E-Bikes Portal & CMS Dashboard"
  :slides="[
    { src: '/images/largo/Screenshot1.png', alt: 'Largo Product Landing Page', caption: 'Public Product Landing Page & Specification Visualizer' },
    { src: '/images/largo/Screenshot2.png', alt: 'Largo Admin Add Product', caption: 'Administrative Product & Specification Management Console' },
    { src: '/images/largo/Screenshot3.png', alt: 'Largo Admin Add News', caption: 'Rich Text WYSIWYG News Publisher & Image Asset Uploader' }
  ]"
/>

---

## 🛠️ Technology Stack & Architecture

- **Frontend Application**: Next.js, Tailwind CSS, TypeScript.
- **Backend & Persistence**: Firebase Firestore (NoSQL Document Store), Firebase Storage (Binary Image CDN).
- **Authentication**: Firebase Auth (Admin Role Guard).
- **Content Management**: Rich Text WYSIWYG Editor with image embedding support.

```
┌───────────────────────────────────────┐
│        Next.js Fullstack Portal       │
│ ┌──────────────────┐ ┌──────────────┐ │
│ │  Public Catalog  │ │ Admin CMS    │ │
│ └─────────┬────────┘ └──────┬───────┘ │
└───────────┼─────────────────┼─────────┘
            │                 │ Admin Guarded
            ▼                 ▼
┌───────────────────────────────────────┐
│        Firebase Cloud Services        │
│ ├── Firestore (Products, News Docs)   │
│ └── Cloud Storage (High-res Media)    │
└───────────────────────────────────────┘
```

---

## 🚀 Key Engineering Contributions

### 1. High-Fidelity Responsive Component Architecture
I translated bespoke, typography-heavy Figma design systems into pixel-perfect Tailwind CSS components with fluid responsive layouts and dark/light contrast balance.

### 2. Custom Content Authoring Workflow
I built an administrative publishing suite allowing non-technical editors to draft, preview, and publish press releases and product announcements. I integrated a WYSIWYG text editor directly into Firebase Storage image pipelines.

### 3. Server-Rendered Firestore Integration
I leveraged Next.js Server Components and dynamic route parameters to efficiently fetch product metadata from Cloud Firestore, ensuring fast Time-to-First-Byte (TTFB) and search engine crawlability.

---

## 🔗 Project Links

- 💻 [GitHub Repository](https://github.com/kenayake/largo-frontend)
- 🌐 [Visit Live Deployment](https://largo-id.vercel.app/)
