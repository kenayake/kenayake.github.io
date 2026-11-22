<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #home-features-before>
      <div v-if="frontmatter.layout === 'home'" class="home-features-header">
        <div class="container">
          <h2 class="home-features-title">
            Or browse these pages ✨
          </h2>
        </div>
      </div>
    </template>
  </Layout>
</template>
