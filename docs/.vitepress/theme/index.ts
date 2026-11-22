import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ProjectCarousel from './components/ProjectCarousel.vue'
import Layout from './Layout.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ProjectCarousel', ProjectCarousel)
  }
} satisfies Theme
