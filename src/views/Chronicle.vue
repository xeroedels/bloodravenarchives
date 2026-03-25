<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TimelineView from '@/components/TimelineView.vue'
import CalendarView from '@/components/CalendarView.vue'

const viewMode = ref('timeline')
const showCalendar = ref(false)

const router = useRouter()

function goHome() {
  router.push('/hub')
}

const selectedDate = ref(null)
</script>

<template>
  <div class="page-bg">
    <button v-if="!showCalendar" class="calendar-btn" @click="showCalendar = true">
      📅 Select Date
    </button>
    <button class="back-home" @click="goHome">←Back</button>
    <Transition name="fade" appear>
      <div class="chronicle-layout">
        <div class="left-panel">
          <TimelineView
            :selectedDate="selectedDate"
            @toggleCalendar="showCalendar = !showCalendar"
          />
        </div>

        <Transition name="slide">
          <div v-if="showCalendar" class="right-panel">
            <CalendarView v-model="selectedDate" @closeCalendar="showCalendar = false" />
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.chronicle-layout {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 40px;
  padding: 40px;
}

.left-panel {
  flex: 1;
  min-width: 0;
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
}

.page-bg {
  position: relative;
  min-height: 100vh;
  /* background: url('/G30eUk5WoAAAVti.png'); */
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
</style>
