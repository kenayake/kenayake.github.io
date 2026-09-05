import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Kenneth Evan",
  titleTemplate: ":title | Kenneth Evan - Backend & Systems Engineer",
  description: "Enterprise backend developer, system integration specialist, and software engineer portfolio in framework documentation style.",
  cleanUrls: true,
  lastUpdated: false,
  
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#10b981' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Kenneth Evan | Backend & Systems Engineer' }],
    ['meta', { property: 'og:description', content: 'Portfolio and technical documentation for enterprise Java, Spring Boot, system integrations, and backend architectures.' }]
  ],

  themeConfig: {
    siteTitle: 'Kenneth Evan <span class="badge-role">Backend / Systems</span>',
    
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'About & Bio', link: '/about/' },
      { text: 'Technical Skills', link: '/skills/' },
      { text: 'Experience', link: '/experience/' },
      {
        text: 'Projects',
        items: [
          { text: 'All Projects', link: '/projects/' },
          { text: 'RubyPay (1st Place Hackathon)', link: '/projects/rubypay' },
          { text: 'Positopia.Lab', link: '/projects/positopia' },
          { text: 'Largo id', link: '/projects/largo' },
          { text: 'Bawang Cosplay', link: '/projects/bawang-cosplay' }
        ]
      },
      { text: 'Contact & CV', link: '/contact/' }
    ],

    sidebar: [
      {
        text: 'Developer Documentation',
        items: [
          { text: 'About & Bio', link: '/about/' },
          { text: 'Technical Skills', link: '/skills/' },
          { text: 'Experience & Training', link: '/experience/' },
          { text: 'Contact & Resume', link: '/contact/' }
        ]
      },
      {
        text: 'Projects & Case Studies',
        items: [
          { text: 'All Projects Overview', link: '/projects/' },
          { text: 'RubyPay (Fintech E-Wallet)', link: '/projects/rubypay' },
          { text: 'Positopia.Lab (Studio Booking)', link: '/projects/positopia' },
          { text: 'Largo id (CMS & E-Bikes)', link: '/projects/largo' },
          { text: 'Bawang Cosplay (Marketplace)', link: '/projects/bawang-cosplay' }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'On this page'
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kenayake' },
      { icon: 'linkedin', link: 'https://linkedin.com/in/kenayake' }
    ],

    footer: {
      message: 'Built with VitePress • Documentation Architecture for Backend Engineering',
      copyright: 'Copyright © 2026 Kenneth Evan Ekanayake'
    }
  }
})
