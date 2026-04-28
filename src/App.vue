<script setup></script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style>
#app {
  overflow-x: hidden;
}
html,
body,
#app {
  margin: 0;
  padding: 0;
  background: #000;
}
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(0);
}

.page-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

.page-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
