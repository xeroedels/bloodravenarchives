<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import * as Icons from 'lucide-vue-next'

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

function scrollToSocials() {
  const el = document.getElementById('socials')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="home">
    <div class="hero">
      <h1>BloodRaven Archive</h1>
      <p>A fan chronicle of BloodRaven moments.</p>

      <button @click="enterArchive">Enter Chronicle</button>
      <div class="scroll-hint" @click="scrollToSocials">
        <Icons.ChevronDown size="28" />
      </div>
    </div>
    <section id="socials" class="social-section">
      <div class="social-container">
        <p class="social-title">Follow their social media♥️💙</p>
        <div class="people-socials">
          <div class="person">
            <p class="person-name">Elizabeth Rose Bloodflame💄</p>
            <div class="social-links">
              <a href="https://x.com/ERBloodflame?s=20" target="_blank">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path
                    d="M18.244 2H21.5l-7.5 8.57L22 22h-6.828l-5.34-7.01L3.5 22H0l8.02-9.16L0 2h6.828l4.82 6.32L18.244 2zm-1.2 18h1.88L7.05 4H5.06l11.984 16z"
                  />
                </svg>
              </a>
              <a href="https://www.youtube.com/@holoen_erbloodflame" target="_blank">
                <Icons.Youtube size="20" />
              </a>
              <a href="https://www.instagram.com/lizrose_holoen/" target="_blank">
                <Icons.Instagram size="20" />
              </a>
            </div>
          </div>
          <div class="person">
            <p class="person-name">Nerissa Ravencroft🎼</p>
            <div class="social-links">
              <a href="https://x.com/nerissa_en?s=20" target="_blank">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path
                    d="M18.244 2H21.5l-7.5 8.57L22 22h-6.828l-5.34-7.01L3.5 22H0l8.02-9.16L0 2h6.828l4.82 6.32L18.244 2zm-1.2 18h1.88L7.05 4H5.06l11.984 16z"
                  />
                </svg>
              </a>
              <a href="https://www.youtube.com/@NerissaRavencroft" target="_blank">
                <Icons.Youtube size="20" />
              </a>
              <a href="https://www.instagram.com/nerissa_ravencroft/" target="_blank">
                <Icons.Instagram size="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="fire-layer">
      <div class="flame red"></div>
      <div class="flame blue"></div>
      <span
        v-for="i in 60"
        :key="i"
        class="spark"
        :style="{
          '--i': Math.random(),
          '--j': Math.random(),
        }"
      ></span>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  position: relative;
  overflow-x: hidden;
  padding: 0 16px;
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
  font-size: clamp(2.5rem, 8vw, 72px);
  letter-spacing: clamp(1px, 1vw, 6px);
  margin-bottom: 16px;

  background: linear-gradient(90deg, #2aa8ff, #ff0033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 15px rgba(42, 168, 255, 0.6),
    0 0 25px rgba(255, 0, 51, 0.6);

  text-align: center;
  word-break: break-word;
}

.home p {
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 32px;
}

.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  min-height: 100vh;

  padding: 0 16px;
  text-align: center;
  padding-bottom: 120px;
  position: relative;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

  width: 3px;
  height: 3px;
  border-radius: 50%;

  background: #38bdf8;
  opacity: 0.8;

  filter: drop-shadow(0 0 6px currentColor);

  top: calc(100% * var(--i));
  left: calc(100% * var(--j));

  animation: sparkFloat 6s linear infinite;
  animation-delay: calc(var(--i) * -6s);
}

@keyframes sparkFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120px) scale(0.4);
    opacity: 0;
  }
}
.spark:nth-child(2n) {
  background: #38bdf8;
}

/* .spark:nth-child(3n) {
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
} */
/* 
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
} */

@keyframes flameMove {
  0% {
    transform: scale(1) translateY(0);
  }

  100% {
    transform: scale(1.2) translateY(-20px);
  }
}

.social-links a {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;

  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  color: white;

  transition: all 0.3s ease;
}

.social-links a:nth-child(1):hover {
  color: #1da1f2;
  box-shadow: 0 0 20px #1da1f2;
}

.social-links a:nth-child(2):hover {
  color: #ff0000;
  box-shadow: 0 0 20px #ff0000;
}

.social-links a:nth-child(3):hover {
  color: #e1306c;
  box-shadow: 0 0 20px #e1306c;
}
.social-links a:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(255, 77, 109, 0.5);
}

.social-section {
  margin-top: -60px;
  text-align: center;
  padding-bottom: 80px;
}

.social-title {
  margin-bottom: 30px;
  opacity: 0.7;
  letter-spacing: 1px;
  margin-top: 60px;
}

.people-socials {
  display: flex;
  justify-content: space-between;
  gap: 100px;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 50px;
  flex-direction: row;
}

.person {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
  min-height: 48px;
  min-width: 250px;
  padding: 10px 20px;
  border-radius: 12px;
  transition: 0.3s;
  max-width: 250px;
  width: auto;
  flex: 1;
  text-align: center;
  justify-content: space-between;
}

.person-name {
  font-size: 0.95rem;
  opacity: 0.8;
  margin-bottom: 4px;
}

.social-links {
  display: flex;
  gap: 12px;
}

.person:nth-child(1) .person-name {
  color: #ff0000;
}

.person:nth-child(2) .person-name {
  color: #4e46ed;
}
.person:hover {
  background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 768px) {
  .people-socials {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .person {
    width: 100%;
  }
}

.scroll-hint {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);

  opacity: 0.6;

  animation: fadeIn 1.5s ease forwards;
  z-index: 10;
  animation-delay: 1s;
  cursor: pointer;
}
.scroll-hint:hover {
  opacity: 1;
  transform: translateX(-50%) scale(1.1);
}

.scroll-hint svg {
  color: white;
  filter: drop-shadow(0 0 6px rgba(255, 77, 109, 0.6));
  opacity: 0.9;
  animation: float 2s ease-in-out infinite alternate;
}
.x-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 45px;
  height: 45px;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.05);
  color: white;

  transition: 0.3s;
}

.x-icon:hover {
  box-shadow: 0 0 20px #1da1f2;
  transform: scale(1.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(15px);
  }
  to {
    opacity: 0.9;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(6px);
  }
}
</style>
