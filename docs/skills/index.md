# Technical Specifications & Stack

A comprehensive architectural breakdown of languages, frameworks, runtime engines, and enterprise tooling utilized across production and laboratory environments.

---

## ☕ Programming Languages

| Language | Primary Use Cases | Experience Level | Key Libraries / Ecosystem |
| :--- | :--- | :--- | :--- |
| **Java** | Enterprise banking, backend APIs, transactional persistence, schedulers | Advanced / Daily Driver | Java 8/17/21, Spring Boot, Struts 2, JPA/Hibernate, JUnit |
| **SQL** | Relational data schema design, indexing, stored procedures, joins | Advanced | ANSI SQL, MariaDB, MySQL, PostgreSQL |
| **JavaScript / TypeScript** | Fullstack web portals, Next.js SSR, REST consumers | Proficient | Node.js, Express, React, TypeScript |
| **Python** | Backend prototyping, REST APIs, ML/PyTorch exploration | Proficient | Django REST Framework, Flask, PyTorch |
| **Dart** | Mobile cross-platform applications | Proficient | Flutter, Dio, State Management (Provider/Bloc) |

---

## 🧱 Frameworks & Runtimes

### Backend & Enterprise
- <span class="tech-tag primary">Spring Boot</span> Multi-tier REST services, dependency injection, Spring Security, Spring Data JPA.
- <span class="tech-tag primary">Struts 2</span> MVC architectural patterns, Action classes, interceptors, and monolithic banking application maintenance.
- <span class="tech-tag">Django REST</span> Rapid backend API development, token authentication, and relational ORM modeling.
- <span class="tech-tag">Express.js</span> Lightweight Node.js microservices and webhook ingestion endpoints.

### Frontend & Fullstack
- <span class="tech-tag">Next.js</span> App Router, Server-Side Rendering (SSR), API routes, and React components.
- <span class="tech-tag">Flutter</span> Cross-platform iOS/Android development, custom widget trees, and REST client integration.
- <span class="tech-tag">Tailwind CSS</span> Responsive, utility-first layout architecture.

### Machine Learning & Data
- <span class="tech-tag">PyTorch</span> Neural network architectures, computer vision and foundational deep learning modeling.

---

## 🏢 Enterprise Integration & Middleware

| Technology | Role in Production |
| :--- | :--- |
| **IBM WebMethods** | Enterprise Service Bus (ESB) architecture, flow services, B2B integration, protocol transformation (SOAP/REST/XML/JSON), and enterprise trading partner coordination. |
| **IBM Business Automation Workflow (BAW)** | End-to-end business process automation (BPMN), human service coach views, decision routing, automated scheduling, and system-to-system activity orchestration. |

---

## 💾 Database Systems

### Relational Databases (RDBMS)
- **MariaDB & MySQL**: Enterprise banking backend persistence, transactional integrity (ACID), schema migration, and relational foreign-key integrity.
- **PostgreSQL**: Advanced relational schemas, JSONB attributes, and high-concurrency workloads.

### Document & Realtime Databases
- **MongoDB**: Flexible JSON document storage, aggregation pipelines.
- **Firebase Firestore**: Realtime collections, security rules, and serverless authentication state.
- **Supabase**: Managed PostgreSQL instances, row-level security (RLS), and database webhooks.

---

## 🛠️ Infrastructure & Tooling

```
Development & Persistence Tooling:
├── IDEs & Editors       ── IntelliJ IDEA Ultimate, Visual Studio Code
├── Application Servers  ── Apache Tomcat 9/10, Red Hat JBoss EAP
├── Database Clients     ── DBeaver Universal Database Tool, pgAdmin
├── Version Control      ── Git, GitHub, GitLab
└── Build & Dependency   ── Maven, Gradle, npm, Vite, VitePress
```

- **Application Servers**: Configuring and deploying WAR/EAR artifacts on **Apache Tomcat** and **JBoss**.
- **Database Administration**: Query analysis, execution planning, and schema migrations with **DBeaver**.
- **Version Control**: Git branching strategies (GitFlow, feature branches), peer reviews, and merge conflict resolution.
