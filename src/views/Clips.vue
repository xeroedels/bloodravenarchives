<script setup>
import { ref, onMounted, computed, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { saveProgress, loadProgress } from '@/utils/progress'
import clips from '@/data/clips'
const currentTime = ref({})
const activePOV = ref({})
const shouldAutoplay = ref({})
const router = useRouter()
const reloadKey = ref({})

const searchQuery = ref('')

const filteredClips = computed(() => {
  return clips.filter((clip) => {
    const query = searchQuery.value.toLowerCase()

    const matchesTitle = clip.title.toLowerCase().includes(query)

    const matchesPOV = clip.povs.some((pov) => pov.name.toLowerCase().includes(query))

    return matchesTitle || matchesPOV
  })
})
onMounted(() => {
  clips.forEach((clip) => {
    const saved = loadProgress(clip.id)

    if (saved) {
      currentTime.value[clip.id] = saved.time

      const povIndex = clip.povs.findIndex((p) => p.id === saved.videoId)
      if (povIndex !== -1) {
        activePOV.value[clip.id] = povIndex
      }
    }
  })
})
function handleTimestampClick(id, time, videoId) {
  currentTime.value = { ...currentTime.value, [id]: time }
  saveProgress(id, videoId, time)
}

function highlightText(text) {
  if (!searchQuery.value) return text

  const query = searchQuery.value.toLowerCase()

  const index = text.toLowerCase().indexOf(query)

  if (index === -1) return text

  const before = text.slice(0, index)

  const match = text.slice(index, index + query.length)

  const after = text.slice(index + query.length)

  return `${before} <span class ="highlight">${match}</span>${after}`
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    searchQuery.value = ''
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(searchQuery, () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})
</script>

<template>
  <div class="clips-page page-container">
    <button class="back-btn primary-button" @click="router.push('/hub')">← Back</button>

    <div class="header">
      <h1 class="section-title"><span class="clips-text">BloodRaven Clips</span></h1>
      <p class="section-subtitle">
        Watch the iconic moment from these two being oldge marriage couple (why are they like this
        /affectionate)
      </p>
    </div>
    <div class="search-bar">
      <div class="search-wrapper">
        <input v-model="searchQuery" placeholder="Search Clips..." class="search-input" />
        <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
      </div>
    </div>

    <div v-if="filteredClips.length > 0" class="video-grid">
      <div v-for="clip in filteredClips" :key="clip.id" class="video-card glass-panel hover-glow">
        <h3 v-html="highlightText(clip.title)"></h3>

        <div v-if="clip.povs.length > 1" class="pov-tabs">
          <button
            v-for="(pov, i) in clip.povs"
            :key="pov.name"
            :class="{ active: activePOV[clip.id] === i }"
            @click="activePOV[clip.id] = i"
          >
            {{ pov.name }}
          </button>
        </div>

        <iframe
          :key="activePOV[clip.id] || 0"
          :src="`https://www.youtube.com/embed/${clip.povs[activePOV[clip.id] || 0].id}?start=${currentTime[clip.id] || 0}&autoplay=1`"
          allowfullscreen
        ></iframe>
        <div class="timestamps">
          <span
            v-for="stamp in clip.povs[activePOV[clip.id] || 0].timestamps"
            :key="stamp.time"
            class="timestamp"
            @click="handleTimestampClick(clip.id, stamp.time)"
          >
            ▶ {{ stamp.display }}
          </span>
        </div>
      </div>
    </div>
    <div v-else class="no-results">
      <div class="no-results-box">
        <h2>No clips found</h2>
        <p>Try a different keyword</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.clips-text {
  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.clips-page,
.home-page,
.container {
  max-width: 100%;
  overflow-x: hidden;
}
.clips-page {
  min-height: 100vh;
  background: radial-gradient(circle at top, #0a0a0a, #000);
  color: white;
  padding: 60px;
}

@media (max-width: 1024px) {
  .clips-page {
    padding: 40px 30px;
  }
}

@media (max-width: 640px) {
  .clips-page {
    padding: 20px 15px;
  }
}

.back-btn {
  position: fixed;
  top: 26px;
  left: 26px;

  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 24px;

  font-size: 15px;
  font-weight: 600;

  border-radius: 12px;

  background: linear-gradient(135deg, #0f172a, #1e293b);
  border: 1px solid rgba(80, 120, 255, 0.35);

  color: #e6f1ff;

  cursor: pointer;

  transition: all 0.25s ease;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.6),
    0 0 10px rgba(80, 120, 255, 0.2);
}

.back-btn:hover {
  transform: translateY(-2px) scale(1.03);

  border-color: #38bdf8;

  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.7),
    0 0 24px rgba(56, 189, 248, 0.35);
}

.back-btn:active {
  transform: translateY(0) scale(0.96);
}

.back-btn:hover {
  transform: translateY(-2px) scale(1.03);

  border-color: #38bdf8;

  box-shadow:
    0 0 12px rgba(56, 189, 248, 0.7),
    0 0 24px rgba(56, 189, 248, 0.35);
}

.back-btn:active {
  transform: translateY(0) scale(0.96);
}

.back-btn:hover .arrow {
  transform: translateX(-4px);
}

.arrow {
  transition: transform 0.25s ease;
}

.header {
  text-align: center;
  margin-bottom: 50px;
}
.section-subtitle {
  margin: 0 auto 60px;
}
.header h1 {
  font-size: 52px;
}

@media (max-width: 1024px) {
  .header h1 {
    font-size: 40px;
  }
}

@media (max-width: 640px) {
  .header h1 {
    font-size: 28px;
  }
}

@media (max-width: 640px) {
  .back-btn {
    top: 15px;
    left: 15px;
    padding: 8px 14px;
    font-size: 13px;
  }
}
.header p {
  color: #cfcfcf;
  margin-top: 12px;
}

.video-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

  gap: 24px;

  margin-top: 50px;

  align-items: start;
}

.video-card {
  background: #111;
  border-radius: 14px;
  overflow: hidden;

  transition: all 0.25s ease;
  animation: fadeUp 0.8s ease both;
  display: flex;

  flex-direction: column;

  gap: 18px;

  height: 100%;
}

.video-card iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
}

.video-card h3 {
  padding: 16px;
  font-size: 18px;
  line-height: 1.4;

  margin-bottom: 8px;

  min-height: 70px;
}

.video-card:hover {
  transform: translateY(-6px);

  box-shadow: 0 0 20px rgba(42, 168, 255, 0.4);
}
@media (max-width: 640px) {
  .header h1 {
    font-size: 28px;
  }

  .video-card h3 {
    font-size: 16px;
  }

  .video-grid {
    gap: 20px;
  }
}

.timestamps {
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
}

.timestamp {
  font-size: 14px;
  padding: 6px 8px;
}

@media (max-width: 640px) {
  .timestamp {
    font-size: 13px;
    padding: 8px;
  }
}

.timestamp:hover {
  color: #7dd3fc;

  text-shadow:
    0 0 6px rgba(56, 189, 248, 0.6),
    0 0 12px rgba(56, 189, 248, 0.4);
}
.pov-tabs {
  display: flex;
  gap: 8px;
  padding: 0 16px 10px;
  flex-wrap: wrap;
}
.pov-tabs button {
  background: #1a1a1a;
  border: 1px solid #333;
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.pov-tabs button.active {
  border-color: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

.search-bar {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 60%;
  padding: 10px 15px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 10px #3b82f6;
}

.filter-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 10px;
  background: #111;
  color: white;
}

.no-results {
  text-align: center;
  margin-top: 80px;
  color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  text-align: center;
}

.no-results p {
  font-size: 22px;
  margin-bottom: 10px;
}

.no-results span {
  font-size: 14px;
  color: #666;
}
.no-results-box {
  padding: 30px 40px;
  border-radius: 16px;

  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.1);

  text-align: center;

  box-shadow:
    0 0 20px rgba(42, 168, 255, 0.2),
    0 0 40px rgba(255, 0, 51, 0.2);

  transition: all 0.3s ease;
  cursor: default;
}
.no-results-box h2 {
  font-size: 26px;
  margin-bottom: 10px;

  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 0.4s ease;
}

.no-results-box p {
  font-size: 14px;
  color: #aaa;
}
.no-results-box:hover {
  transform: translateY(-6px) scale(1.02);

  box-shadow:
    0 0 25px rgba(42, 168, 255, 0.4),
    0 0 60px rgba(255, 0, 51, 0.4);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight {
  color: #fff;

  background: linear-gradient(90deg, #ff2e2e, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 6px rgba(255, 0, 50, 0.6),
    0 0 10px rgba(59, 130, 246, 0.5);
}

.search-wrapper {
  position: relative;
  width: min(600px, 90%);

  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 16px 22px;

  border-radius: 999px;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(16px);

  color: white;

  font-size: 1rem;

  outline: none;

  transition: var(--transition-smooth);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);

  background: transparent;
  border: none;
  color: #aaa;

  font-size: 16px;
  cursor: pointer;

  transition: 0.2s;
}

.clear-btn:hover {
  color: white;
  transform: translateY(-50%) scale(1.2);
}
.search-input:focus {
  border-color: rgba(255, 255, 255, 0.16);

  box-shadow:
    0 0 20px rgba(255, 59, 107, 0.15),
    0 0 40px rgba(77, 163, 255, 0.08);
}
</style>
