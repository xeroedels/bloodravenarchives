<script setup>
import { ref, onMounted } from 'vue'
import { isLoading, loadingMessage } from '@/loadingState'
</script>

<template>
  <Transition name="loading-fade">
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <h1 class="loading-title">BloodRaven Archive</h1>

        <p class="loading-text">
          {{ loadingMessage }}
        </p>

        <div class="loading-bar">
          <div class="loading-progress"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;

  background: radial-gradient(circle at top, #111, #050505);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999999;

  overflow: hidden;
}

.loading-screen::before {
  content: '';

  position: absolute;

  width: 900px;
  height: 900px;

  background: radial-gradient(circle, rgba(255, 0, 51, 0.08), transparent 70%);

  filter: blur(30px);
}

.loading-content {
  position: relative;

  text-align: center;

  width: min(90%, 500px);

  z-index: 2;
}

.loading-title {
  font-size: clamp(2.5rem, 7vw, 5rem);

  margin-bottom: 24px;

  font-weight: 800;

  background: linear-gradient(90deg, #6ea8ff, #ff4d88);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow: 0 0 20px rgba(255, 80, 120, 0.18);
}

.loading-text {
  color: rgba(255, 255, 255, 0.72);

  margin-bottom: 30px;

  letter-spacing: 1px;

  min-height: 24px;
}

.loading-bar {
  width: 100%;
  height: 8px;

  border-radius: 999px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.06);

  border: 1px solid rgba(255, 255, 255, 0.08);
}

.loading-progress {
  height: 100%;

  width: 100%;

  background: linear-gradient(90deg, #ff4d88, #6ea8ff);

  animation: loadingMove 1.8s linear forwards;
}

.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.6s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

@keyframes loadingMove {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0%);
  }
}
</style>
