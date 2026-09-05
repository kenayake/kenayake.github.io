<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

export interface Slide {
  src: string
  alt?: string
  caption?: string
}

const props = defineProps<{
  slides: Slide[]
  title?: string
}>()

const currentIndex = ref(0)
const isLightboxOpen = ref(false)
const lightboxIndex = ref(0)
const zoomScale = ref(1)

const nextSlide = () => {
  if (!props.slides.length) return
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prevSlide = () => {
  if (!props.slides.length) return
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

const goToSlide = (idx: number) => {
  currentIndex.value = idx
}

const openLightbox = (idx: number) => {
  lightboxIndex.value = idx
  zoomScale.value = 1
  isLightboxOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  zoomScale.value = 1
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

const nextLightbox = () => {
  if (!props.slides.length) return
  zoomScale.value = 1
  lightboxIndex.value = (lightboxIndex.value + 1) % props.slides.length
}

const prevLightbox = () => {
  if (!props.slides.length) return
  zoomScale.value = 1
  lightboxIndex.value = (lightboxIndex.value - 1 + props.slides.length) % props.slides.length
}

const zoomIn = () => {
  zoomScale.value = Math.min(3, +(zoomScale.value + 0.3).toFixed(2))
}

const zoomOut = () => {
  zoomScale.value = Math.max(0.7, +(zoomScale.value - 0.3).toFixed(2))
}

const resetZoom = () => {
  zoomScale.value = 1
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!isLightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextLightbox()
  else if (e.key === 'ArrowLeft') prevLightbox()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div v-if="slides && slides.length > 0" class="carousel-card">
    <div class="carousel-header" v-if="title">
      <div class="terminal-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <span class="carousel-title">{{ title }}</span>
      <span class="slide-counter">{{ currentIndex + 1 }} / {{ slides.length }}</span>
    </div>

    <div class="carousel-viewport">
      <div class="carousel-stage">
        <img
          :src="slides[currentIndex].src"
          :alt="slides[currentIndex].alt || slides[currentIndex].caption || 'Project screenshot'"
          class="carousel-image"
          @click="openLightbox(currentIndex)"
          title="Click to view full size"
        />
        <div class="zoom-hint-badge" @click="openLightbox(currentIndex)">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          Inspect
        </div>
      </div>

      <button
        v-if="slides.length > 1"
        class="nav-arrow prev"
        @click.stop="prevSlide"
        aria-label="Previous image"
      >
        &#10094;
      </button>
      <button
        v-if="slides.length > 1"
        class="nav-arrow next"
        @click.stop="nextSlide"
        aria-label="Next image"
      >
        &#10095;
      </button>
    </div>

    <div class="carousel-footer">
      <div class="caption-text">
        <span class="caption-tag">Screen</span>
        {{ slides[currentIndex].caption || slides[currentIndex].alt || 'System Screenshot' }}
      </div>

      <div class="indicators" v-if="slides.length > 1">
        <button
          v-for="(_, idx) in slides"
          :key="idx"
          :class="['indicator-dot', { active: idx === currentIndex }]"
          @click="goToSlide(idx)"
          :aria-label="'Slide ' + (idx + 1)"
        ></button>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <div
        v-if="isLightboxOpen"
        class="lightbox-backdrop"
        @click.self="closeLightbox"
        role="dialog"
        aria-modal="true"
      >
        <div class="lightbox-toolbar">
          <span class="lightbox-title">{{ slides[lightboxIndex].caption || 'Screenshot Inspection' }}</span>
          <div class="toolbar-actions">
            <button class="tool-btn" @click="zoomOut" title="Zoom Out">−</button>
            <span class="zoom-text">{{ Math.round(zoomScale * 100) }}%</span>
            <button class="tool-btn" @click="zoomIn" title="Zoom In">+</button>
            <button class="tool-btn" @click="resetZoom" title="Reset Zoom">↺</button>
            <button class="tool-btn close" @click="closeLightbox" title="Close (Esc)">✕</button>
          </div>
        </div>

        <div class="lightbox-stage" @click.self="closeLightbox">
          <button
            v-if="slides.length > 1"
            class="lightbox-arrow prev"
            @click.stop="prevLightbox"
          >
            &#10094;
          </button>

          <img
            :src="slides[lightboxIndex].src"
            :alt="slides[lightboxIndex].alt || 'Screenshot Inspection'"
            class="lightbox-img"
            :style="{ transform: `scale(${zoomScale})` }"
          />

          <button
            v-if="slides.length > 1"
            class="lightbox-arrow next"
            @click.stop="nextLightbox"
          >
            &#10095;
          </button>
        </div>

        <div class="lightbox-bottom">
          <span>{{ lightboxIndex + 1 }} of {{ slides.length }} — Click outside or press Esc to close</span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.carousel-card {
  margin: 1.5rem 0 2rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: border-color 0.25s, box-shadow 0.25s;
}

.carousel-card:hover {
  border-color: var(--vp-c-brand-1);
}

.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1rem;
  background: var(--vp-c-bg-mute);
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 0.825rem;
  color: var(--vp-c-text-2);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.dot-red { background: #ff5f56; }
.dot-yellow { background: #ffbd2e; }
.dot-green { background: #27c93f; }

.carousel-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
}

.slide-counter {
  font-family: var(--vp-font-family-mono);
  opacity: 0.8;
}

.carousel-viewport {
  position: relative;
  background: #0d1117;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
  max-height: 480px;
  overflow: hidden;
}

.carousel-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
}

.carousel-image {
  max-width: 100%;
  max-height: 440px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
  cursor: zoom-in;
  transition: transform 0.2s ease;
}

.carousel-image:hover {
  transform: scale(1.01);
}

.zoom-hint-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(6px);
  color: #f8fafc;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: background 0.2s;
}

.zoom-hint-badge:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(4px);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 2;
}

.nav-arrow:hover {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-50%) scale(1.08);
}

.nav-arrow.prev { left: 12px; }
.nav-arrow.next { right: 12px; }

.carousel-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.caption-text {
  font-size: 0.875rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.caption-tag {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.indicators {
  display: flex;
  gap: 6px;
  align-items: center;
}

.indicator-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vp-c-divider);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.indicator-dot.active {
  background: var(--vp-c-brand-1);
  width: 22px;
  border-radius: 5px;
}

/* Lightbox Modal */
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(5, 7, 10, 0.92);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
}

.lightbox-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: rgba(15, 23, 42, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8fafc;
}

.lightbox-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tool-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}

.tool-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.tool-btn.close {
  background: #ef4444;
  border-color: #ef4444;
}

.tool-btn.close:hover {
  background: #dc2626;
}

.zoom-text {
  font-family: monospace;
  font-size: 0.85rem;
  min-width: 44px;
  text-align: center;
}

.lightbox-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
}

.lightbox-img {
  max-width: 90vw;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 10;
}

.lightbox-arrow:hover {
  background: var(--vp-c-brand-1);
}

.lightbox-arrow.prev { left: 24px; }
.lightbox-arrow.next { right: 24px; }

.lightbox-bottom {
  text-align: center;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #94a3b8;
  background: rgba(15, 23, 42, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
