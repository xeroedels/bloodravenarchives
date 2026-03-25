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
</script>

<template>
  <div class="hub">
    <div class="fire-container">
      <span v-for="i in 15" :key="i" class="fire"></span>
    </div>
    <button class="back" @click="router.push('/')">← Back</button>

    <div class="center">
      <h1 class="title">Bloodraven Chronicle</h1>

      <p class="subtitle">Explore the archives or watch their oldge marriage couple moments</p>

      <div class="hub-buttons">
        <div
          class="card archive"
          @mousemove="tiltCard"
          @mouseleave="resetTilt"
          @click="router.push('/archive')"
        >
          <span>Archives</span>
          <p>Timeline of Bloodraven events</p>
        </div>

        <div
          class="card clips"
          @mousemove="tiltCard"
          @mouseleave="resetTilt"
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
  width: 1200px;
  height: 1200px;
  background: radial-gradient(circle, #ff003330, transparent 70%);
  top: -400px;
  left: -400px;
}

.hub::after {
  content: '';
  position: absolute;
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, #2aa8ff20, transparent 70%);
  bottom: -300px;
  right: -300px;
}

.center {
  text-align: center;
  z-index: 2;
}

.title {
  font-size: 64px;
  margin-bottom: 10px;

  background: linear-gradient(90deg, #2aa8ff, #ff0033);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow:
    0 0 15px rgba(42, 168, 255, 0.4),
    0 0 25px rgba(255, 0, 51, 0.4);
}

.subtitle {
  color: #d0d0d0;
  font-size: 18px;
  margin-bottom: 60px;
  letter-spacing: 0.3px;
}

.hub-buttons {
  display: flex;
  gap: 60px;
  justify-content: center;
}

.card {
  width: 320px;
  height: 180px;

  border-radius: 16px;

  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);

  border: 1px solid #222;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  transform-style: preserve-3d;
}

.card span {
  font-size: 30px;
  font-weight: 600;
}

.card p {
  margin-top: 12px;

  font-size: 17px;

  color: #d0d6e0;

  line-height: 1.6;

  letter-spacing: 0.3px;

  text-shadow: 0 0 6px rgba(255, 255, 255, 0.05);
}

.card:hover p {
  color: #e4e9f5;
}

.archive span {
  color: #ff0033;
}

.archive:hover {
  transform: translateY(-6px) scale(1.03);

  box-shadow:
    0 0 20px #ff0033,
    0 0 60px #ff003350;
}

.clips span {
  color: #2aa8ff;
}

.clips:hover {
  transform: translateY(-6px) scale(1.03);

  box-shadow:
    0 0 20px #2aa8ff,
    0 0 60px #2aa8ff50;
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

  opacity: 0.85;

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
</style>
