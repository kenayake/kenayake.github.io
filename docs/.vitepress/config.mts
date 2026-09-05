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
      { text: 'Tech Stack', link: '/skills/' },
      { text: 'Experience', link: '/experience/' },
      {
        text: 'Projects',
        items: [
          { text: 'All Projects', link: '/projects/' },
          { text: 'RubyPay (1st Place Hackathon)', link: '/projects/rubypay' },
          { text: 'Positopia.Lab (Studio Booking)', link: '/projects/positopia' },
          { text: 'Largo id (E-Bikes Portal)', link: '/projects/largo' },
          { text: 'Bawang Cosplay (Marketplace)', link: '/projects/bawang-cosplay' }
        ]
      },
      { text: 'Contact & CV', link: '/contact/' }
    ],

    sidebar: {
      '/about/': [
        {
          text: 'Profile & Architecture',
          items: [
            { text: 'Biography & Background', link: '/about/' },
            { text: 'Engineering Philosophy', link: '/about/#engineering-philosophy' },
            { text: 'Education & Honors', link: '/about/#education' }
          ]
        },
        {
          text: 'Quick Links',
          items: [
            { text: 'Technical Stack', link: '/skills/' },
            { text: 'Career Timeline', link: '/experience/' },
            { text: 'Featured Projects', link: '/projects/' }
          ]
        }
      ],
      '/skills/': [
        {
          text: 'Technical Specifications',
          items: [
            { text: 'Stack Overview', link: '/skills/' },
            { text: 'Languages', link: '/skills/#programming-languages' },
            { text: 'Frameworks & Runtimes', link: '/skills/#frameworks-runtimes' },
            { text: 'Enterprise & Middleware', link: '/skills/#enterprise-integration-middleware' },
            { text: 'Database Engines', link: '/skills/#database-systems' },
            { text: 'DevOps & Tooling', link: '/skills/#infrastructure-tooling' }
          ]
        }
      ],
      '/experience/': [
        {
          text: 'Career & Industry Experience',
          items: [
            { text: 'Experience Overview', link: '/experience/' },
            { text: 'PT Nusantara Duta Solusindo', link: '/experience/#pt-nusantara-duta-solusindo-junior-java-developer' },
            { text: 'Java Developer Internship', link: '/experience/#pt-nusantara-duta-solusindo-java-developer-intern' },
            { text: 'Academic Lab Assistant', link: '/experience/#universitas-prasetiya-mulya-lab-assistant' },
            { text: 'IBM BAW Professional Training', link: '/experience/#professional-training-ibm-baw' },
            { text: 'Volunteer & Mentorship', link: '/experience/#volunteer-experience' }
          ]
        }
      ],
      '/projects/': [
        {
          text: 'Production Case Studies',
          items: [
            { text: 'Index & Highlights', link: '/projects/' },
            { text: 'RubyPay (Fintech E-Wallet)', link: '/projects/rubypay' },
            { text: 'Positopia.Lab (Booking System)', link: '/projects/positopia' },
            { text: 'Largo id (CMS & E-Bikes)', link: '/projects/largo' },
            { text: 'Bawang Cosplay (Rental Market)', link: '/projects/bawang-cosplay' }
          ]
        }
      ],
      '/contact/': [
        {
          text: 'Connect & Download',
          items: [
            { text: 'Contact Channels', link: '/contact/' },
            { text: 'Curriculum Vitae (PDF)', link: '/contact/#curriculum-vitae' },
            { text: 'Social & Code Repositories', link: '/contact/#social-links' }
          ]
        }
      ]
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
