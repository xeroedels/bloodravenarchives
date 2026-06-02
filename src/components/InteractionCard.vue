<script setup>
import { onMounted, nextTick } from 'vue'

defineProps({
  interaction: Object,
})

onMounted(async () => {
  await nextTick()
  if (window.twttr) {
    window.twttr.widgets.load()
  }
})
</script>

<template>
  <div class="thread">
    <div v-for="(tweet, index) in interaction.tweets" :key="index" class="thread-item">
      <blockquote class="twitter-tweet" data-theme="dark" data-width="100%">
        <a :href="tweet"></a>
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #111;
  border: 1px solid #222;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.7;
}

.type {
  background: crimson;
  padding: 4px 8px;
  border-radius: 6px;
}
a {
  color: #ff4d6d;
}

.interaction-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.thread {
  position: relative;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.06);

  border-radius: 24px;

  padding: 24px;

  backdrop-filter: blur(16px);

  width: 100%;

  max-width: 100%;

  overflow: hidden;

  transition: var(--transition-smooth);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);

  animation: fadeUp 0.8s ease both;
}

.thread:hover {
  transform: translateY(-4px);

  border-color: rgba(255, 255, 255, 0.1);

  box-shadow:
    0 0 20px rgba(255, 59, 107, 0.12),
    0 0 40px rgba(77, 163, 255, 0.06);
}

.thread::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 2px;

  background: linear-gradient(90deg, var(--accent-red), var(--accent-blue));

  opacity: 0.7;
}
.twitter-tweet {
  margin: 0 auto !important;
  max-width: 100% !important;
  border-radius: 18px;

  overflow: hidden;
}
.thread-item {
  position: relative;
  padding-left: 14px;
  margin-bottom: 28px;
}

.thread-item:not(:last-child)::after {
  content: '';

  position: absolute;

  left: -2px;

  top: 100%;

  width: 2px;

  height: 28px;

  background: linear-gradient(to bottom, rgba(255, 59, 107, 0.35), rgba(77, 163, 255, 0.15));

  border-radius: 999px;
}

@media (max-width: 700px) {
  .thread {
    padding: 14px;
  }

  .thread-item {
    padding-left: 6px;
  }

  .thread-item:not(:last-child)::after {
    height: 18px;
  }
}

.thread-item::before {
  content: '';

  position: absolute;

  left: -6px;

  top: 18px;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: linear-gradient(135deg, var(--accent-red), var(--accent-blue));

  box-shadow: 0 0 12px rgba(255, 59, 107, 0.4);
}
</style>
