---
layout: home

hero:
  name: "Kenneth Evan"
  text: "Software Engineer & Backend Developer"
  tagline: "Specializing in enterprise banking backends, Java/Spring architectures, and IBM middleware integrations."
  actions:
    - theme: brand
      text: Explore Case Studies
      link: /projects/
    - theme: alt
      text: Technical Stack
      link: /skills/
    - theme: alt
      text: Career Timeline
      link: /experience/

features:
  - icon: ☕
    title: Enterprise Java & Spring
    details: Production banking backends with Java, Spring Boot, Struts 2, Tomcat, and MariaDB. Tested across SIT, UAT, and production environments.
    link: /skills/
    linkText: View Technical Stack
  - icon: 🔄
    title: System Integration & Middleware
    details: Hands-on enterprise integration with IBM WebMethods and IBM Business Automation Workflow (BAW), REST/SOAP APIs, and payment webhooks.
    link: /experience/
    linkText: View Enterprise Experience
  - icon: 🏆
    title: Award-Winning Production Systems
    details: 1st Place AyoConnect Hackathon winner (RubyPay e-wallet), photography studio reservation systems, and headless eCommerce platforms.
    link: /projects/
    linkText: Browse Projects
  - icon: 🎓
    title: Architecture & Academic Foundations
    details: S1 Software Engineering graduate from Universitas Prasetiya Mulya with rigorous foundations in data structures, algorithms, and distributed systems.
    link: /about/
    linkText: Read Biography
  - icon: 📄
    title: Technical Specifications & CV
    details: Complete downloadable curriculum vitae, contact channels, and technical references for hiring teams and collaborators.
    link: /contact/
    linkText: Get in Touch & Download CV
---

<div class="hero-code-block">
  <div class="hero-code-header">
    <div class="hero-code-dots">
      <span class="hero-code-dot red"></span>
      <span class="hero-code-dot yellow"></span>
      <span class="hero-code-dot green"></span>
    </div>
    <span>DeveloperProfile.java</span>
  </div>

```java
package com.kenayake.portfolio;

import org.springframework.stereotype.Component;

/**
 * Technical Profile for Kenneth Evan Ekanayake
 * Role: Junior Java Developer & Backend Engineer
 */
@Component
public class DeveloperProfile {

    private final String name = "Kenneth Evan Ekanayake";
    private final String primaryFocus = "Enterprise Backend Architecture & System Integration";
    private final String[] coreStack = {
        "Java", "Spring Boot", "IBM WebMethods", "MariaDB", "REST/SOAP APIs"
    };

    public EngineeringPhilosophy getPhilosophy() {
        return new EngineeringPhilosophy(
            "Reliability first",
            "Clean domain-driven separation of concerns",
            "Resilient API integrations with proper failovers and observability"
        );
    }
}
```

</div>

<div class="vp-doc" style="margin-top: 3rem;">

## 📌 Architecture Quick Reference

| Dimension | Specification | Reference Page |
| :--- | :--- | :--- |
| **Primary Backend Stack** | Java 17+, Spring Boot, Struts 2, Hibernate, MariaDB, PostgreSQL | [Technical Stack](/skills/) |
| **Enterprise Middleware** | IBM WebMethods, IBM Business Automation Workflow (BAW) | [Experience](/experience/) |
| **Fullstack & Mobile** | Next.js, Flutter, Django REST, Firebase Firestore, Supabase | [Case Studies](/projects/) |
| **Industry Background** | Financial Services & Banking Solutions at PT Nusantara Duta Solusindo | [Profile](/about/) |
| **Curriculum Vitae** | Downloadable PDF (Updated for 2026) | [Contact & CV](/contact/) |

</div>
