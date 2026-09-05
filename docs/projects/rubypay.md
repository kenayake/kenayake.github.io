# RubyPay — Mobile FinTech E-Wallet

<div class="project-card-badge">🏆 1st Place Winner — AyoConnect Ayotron Hackathon</div>

RubyPay is a mobile e-wallet application that integrates with **AyoConnect's** open financial API infrastructure to issue and manage virtual debit cards. I co-developed this application with a 4-person engineering team for the Ayotron competition, where we won **1st Place**.

---

<ProjectCarousel
  title="RubyPay Application UI & Competition"
  :slides="[
    { src: '/images/rubypay/screenshot1.png', alt: 'RubyPay Home Wallet Dashboard', caption: 'RubyPay Home Wallet Dashboard & Balance Overview' },
    { src: '/images/rubypay/screenshot2.png', alt: 'RubyPay Expense Analytics', caption: 'Financial Analytics & Transaction Categorization' },
    { src: '/images/rubypay/1687954867180.jpeg', alt: 'Ayotron Hackathon Team Showcase', caption: 'Ayotron Competition 1st Place Award Showcase' }
  ]"
/>

---

## 🛠️ Technology Stack & Architecture

- **Mobile Client**: Flutter (Dart), Dio HTTP Client, Reactive State Management.
- **Backend Service**: Django REST Framework (Python), Token Authentication, SQLite/PostgreSQL.
- **Integration Layer**: AyoConnect OpenAPI (Virtual Cards, Top-ups, Balance Enquiries), Asynchronous Webhook Handlers.

```
┌─────────────────┐       HTTPS / REST        ┌────────────────────────┐
│  Flutter Mobile │ ────────────────────────> │  Django REST Backend   │
│   Application   │ <──────────────────────── │  - Auth & User State   │
└─────────────────┘       JSON Responses      │  - Webhook Dispatcher  │
                                              └───────────┬────────────┘
                                                          │
                                                          │ Secure API
                                                          ▼
                                              ┌────────────────────────┐
                                              │  AyoConnect OpenAPI    │
                                              │  - Virtual Debit Cards │
                                              │  - Card Issuance Engine│
                                              └────────────────────────┘
```

---

## 🚀 Key Engineering Contributions

### 1. Robust Payment API Integration
I integrated the mobile user experience with AyoConnect's banking APIs. I implemented network resiliency using the `Dio` HTTP library, with custom interceptors for Bearer token refresh, request retries, and network failure fallbacks.

### 2. Custom Django Webhook Processor
I constructed a dedicated backend webhook listener capable of ingesting realtime transactional notifications from AyoConnect. I implemented signature verification to guard against replay attacks and ensure balance states synchronized accurately with card events.

### 3. High-Fidelity UI & State Reactivity
I engineered interactive financial widgets, spend tracking charts, and instant transaction feed updates upon webhook receipt.

---

## 🔗 Project Assets & Reference Links

- 📑 [View Pitch Deck Presentation](https://drive.google.com/file/d/1tPj2QD5BHLpmRKIuQAB9JuUaR_SY585z/view)
- 🎨 [View Mockup UI Designs](https://drive.google.com/file/d/1xQevhjFFrSPYATgjtb96FRZYlZAEpzS0/view)
