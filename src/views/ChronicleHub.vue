<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function tiltCard(e) {
  const card = e.currentTarget

  const rect = card.getBoundingClientRect()

  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = -(y - centerY) / 12
  const rotateY = (x - centerX) / 12

  card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`
}

function resetTilt(e) {
  const card = e.currentTarget
  card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) scale(1)'
}

function pressCard(e) {
  const card = e.currentTarget
  card.style.transform += 'scale(0.96)'
}

function releaseCard(e) {
  const card = e.currentTarget
  card.style.transform = card.style.transform.replace(' scale(0.96)', '')
}
</script>

<template>
  <div class="hub">
    <div class="fire-container">
      <span v-for="i in 15" :key="i" class="fire"></span>
    </div>
    <button class="back" @click="router.push('/')">← Back</button>

    <div class="center">
      <h1 class="title">BloodRaven Chronicle</h1>

      <p class="subtitle">Explore the archives or watch their oldge marriage couple moments</p>

      <div class="hub-buttons">
        <div
          class="card archive"
          @mousemove="tiltCard"
          @mouseleave="resetTilt"
          @mousedown="pressCard"
          @mouseup="releaseCard"
          @click="router.push('/archive')"
        >
          <span>Archives</span>
          <p>Timeline of BloodRaven events</p>
        </div>

        <div
          class="card clips"
          @mousemove="tiltCard"
          @mouseleave="resetTilt"
          @mousedown="pressCard"
          @mouseup="releaseCard"
          @click="router.push('/clips')"
        >
          <span>Clips</span>
          <p>Video highlights</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 20px;
}
.hub {
  height: 100vh;
  background: radial-gradient(circle at top, #0b0b0b, #000);
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
  overflow: hidden;
}

.hub::before {
  content: '';

  position: absolute;

  width: 900px;
  height: 900px;

  background: radial-gradient(circle, rgba(255, 0, 51, 0.1), transparent 70%);

  top: -320px;
  left: -320px;

  filter: blur(20px);
}

.hub::after {
  content: '';

  position: absolute;

  width: 800px;
  height: 800px;

  background: radial-gradient(circle, rgba(42, 168, 255, 0.08), transparent 70%);

  bottom: -240px;
  right: -240px;

  filter: blur(20px);
}
.center {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  text-align: center;
  z-index: 2;

  padding: 0 16px;
}

.title {
  font-size: clamp(3rem, 8vw, 5rem);

  margin-bottom: 14px;

  font-weight: 800;

  letter-spacing: -2px;

  background: linear-gradient(90deg, #2aa8ff, #ff0033);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow:
    0 0 18px rgba(42, 168, 255, 0.25),
    0 0 24px rgba(255, 0, 51, 0.18);

  animation: fadeUp 1s ease;
}
h1 {
  word-break: break-word;
  max-width: 100%;
  word-break: break-word;
  text-align: center;
  font-size: clamp(28px, 8vw, 64px);
  line-height: 1.2;
}
@media (max-width: 640px) {
  h1 {
    font-size: 32px !important;
    line-height: 1.2;
  }
}
.subtitle {
  color: rgba(255, 255, 255, 0.72);

  font-size: 1.1rem;

  line-height: 1.7;

  margin-bottom: 70px;

  letter-spacing: 0.3px;

  max-width: 650px;

  margin-inline: auto;
}
.hub-buttons {
  display: flex;
  gap: 40px;
  justify-content: center;
  width: 100%;
}

.card {
  position: relative;

  width: 320px;
  height: 190px;

  border-radius: 28px;

  background: rgba(255, 255, 255, 0.05);

  border: 1px solid rgba(255, 255, 255, 0.06);

  backdrop-filter: blur(16px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition: all 0.3s ease;

  transform-style: preserve-3d;

  overflow: hidden;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.card::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);

  opacity: 0.7;
}

.card span {
  font-size: 2rem;

  font-weight: 700;

  letter-spacing: -1px;

  margin-bottom: 8px;
}

.card p {
  font-size: 0.98rem;

  color: rgba(255, 255, 255, 0.72);

  line-height: 1.6;

  letter-spacing: 0.2px;

  max-width: 220px;
}

.card:hover p {
  color: #e4e9f5;
}

.archive span {
  color: #ff0033;
}

.archive:hover {
  transform: translateY(-10px) scale(1.03);

  border-color: rgba(255, 0, 51, 0.22);

  box-shadow:
    0 0 30px rgba(255, 0, 51, 0.25),
    0 0 70px rgba(255, 0, 51, 0.1);
}
.clips span {
  color: #2aa8ff;
}

.clips:hover {
  transform: translateY(-10px) scale(1.03);

  border-color: rgba(42, 168, 255, 0.22);

  box-shadow:
    0 0 30px rgba(42, 168, 255, 0.22),
    0 0 70px rgba(42, 168, 255, 0.1);
}

.back {
  position: absolute;
  top: 30px;
  left: 30px;

  display: flex;
  align-items: center;
  gap: 8px;

  padding: 14px 28px;

  font-size: 16px;
  font-weight: 600;

  border-radius: 14px;

  background: linear-gradient(135deg, #ff2a4d, #ff5a7a);

  border: none;

  color: white;

  cursor: pointer;

  transition: all 0.25s ease;

  box-shadow:
    0 6px 18px rgba(255, 60, 90, 0.5),
    0 0 18px rgba(255, 60, 90, 0.4);
}

.back:hover {
  letter-spacing: 0.5px;
  transform: translateY(-3px) scale(1.03);

  box-shadow:
    0 12px 30px rgba(255, 60, 90, 0.7),
    0 0 35px rgba(255, 60, 90, 0.6);
}

.back:active {
  transform: translateY(0) scale(0.97);
}

.fire-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.fire {
  position: absolute;
  bottom: -40px;

  width: 8px;
  height: 18px;

  background: radial-gradient(
    circle,
    #6fd3ff 0%,
    #2aa8ff 40%,
    rgba(42, 168, 255, 0.2) 70%,
    transparent 100%
  );

  border-radius: 50%;

  filter: blur(3px);

  opacity: 0.45;

  animation: floatFire linear infinite;

  box-shadow:
    0 0 6px #2aa8ff,
    0 0 12px rgba(42, 168, 255, 0.6);
}

@keyframes floatFire {
  0% {
    transform: translateY(0) scale(0.6);
    opacity: 0;
  }

  20% {
    opacity: 0.6;
  }

  80% {
    opacity: 0.3;
  }

  100% {
    transform: translateY(-110vh) scale(1.2);
    opacity: 0;
  }
}

.fire:nth-child(odd) {
  animation-duration: 14s;
}

.fire:nth-child(even) {
  animation-duration: 20s;
}

.fire:nth-child(3n) {
  left: 20%;
}

.fire:nth-child(4n) {
  left: 40%;
}

.fire:nth-child(5n) {
  left: 60%;
}

.fire:nth-child(6n) {
  left: 80%;
}

@media (max-width: 900px) {
  .title {
    font-size: 46px;
  }

  .subtitle {
    font-size: 16px;
  }

  .hub-buttons {
    gap: 30px;
  }

  .card {
    width: 260px;
    height: 160px;
  }
}

@media (max-width: 600px) {
  .hub {
    padding: 40px 20px;
  }

  .title {
    font-size: 34px;
    line-height: 1.2;
  }

  .subtitle {
    font-size: 15px;
    margin-bottom: 40px;
  }

  .hub-buttons {
    flex-direction: column;
    gap: 25px;
  }

  .card {
    width: 100%;
    max-width: 320px;
    height: 140px;
  }

  .card span {
    font-size: 24px;
  }

  .card p {
    font-size: 15px;
  }

  .back {
    top: 15px;
    left: 15px;
    padding: 10px 18px;
    font-size: 14px;
  }
}

.card:active {
  filter: brightness(1.1);
}

.archive:active {
  box-shadow:
    0 0 30px #ff0033,
    0 0 80px #ff003360;
}

.clips:active {
  box-shadow:
    0 0 30px #2aa8ff,
    0 0 80px #2aa8ff60;
}
</style>
