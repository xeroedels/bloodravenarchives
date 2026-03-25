<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import TimelineView from '@/components/TimelineView.vue'
import CalendarView from '@/components/CalendarView.vue'

const router = useRouter()

const showCalendar = ref(false)
const selectedDate = ref(null)

function goBack() {
  router.back()
}
</script>

<template>
  <div class="archive-page">
    <button class="back" @click="goBack">← Back</button>

    <button class="calendar-btn" @click="showCalendar = !showCalendar">📅 Select Date</button>

    <div class="layout">
      <div class="timeline-panel">
        <TimelineView :selectedDate="selectedDate" />
      </div>

      <div v-if="showCalendar" class="calendar-panel">
        <CalendarView v-model="selectedDate" />
      </div>
    </div>
  </div>
</template>
