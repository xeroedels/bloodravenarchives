<script setup></script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  background: #000;
}
.page-enter-from {
  opacity: 0;
  transform: scale(1.02);
}

.page-enter-active {
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.page-enter-to {
  opacity: 1;
  transform: scale(1);
}

.page-leave-from {
  opacity: 1;
  transform: scale(1);
}

.page-leave-active {
  transition: all 0.6s ease;
}

.page-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
