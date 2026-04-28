<script setup>
import { ref, computed } from 'vue'
import { interactions } from '../data/interactions'

const currentDate = ref(new Date())
const showPicker = ref(false)
const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

const selectedYear = ref(year.value)

const showYearView = ref(false)

const pickerYear = ref(year.value)

const selectedDate = ref(null)

const emit = defineEmits(['update:modelValue', 'closeCalendar'])

const hoveredDate = ref(null)

const hoverInteractions = computed(() => {
  if (!hoveredDate.value) return []

  return interactions.filter((i) => {
    if (i.date) return i.date === hoveredDate.value

    if (i.dateStart && i.dateEnd) {
      return hoveredDate.value >= i.dateStart && hoveredDate.value <= i.dateEnd
    }

    return false
  })
})
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const tweetCounts = computed(() => {
  const map = {}

  interactions.forEach((i) => {
    if (i.date) {
      map[i.date] = (map[i.date] || 0) + i.tweets.length
    }

    if (i.dateStart && i.dateEnd) {
      let current = new Date(i.dateStart)
      const end = new Date(i.dateEnd)

      while (current <= end) {
        const key = current.toISOString().split('T')[0]
        map[key] = (map[key] || 0) + i.tweets.length
        current.setDate(current.getDate() + 1)
      }
    }
  })

  return map
})

const selectedInteractions = computed(() => {
  if (!selectedDate.value) return []

  return interactions.filter((i) => {
    if (i.date) return i.date === selectedDate.value

    if (i.dateStart && i.dateEnd) {
      return selectedDate.value >= i.dateStart && selectedDate.value <= i.dateEnd
    }

    return false
  })
})
const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})

const interactionDates = computed(() => {
  const dates = new Set()

  interactions.forEach((i) => {
    if (i.date) {
      dates.add(i.date)
    }

    if (i.dateStart && i.dateEnd) {
      const start = new Date(i.dateStart)
      const end = new Date(i.dateEnd)

      let current = new Date(start)

      while (current <= end) {
        const formatted = current.toISOString().split('T')[0]
        dates.add(formatted)

        current.setDate(current.getDate() + 1)
      }
    }
  })

  return [...dates]
})

function heatClass(day) {
  const date = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  const count = tweetCounts.value[date]

  if (!count) return ''

  if (count >= 5) return 'heat-3'
  if (count >= 3) return 'heat-2'

  return 'heat-1'
}

function prevMonth() {
  currentDate.value = new Date(year.value, month.value - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(year.value, month.value + 1, 1)
}

function selectDay(day) {
  const date = `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  emit('update:modelValue', date)
  emit('closeCalendar')

  setTimeout(() => {
    const el = document.getElementById('timeline-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, 150)
  window.scrollTo({ top: window.scrollY })
}
function applyDate() {
  currentDate.value = new Date(selectedYear.value, month.value, 1)
  showPicker.value = false
}

function selectMonth(i) {
  currentDate.value = new Date(pickerYear.value, i, 1)
  showYearView.value = false
}

function prevPickerYear() {
  pickerYear.value--
}

function nextPickerYear() {
  pickerYear.value++
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">◀</button>

      <h3 @click="showYearView = !showYearView" class="calendar-title">
        {{ monthNames[month] }} {{ year }}
      </h3>

      <div class="header-actions">
        <button @click="nextMonth">▶</button>
        <button class="close-calendar" @click="$emit('closeCalendar')">✕</button>
      </div>
    </div>

    <div v-if="showPicker" class="month-picker">
      <select v-model="month" class="picker-select">
        <option v-for="(m, i) in monthNames" :key="i" :value="i">
          {{ m }}
        </option>
      </select>

      <select v-model="selectedYear" class="picker-select">
        <option v-for="y in 50" :key="y" :value="2000 + y">
          {{ 2000 + y }}
        </option>
      </select>

      <button @click="applyDate" class="picker-button">Select date</button>
    </div>

    <div v-if="showYearView" class="year-picker-container">
      <div class="year-nav">
        <button @click="prevPickerYear">◀</button>
        <span>{{ pickerYear }}</span>
        <button @click="nextPickerYear">▶</button>
      </div>

      <div class="year-picker">
        <div v-for="(m, i) in monthNames" :key="i" class="month-card" @click="selectMonth(i)">
          {{ m }}
        </div>
      </div>
    </div>
    <div v-if="!showYearView" class="calendar-grid">
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="[
          'day',
          {
            active: interactionDates.includes(
              `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            ),
          },
          heatClass(day),
        ]"
        @mouseenter="
          hoveredDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        "
        @mouseleave="hoveredDate = null"
        @click="selectDay(day)"
      >
        {{ day }}

        <span
          v-if="
            hoveredDate ===
              `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` &&
            hoverInteractions.length
          "
          class="tooltip"
        >
          {{ hoverInteractions.length }} tweet(s)
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  color: white;
  width: 100%;
  max-width: 100%;
  position: relative;
  background: radial-gradient(circle at top, rgba(20, 20, 40, 0.4), transparent 70%);
  z-index: 20;
}

.calendar-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;

  margin-bottom: 12px;
}

.calendar-header button {
  background: #141418;
  border: 1px solid #2a2a33;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;
}

.calendar-header button:hover {
  background: #1f1f27;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.day {
  padding: 12px;
  text-align: center;

  background: rgba(25, 25, 35, 0.9);

  border-radius: 10px;

  cursor: pointer;

  transition: all 0.25s ease;

  position: relative;

  border: 1px solid rgba(80, 120, 255, 0.1);

  font-weight: 500;
}

.day:hover {
  transform: translateY(-3px) scale(1.05);

  background: rgba(45, 45, 65, 0.95);

  border-color: #5f8cff;

  box-shadow:
    0 0 12px rgba(80, 140, 255, 0.5),
    0 0 20px rgba(80, 140, 255, 0.25);
}
.day.active {
  background: linear-gradient(135deg, #ff2a4d, #ff5a7a);

  color: white;

  box-shadow:
    0 0 12px rgba(255, 60, 90, 0.7),
    0 0 25px rgba(255, 60, 90, 0.4);

  border: none;

  transform: scale(1.05);
}

.day.active::after {
  content: '';

  position: absolute;

  top: 6px;
  right: 6px;

  width: 6px;
  height: 6px;

  border-radius: 50%;

  background: #38bdf8;

  box-shadow: 0 0 8px #38bdf8;
}

.month-picker {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.calendar-title {
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-align: center;
  justify-self: center;
}
.month-picker {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 12px 0 18px 0;
}

.picker-select {
  background: #141418;
  border: 1px solid #2a2a33;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: 0.2s;
}

.picker-select:hover {
  border-color: #3f6cff;
}

.picker-select:focus {
  border-color: #3f6cff;
  box-shadow: 0 0 6px rgba(63, 108, 255, 0.4);
}

.picker-button {
  background: linear-gradient(135deg, #3f6cff, #6c8cff);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s;
}

.picker-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
}

.year-picker {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}
.month-card {
  background: rgba(20, 20, 30, 0.8);

  padding: 14px 10px;

  border-radius: 12px;

  border: 1px solid rgba(80, 120, 255, 0.15);

  text-align: center;
  cursor: pointer;

  transition: all 0.25s ease;

  font-size: 15px;
  letter-spacing: 0.5px;

  position: relative;
  overflow: hidden;
}

.month-card:hover {
  transform: translateY(-4px) scale(1.04);

  border-color: #5f8cff;

  box-shadow:
    0 0 14px rgba(80, 140, 255, 0.6),
    0 0 25px rgba(80, 140, 255, 0.3);

  background: rgba(40, 40, 60, 0.9);
}
.month-card::before {
  content: '';

  position: absolute;
  inset: 0;

  background: radial-gradient(circle at center, rgba(80, 140, 255, 0.3), transparent 70%);

  opacity: 0;
  transition: opacity 0.25s ease;
}

.month-card:hover::before {
  opacity: 1;
}

.year-picker-container {
  margin-bottom: 20px;
  background: rgba(10, 10, 14, 0.85);
  backdrop-filter: blur(12px);

  border-radius: 18px;
  padding: 24px;

  border: 1px solid rgba(80, 120, 255, 0.25);

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(60, 120, 255, 0.15) inset;
}

.year-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  font-size: 18px;
  letter-spacing: 1px;

  margin-bottom: 20px;
}

.year-nav span {
  font-size: 20px;
  font-weight: 600;
  color: #9ccaff;

  text-shadow: 0 0 8px rgba(80, 140, 255, 0.5);
}

.year-nav button {
  background: #141418;
  border: 1px solid #26262f;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.year-nav button:hover {
  background: #1f1f27;
}

.tooltip {
  position: absolute;

  bottom: 130%;
  left: 50%;

  transform: translateX(-50%);

  background: rgba(10, 10, 15, 0.95);

  color: #9ccaff;

  font-size: 12px;

  padding: 6px 10px;

  border-radius: 8px;

  white-space: nowrap;

  border: 1px solid rgba(80, 120, 255, 0.3);

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(80, 120, 255, 0.3);

  opacity: 0;

  animation: tooltipFade 0.2s forwards;
}

@keyframes tooltipFade {
  to {
    opacity: 1;
  }
}

.heat-1 {
  box-shadow: 0 0 6px rgba(255, 60, 90, 0.4);
}

.heat-2 {
  background: rgba(255, 60, 90, 0.25);
  box-shadow:
    0 0 10px rgba(255, 60, 90, 0.6),
    0 0 18px rgba(255, 60, 90, 0.4);
}

.heat-3 {
  background: linear-gradient(135deg, #ff2a4d, #ff5a7a);
  box-shadow:
    0 0 16px rgba(255, 60, 90, 0.8),
    0 0 30px rgba(255, 60, 90, 0.5);
}
.close-calendar {
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;

  border-radius: 8px;

  background: #141418;
  border: 1px solid #2a2a33;
  color: #ff5a7a;
  font-size: 16px;

  cursor: pointer;

  transition: all 0.2s ease;
}

.close-calendar:hover {
  background: #1f1f27;
  color: #ff5a7a;

  box-shadow: 0 0 8px rgba(255, 80, 120, 0.6);
}

.header-actions {
  display: flex;
  gap: 10px;
  justify-self: end;
}

/* ===== TABLET ===== */

@media (max-width: 1000px) {
  .calendar-grid {
    gap: 6px;
  }

  .day {
    padding: 10px;
    font-size: 14px;
  }
}

@media (max-width: 700px) {
  .calendar-grid {
    gap: 5px;
  }

  .day {
    padding: 8px;
    font-size: 13px;
  }

  .calendar-header {
    gap: 6px;
  }

  .calendar-title {
    font-size: 16px;
  }

  .calendar-header button {
    width: 32px;
    height: 32px;
  }

  .tooltip {
    font-size: 11px;
    padding: 4px 8px;
  }

  .month-card {
    font-size: 13px;
    padding: 10px;
  }

  .year-picker {
    gap: 10px;
  }

  .year-picker-container {
    padding: 16px;
  }
}
</style>
