<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import TimelineView from '@/components/TimelineView.vue'
import CalendarView from '@/components/CalendarView.vue'

const showCalendar = ref(false)
const selectedDate = ref(null)

const router = useRouter()

const showTutorial = ref(false)
const tutorialStep = ref(0)

const spotlightTarget = ref(null)
const spotlightStyle = ref({})
const tutorialSteps = [
  {
    title: 'Welcome!',
    text: 'This is an interactive timelines of events between Elizabeth Rose Bloodflame and Nerissa Ravencroft',
  },
  {
    title: 'Timeline',
    text: 'Here you can scroll through all archived tweets.',
  },
  {
    title: 'Search',
    text: 'Use the search bar to find a specific dates, months or year',
  },
  {
    title: 'Calendar',
    text: 'Use the calendar to jump to a specific date.',
  },
]
function goHome() {
  router.push('/hub')
}

async function updateSpotlightTarget() {
  await nextTick()

  if (tutorialStep.value === 2) {
    spotlightTarget.value = document.querySelector('.archive-search')
  } else if (tutorialStep.value === 3) {
    spotlightTarget.value = document.querySelector('.calendar-btn')
  } else {
    spotlightTarget.value = null
  }

  if (spotlightTarget.value) {
    spotlightTarget.value.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
}

function updateSpotlightPosition() {
  if (!spotlightTarget.value) {
    spotlightStyle.value = {
      display: 'none',
    }
    return
  }

  const rect = spotlightTarget.value.getBoundingClientRect()

  spotlightStyle.value = {
    display: 'block',
    top: `${rect.top + window.scrollY - 8}px`,
    left: `${rect.left + window.scrollX - 8}px`,
    width: `${rect.width + 16}px`,
    height: `${rect.height + 16}px`,
  }
}
watch(tutorialStep, async () => {
  await updateSpotlightTarget()
  updateSpotlightPosition()
})

function nextStep() {
  if (tutorialStep.value < tutorialSteps.length - 1) {
    tutorialStep.value++
  } else {
    showTutorial.value = false
    localStorage.setItem('seenTutorial', 'true')
  }
}

function skipTutorial() {
  showTutorial.value = false
  localStorage.setItem('seenTutorial', 'true')
}

onMounted(() => {
  const seen = localStorage.getItem('seenTutorial')
  if (!seen) {
    showTutorial.value = true
  }
})

function restartTutorial() {
  console.log('restart clicked')
  tutorialStep.value = 0
  showTutorial.value = true
  console.log('showTutorial now:', showTutorial.value)
  updateSpotlightTarget()
  updateSpotlightPosition()
}
</script>

<template>
  <div class="page-bg">
    <button class="back-home" @click="goHome">←Back</button>
    <button class="replay-tutorial" @click="restartTutorial">❓ Tutorial</button>

    <button v-if="!showCalendar" class="calendar-btn" @click="showCalendar = true">
      📅 Select Date
    </button>

    <div class="chronicle-layout">
      <div class="left-panel">
        <TimelineView :selectedDate="selectedDate" @toggleCalendar="showCalendar = !showCalendar" />
      </div>

      <Transition name="slide">
        <div v-if="showCalendar" class="right-panel">
          <CalendarView v-model="selectedDate" @closeCalendar="showCalendar = false" />
        </div>
      </Transition>
    </div>
    <!-- pop up for tutorial-->
    <div v-if="showTutorial" :class="['tutorial-overlay', { hidden: !showTutorial }]">
      <div class="spotlight-hole" :style="spotlightStyle"></div>
      <div class="tutorial-box">
        <div class="tutorial-accent"></div>
        <div class="tutorial-progress">
          Step {{ tutorialStep + 1 }} / {{ tutorialSteps.length }}
        </div>
        <div class="tutorial-content" :key="tutorialStep">
          <h3>{{ tutorialSteps[tutorialStep].title }}</h3>
          <p>{{ tutorialSteps[tutorialStep].text }}</p>
        </div>

        <div class="tutorial-actions">
          <button @click="nextStep">
            {{ tutorialStep === tutorialSteps.length - 1 ? 'Finish' : 'Next' }}
          </button>

          <button @click="skipTutorial">Skip</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chronicle-layout {
  display: flex;
  gap: 40px;
  padding: 40px;
}

.left-panel {
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
}

.right-panel {
  width: 420px;
  flex-shrink: 0;
  position: sticky;
  top: 40px;
  height: fit-content;
  background: #111;
  padding: 20px;
  border-radius: 12px;
  z-index: 5;
}

.page-bg {
  position: relative;
  min-height: 100vh;
  /* background: url('/.png'); */
}

.page-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 0;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active {
  transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.slide-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.slide-enter-active {
  transition: all 0.3s ease;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.back-home {
  position: fixed;
  top: 26px;
  left: 26px;

  z-index: 2000;
  padding: 12px 22px;

  font-size: 16px;
  font-weight: 600;

  background: linear-gradient(135deg, #141418, #1f1f27);

  border-radius: 10px;

  border: 1px solid rgba(80, 120, 255, 0.25);

  color: white;

  cursor: pointer;

  transition: all 0.25s ease;

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(80, 120, 255, 0.2);
}

.back-home:hover {
  transform: translateY(-2px);

  border-color: #5f8cff;

  box-shadow:
    0 0 15px rgba(80, 140, 255, 0.6),
    0 0 30px rgba(80, 140, 255, 0.3);
}

.calendar-btn {
  position: fixed;
  top: 26px;
  right: 26px;
  z-index: 2000;
  padding: 12px 22px;

  font-size: 16px;
  font-weight: 600;

  border-radius: 10px;

  background: linear-gradient(135deg, #0f172a, #1e293b);

  border: 1px solid rgba(80, 120, 255, 0.3);

  color: white;

  cursor: pointer;

  transition: all 0.25s ease;

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(80, 120, 255, 0.2);
}

.calendar-btn:hover {
  transform: translateY(-2px);

  border-color: #38bdf8;

  box-shadow:
    0 0 14px rgba(56, 189, 248, 0.7),
    0 0 25px rgba(56, 189, 248, 0.4);
}

@media (max-width: 1000px) {
  .chronicle-layout {
    flex-direction: column;
    gap: 30px;
  }

  .right-panel {
    width: 100%;
    position: relative;
    top: 0;
  }
}

@media (max-width: 900px) {
  .chronicle-layout {
    flex-direction: column;
    gap: 25px;
  }

  .right-panel {
    width: 100%;
    position: relative;
    top: 0;
  }
}

@media (max-width: 900px) {
  .right-panel {
    order: -1;
  }
}

@media (max-width: 600px) {
  .back-home {
    left: 12px;
    top: 12px;
    padding: 10px 14px;
    font-size: 14px;
  }

  .calendar-btn {
    right: 12px;
    top: 12px;
    padding: 10px 14px;
    font-size: 14px;
  }
}
.tutorial-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.4s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.tutorial-overlay.hidden {
  pointer-events: none;
}

.tutorial-overlay::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;

  background: radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%);

  filter: blur(60px);

  animation: pulseGlow 4s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
.tutorial-box {
  background: linear-gradient(135deg, #0f172a, #1e293b);

  border-radius: 18px;
  padding: 28px 26px;

  width: 340px;

  color: #e5e7eb;
  text-align: center;

  border: 1px solid rgba(80, 120, 255, 0.2);

  box-shadow:
    0 0 25px rgba(56, 189, 248, 0.25),
    0 10px 40px rgba(0, 0, 0, 0.8);

  backdrop-filter: blur(10px);

  transition: all 0.3s ease;

  animation: tutorialPop 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.tutorial-box h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;

  color: white;

  text-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
}

.tutorial-box p {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #cbd5f5;
}

.tutorial-box:hover {
  box-shadow:
    0 0 35px rgba(56, 189, 248, 0.35),
    0 15px 50px rgba(0, 0, 0, 0.9);
}

.tutorial-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
}
.tutorial-actions button {
  padding: 8px 14px;

  border-radius: 8px;
  border: 1px solid rgba(80, 120, 255, 0.3);

  background: #111827;
  color: white;

  cursor: pointer;

  transition: all 0.2s ease;
}

.tutorial-actions button:hover {
  border-color: #38bdf8;

  box-shadow:
    0 0 10px rgba(56, 189, 248, 0.7),
    0 0 20px rgba(56, 189, 248, 0.3);

  transform: translateY(-1px);
}

.tutorial-progress {
  font-size: 12px;
  color: rgba(148, 163, 184, 0.7);
  margin-bottom: 8px;
}

@keyframes tutorialPop {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.tutorial-accent {
  height: 3px;
  width: 100%;

  background: linear-gradient(90deg, #38bdf8, #6366f1, #ec4899);
  background-size: 200% 100%;
  animation: gradientFlow 3s linear infinite;
  border-radius: 999px;

  margin-bottom: 16px;

  box-shadow: 0 0 12px rgba(99, 102, 241, 0.7);
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}

.tutorial-actions button:first-child {
  background: linear-gradient(135deg, #2563eb, #38bdf8);
  border: none;

  box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
}

.tutorial-actions button:first-child:hover {
  transform: translateY(-1px) scale(1.03);
}

.tutorial-actions button:last-child {
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.3);
  color: #94a3b8;
}

.tutorial-actions button:last-child:hover {
  border-color: #cbd5f5;
  color: white;
}
.replay-tutorial {
  position: fixed;
  top: 26px;
  left: 140px;

  z-index: 2000;

  padding: 10px 16px;
  font-size: 14px;

  background: #1e293b;
  border: 1px solid rgba(80, 120, 255, 0.3);
  border-radius: 8px;

  color: white;
  cursor: pointer;

  transition: 0.2s;
}

.replay-tutorial:hover {
  border-color: #38bdf8;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
}

.spotlight-hole {
  position: absolute;
  border-radius: 12px;
  pointer-events: none;

  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  top: 100px;
  left: 100px;

  width: 300px;
  height: 80px;

  border-radius: 12px;

  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75);

  border: 2px solid red;

  pointer-events: none;
}
</style>
