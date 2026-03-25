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
  background: rgba(255, 255, 255, 0.02);
  padding: 20px;
  border-radius: 12px;
  backdrop-filter: blur(3px);

  width: 100%;
  max-width: 100%;
}
.twitter-tweet {
  margin: 0 auto !important;
  max-width: 100% !important;
}
.thread-item {
  position: relative;
  padding-left: 10px;
}

.thread-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 0;
  top: 100%;
  width: 2px;
  height: 25px;
  background: rgba(255, 255, 255, 0.1);
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
</style>
