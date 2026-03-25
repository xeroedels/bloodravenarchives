<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

onMounted(() => {
  const fireLayer = document.querySelector('.fire-layer')

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20

    fireLayer.style.transform = `translate(${x}px, ${y}px)`
  })
})
const router = useRouter()

function enterArchive() {
  router.push('/hub')
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>BloodRaven Archive</h1>
      <p>A fan chronicle of BloodRaven moments.</p>

      <button @click="enterArchive">Enter Chronicle</button>
    </div>
    <div class="fire-layer">
      <div class="flame red"></div>
      <div class="flame blue"></div>
      <span v-for="n in 60" :key="n" class="spark" :style="{ '--i': n }"></span>
    </div>
  </div>
</template>

<style scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  position: relative;
}

.home::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 40%, #ff0033 0%, transparent 20%),
    radial-gradient(circle at 80% 60%, #ff0033 0%, transparent 20%);
  opacity: 0.2;
  pointer-events: none;
}
button {
  margin-top: 20px;

  padding: 16px 48px;

  font-size: 18px;
  font-weight: 600;

  border-radius: 14px;

  border: none;

  color: white;

  background: linear-gradient(135deg, #ff2a4d, #ff5a7a);

  cursor: pointer;

  position: relative;
  overflow: hidden;

  transition: all 0.3s ease;

  box-shadow:
    0 8px 24px rgba(255, 60, 90, 0.6),
    0 0 30px rgba(255, 60, 90, 0.4);
  animation: chronicleGlow 3s ease-in-out infinite alternate;
}

button:hover {
  transform: translateY(-4px) scale(1.05);

  box-shadow:
    0 14px 40px rgba(255, 60, 90, 0.8),
    0 0 60px rgba(255, 60, 90, 0.6);
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;

  width: 60%;
  height: 100%;

  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.35), transparent);

  transition: 0.6s;
}
button:hover::before {
  left: 120%;
}

button:active {
  transform: translateY(0) scale(0.96);
}

@keyframes chronicleGlow {
  from {
    box-shadow:
      0 8px 24px rgba(255, 60, 90, 0.4),
      0 0 15px rgba(255, 60, 90, 0.3);
  }

  to {
    box-shadow:
      0 14px 40px rgba(255, 60, 90, 0.8),
      0 0 40px rgba(255, 60, 90, 0.6);
  }
}

.home h1 {
  font-size: 72px;
  letter-spacing: 6px;
  margin-bottom: 16px;

  background: linear-gradient(90deg, #2aa8ff, #ff0033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 15px rgba(42, 168, 255, 0.6),
    0 0 25px rgba(255, 0, 51, 0.6);
}
.home p {
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 32px;
}

.hero {
  text-align: center;
  max-width: 600px;
}

@keyframes bloodFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.fire-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
  pointer-events: none;
  overflow: hidden;
}

.flame {
  position: absolute;
  bottom: -40px;
  width: 420px;
  height: 220px;
  filter: blur(60px);
  opacity: 0.5;

  animation: flameMove 6s ease-in-out infinite alternate;
}

.flame.red {
  left: 10%;
  background: radial-gradient(circle, rgba(255, 0, 50, 0.9), transparent 70%);
}

.flame.blue {
  right: 10%;
  background: radial-gradient(circle, rgba(0, 170, 255, 0.9), transparent 70%);
}

.spark {
  position: absolute;
  bottom: -10px;

  width: 3px;
  height: 3px;
  border-radius: 50%;

  background: #38bdf8;

  opacity: 0.8;

  animation: sparkRise linear infinite;

  filter: drop-shadow(0 0 6px currentColor);
  animation-delay: calc(var(--i) * 0.2s);
}

.spark:nth-child(2n) {
  background: #38bdf8;
}

.spark:nth-child(3n) {
  background: #ff0033;
}

.spark:nth-child(3n) {
  left: 10%;
  animation-duration: 7s;
}

.spark:nth-child(4n) {
  left: 20%;
  animation-duration: 5s;
}

.spark:nth-child(5n) {
  left: 30%;
}

.spark:nth-child(6n) {
  left: 40%;
  animation-duration: 8s;
}

.spark:nth-child(7n) {
  left: 50%;
}

.spark:nth-child(8n) {
  left: 60%;
}

.spark:nth-child(9n) {
  left: 70%;
}

.spark:nth-child(10n) {
  left: 80%;
}

.spark:nth-child(11n) {
  left: 90%;
}

@keyframes sparkRise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translateY(-350px) scale(0.4);
    opacity: 0;
  }
}

@keyframes flameMove {
  0% {
    transform: scale(1) translateY(0);
  }

  100% {
    transform: scale(1.2) translateY(-20px);
  }
}
</style>
