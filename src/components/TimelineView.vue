<script setup>
import { interactions } from '../data/interactions'
import { ref, computed, onMounted, nextTick, watch } from 'vue'

const props = defineProps({
  selectedDate: String,
})

const emit = defineEmits(['toggleCalendar'])

const openYears = ref({})

async function toggleYear(year) {
  openYears.value[year] = !openYears.value[year]

  await nextTick()

  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load()
  }
}
const filteredInteractions = computed(() => {
  const filtered = props.selectedDate
    ? interactions.filter((i) => {
        if (i.date) {
          return i.date === props.selectedDate
        }

        if (i.dateStart && i.dateEnd) {
          return props.selectedDate >= i.dateStart && props.selectedDate <= i.dateEnd
        }

        return false
      })
    : interactions

  return filtered.filter((i) => i.tweets && i.tweets.length > 0)
})

watch(filteredInteractions, async () => {
  await nextTick()

  if (window.twttr && window.twttr.widgets) {
    window.twttr.widgets.load()
  }
})

const groupedByYear = computed(() => {
  const map = {}

  filteredInteractions.value.forEach((item) => {
    const baseDate = item.date || item.dateStart
    const year = new Date(baseDate).getFullYear()

    if (!map[year]) map[year] = []
    map[year].push(item)
  })

  return map
})
onMounted(async () => {
  await nextTick()
  if (window.twttr) {
    window.twttr.widgets.load()
  }
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.tweet-item').forEach((el) => {
    observer.observe(el)
  })
})

function formatDate(group) {
  if (group.dateStart && group.dateEnd) {
    const [y1, m1, d1] = group.dateStart.split('-')
    const [y2, m2, d2] = group.dateEnd.split('-')

    return `${d1}/${m1}/${y1} → ${d2}/${m2}/${y2}`
  }

  const [y, m, d] = group.date.split('-')
  return `${d}/${m}/${y}`
}
</script>

<template>
  <div>
    <div v-if="filteredInteractions.length" class="timeline" id="timeline-section">
      <div v-for="(yearGroups, year) in groupedByYear" :key="year" class="year-section">
        <div class="year-separator" @click="toggleYear(year)">
          <span
            class="arrow"
            :style="{ transform: openYears[year] === false ? 'rotate(0deg)' : 'rotate(90deg)' }"
          >
            ▶
          </span>
          {{ year }}
        </div>
        <Transition name="year-expand">
          <div v-if="openYears[year] !== false">
            <div v-for="group in yearGroups" :key="group.id" class="date-section">
              <div class="date-header">
                <span class="timeline-node"></span>
                {{ formatDate(group) }}
              </div>

              <div class="tweets-grid">
                <blockquote
                  v-for="(tweet, index) in group.tweets"
                  :key="index"
                  class="twitter-tweet tweet-item"
                  data-theme="dark"
                  data-width="100%"
                  :style="{ animationDelay: `${index * 120}ms` }"
                >
                  <a :href="tweet"></a>
                </blockquote>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div v-else class="no-results">
      <div class="rune-circle"></div>

      <div class="rune-text"><span class="fire"></span>ARCHIVE EMPTY</div>

      <div class="raven-particles">
        <svg v-for="n in 10" :key="n" class="feather" viewbox="0 0 24 24">
          <path d="M22 2C14 3 6 10 4 18c-1 4 2 4 4 2C16 12 23 4 22 2z" fill="currentColor" />
        </svg>
      </div>
      <div class="archive-content">
        <p class="archive-message">
          <span class="ghost-fire"></span>The archive holds no Bloodraven records for this day.
        </p>

        <button class="back-btn" @click="$emit('toggleCalendar')">Choose another date</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrow {
  display: inline-block;
  margin-right: 10px;
  transition: transform 0.25s ease;
}

.arrow.open {
  transform: rotate(90deg);
}

.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 60px;
  margin-top: 80px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 22px;
  top: 0;
  bottom: 0;

  width: 2px;
  background: linear-gradient(to bottom, rgba(255, 0, 51, 0.6), rgba(255, 0, 51, 0.2));
}

.year-section {
  margin-bottom: 40px;
}

.year-separator {
  font-size: 32px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  padding-left: 20px;
  color: white;
  cursor: pointer;
}
.year-separator::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 40px;
  background: crimson;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.year-separator:hover::before {
  box-shadow:
    0 0 15px crimson,
    0 0 30px crimson;
  transform: translateY(-50%) scaleY(1.2);
  text-shadow: 0 0 10px crimson;
}

.date-header {
  position: relative;

  gap: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;
  font-weight: 600;
  color: #e5e7eb;

  margin: 30px 0;

  letter-spacing: 0.5px;
}

.date-header::before,
.date-header::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  position: relative;
  top: 3px;
}

.date-header::before {
  margin-right: 16px;
}

.date-header::after {
  margin-left: 16px;
}

.date-header .timeline-node {
  position: absolute;

  left: -42px;
  top: 50%;
  transform: translateY(-40%);

  width: 12px;
  height: 12px;

  background: crimson;
  border-radius: 50%;

  box-shadow:
    0 0 10px crimson,
    0 0 20px crimson,
    0 0 24px rgba(255, 0, 51, 0.5);

  animation: pulseNode 2s infinite;
}

@keyframes pulseNode {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

.tweets-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.tweet-item {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease;
}

.tweet-item.show {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1100px) {
  .tweets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .tweets-grid {
    grid-template-columns: 1fr;
  }
}

.no-results {
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  text-align: center;
  color: #e5e7eb;
  font-size: 22px;
  overflow: visible;
  width: 100%;
}

.back-btn {
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  background: crimson;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.25s ease;
  margin-top: 10px;
}

.back-btn:hover {
  background: #ff1744;
  transform: translateY(-2px);
  box-shadow: 0 0 12px crimson;
}

.archive-message {
  font-size: 24px;
  letter-spacing: 0.5px;
  margin-top: 260px;

  text-shadow:
    0 0 8px rgba(0, 180, 255, 0.6),
    0 0 18px rgba(0, 140, 255, 0.4);
}
.raven-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.feather {
  position: absolute;
  width: 22px;
  height: 22px;
  color: #38bdf8;
  opacity: 0.8;

  filter: drop-shadow(0 0 6px #38bdf8);

  animation: featherFall 10s linear infinite;
}

.feather:nth-child(1) {
  left: 5%;
  animation-delay: 0s;
}
.feather:nth-child(2) {
  left: 15%;
  animation-delay: 2s;
}
.feather:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.feather:nth-child(4) {
  left: 35%;
  animation-delay: 1s;
}
.feather:nth-child(5) {
  left: 50%;
  animation-delay: 3s;
}
.feather:nth-child(6) {
  left: 65%;
  animation-delay: 5s;
}
.feather:nth-child(7) {
  left: 75%;
  animation-delay: 2.5s;
}
.feather:nth-child(8) {
  left: 85%;
  animation-delay: 4.5s;
}
.feather:nth-child(9) {
  left: 45%;
  animation-delay: 1.5s;
}
.feather:nth-child(10) {
  left: 60%;
  animation-delay: 3.5s;
}

@keyframes floatFeather {
  0% {
    transform: translateY(-40px) rotate(0deg);
    opacity: 0;
  }

  20% {
    opacity: 0.8;
  }

  50% {
    transform: translateY(40vh) rotate(120deg);
  }

  100% {
    transform: translateY(80vh) rotate(240deg);
    opacity: 0;
  }
}

.ghost-fire {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 220px;
  height: 120px;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.8) 0%,
    rgba(14, 165, 233, 0.4) 40%,
    transparent 70%
  );
  filter: blur(20px);
  animation: ghostFire 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes featherFall {
  0% {
    transform: translateY(-60px) rotate(0deg);
    opacity: 0;
  }

  15% {
    opacity: 1;
  }

  50% {
    transform: translateY(40vh) rotate(120deg);
  }

  100% {
    transform: translateY(80vh) rotate(260deg);
    opacity: 0;
  }
}

.rune-circle {
  position: absolute;

  left: 50%;
  top: 40%;

  transform: translate(-50%, -50%);

  width: 480px;
  height: 480px;

  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.5);

  box-shadow:
    0 0 20px #38bdf8,
    inset 0 0 20px rgba(56, 189, 248, 0.5);

  animation: runeRotate 20s linear infinite;
}

.rune-text {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  font-size: 22px;
  letter-spacing: 4px;
  color: #7dd3fc;

  white-space: nowrap;
  z-index: 3;
  text-shadow:
    0 0 8px #38bdf8,
    0 0 18px #0ea5e9;
}

@keyframes runeRotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.archive-content {
  margin-top: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.fire {
  position: absolute;
  left: 50%;
  top: 50%;

  width: 200px;
  height: 120px;

  transform: translate(-50%, -50%);
  pointer-events: none;

  background:
    radial-gradient(circle at 50% 60%, rgba(56, 189, 248, 0.9), transparent 60%),
    radial-gradient(circle at 40% 40%, rgba(14, 165, 233, 0.6), transparent 70%),
    radial-gradient(circle at 60% 40%, rgba(56, 189, 248, 0.5), transparent 70%);

  filter: blur(18px);

  animation: ghostFlame 2.5s ease-in-out infinite;
}

@keyframes ghostFlame {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }

  50% {
    transform: translate(-50%, -55%) scale(1.2);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
}

.year-expand-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.year-expand-enter-active {
  transition: all 0.35s ease;
}

.year-expand-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.year-expand-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.year-expand-leave-active {
  transition: all 0.25s ease;
}

.year-expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 700px) {
  .timeline {
    padding-left: 40px;
    gap: 16px;
  }

  .timeline::before {
    left: 16px;
  }

  .date-header {
    font-size: 18px;
  }

  .date-header .timeline-node {
    left: -28px;
    width: 10px;
    height: 10px;
  }

  .year-separator {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .year-separator::before {
    height: 28px;
  }

  .tweets-grid {
    gap: 18px;
  }
}

@media (max-width: 700px) {
  .rune-circle {
    width: 260px;
    height: 260px;
  }

  .rune-text {
    font-size: 16px;
    letter-spacing: 2px;
  }

  .archive-message {
    font-size: 18px;
    margin-top: 160px;
  }

  .archive-content {
    margin-top: 160px;
  }

  .back-btn {
    font-size: 14px;
    padding: 10px 22px;
  }
}
</style>
