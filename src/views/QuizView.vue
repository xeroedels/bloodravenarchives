<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import questions from '@/data/quiz'
const router = useRouter()

function goBack() {
  router.push('/')
}
const selected = ref(null)
const score = ref(0)

const quizFinished = ref(false)

const leaderboard = ref([
  { name: 'Guest 1', score: 6 },
  { name: 'Guest 2', score: 5 },
  { name: 'Guest 3', score: 4 },
])

onMounted(() => {
  const savedLeaderboard = localStorage.getItem('bloodravenLeaderboard')

  if (savedLeaderboard) {
    leaderboard.value = JSON.parse(savedLeaderboard)
  }
})

const currentQuestion = ref(0)
const answers = ref(Array(questions.length).fill(null))

function selectAnswer(index) {
  answers.value[currentQuestion.value] = index

  const isCorrect = questions[currentQuestion.value].options[index].correct

  if (isCorrect) {
    score.value++
    correctAnswer.currentTime = 0
    correctAnswer.play()
    console.log('Correct')
  } else {
    wrongAnswer.currentTime = 0
    wrongAnswer.play()
    console.log('Wrong')
  }
}

const correctAnswer = new Audio('/bloodravenarchives/VERYGOOD.wav')
const wrongAnswer = new Audio('/bloodravenarchives/bonktwo.mp3')
correctAnswer.volume = 0.6
wrongAnswer.volume = 0.6

function nextQuestion() {
  if (answers.value[currentQuestion.value] === null) {
    return
  }

  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++
  } else {
    const existingPlayer = leaderboard.value.find((player) => player.name === playerName.value)

    if (existingPlayer) {
      if (score.value > existingPlayer.score) {
        existingPlayer.score = score.value
      }
    } else {
      leaderboard.value.push({
        name: playerName.value,
        score: score.value,
      })
    }

    leaderboard.value.sort((a, b) => b.score - a.score)
    localStorage.setItem('bloodravenLeaderboard', JSON.stringify(leaderboard.value))
    quizFinished.value = true
  }
}

function getRank() {
  const percentage = (score.value / questions.length) * 100

  if (percentage >= 90) return 'S'
  if (percentage >= 75) return 'A'
  if (percentage >= 60) return 'B'
  if (percentage >= 40) return 'C'

  return 'D'
}

function restartQuiz() {
  currentQuestion.value = 0
  score.value = 0

  answers.value = Array(questions.length).fill(null)

  quizFinished.value = false
}

const playerName = ref('')
const quizStarted = ref(false)

function startQuiz() {
  if (!playerName.value.trim()) return
  quizStarted.value = true
}
</script>

<template>
  <div class="quiz-page">
    <div class="quiz-container">
      <div v-if="!quizStarted" class="start-screen">
        <h1 class="start-title">Welcome to BloodRaven Quiz</h1>
        <input v-model="playerName" placeholder="Enter your name..." class="name-input" />
        <button @click="startQuiz" class="start-btn">Start Quiz</button>
      </div>
      <div v-else-if="!quizFinished">
        <button class="quit-btn" @click="goBack">Exit</button>
        <h1 class="quiz-title">BloodRaven Quiz</h1>
        <div class="question-nav">
          <button
            v-for="(q, i) in questions"
            :key="i"
            :class="{ active: currentQuestion === i, answered: answers[i] !== null }"
          >
            {{ i + 1 }}
          </button>
        </div>
        <p class="question-counter">Question {{ currentQuestion + 1 }} of {{ questions.length }}</p>
        <p class="score-board">Score: {{ score }}</p>
        <h2 class="quiz-section">
          {{ questions[currentQuestion].question }}
        </h2>

        <div class="answers-grid">
          <div
            v-for="(option, index) in questions[currentQuestion].options"
            :key="index"
            class="answer-card"
            :class="{
              'text-only': !option.image,
              correct: answers[currentQuestion] === index && option.correct,

              wrong: answers[currentQuestion] === index && !option.correct,
            }"
            @click="answers[currentQuestion] === null && selectAnswer(index)"
          >
            <img v-if="option.image" :src="option.image" />
            <p>{{ option.name }}</p>
          </div>
        </div>
        <button class="next-btn" @click="nextQuestion">Next</button>
      </div>
      <div v-else class="result-screen">
        <h1>Quiz Complete!</h1>
        <p class="final-score">{{ score }} / {{ questions.length }}</p>
        <div class="leaderboard">
          <h2>🏆 Leaderboard</h2>

          <div v-for="(player, index) in leaderboard" :key="index" class="leaderboard-row">
            <span> {{ index + 1 }}. {{ player.name }} </span>

            <span> {{ player.score }}/{{ questions.length }} </span>
          </div>
        </div>
        <p class="final-rank">Rank: {{ getRank() }}</p>
        <button class="restart-btn" @click="restartQuiz">Try Again</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* div {
  color: white;
  text-align: center;
  margin-top: 100px;
} */

.quiz-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;
  color: white;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(4, 140px);
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}
.answer-card {
  width: 140px;
  height: 160px;

  border-radius: 20px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.06);

  backdrop-filter: blur(12px);

  cursor: pointer;

  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
}
.answer-card.correct {
  border: 2px solid #22c55e;
  box-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
}
.answer-card.wrong {
  border: 2px solid #ef4444;
  box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
}
.answer-card:hover {
  transform: translateY(-8px) scale(1.04);

  border-color: rgba(255, 255, 255, 0.14);

  box-shadow:
    0 0 20px rgba(255, 80, 120, 0.18),
    0 0 40px rgba(100, 150, 255, 0.08);
}
.answer-card.selected {
  outline: 2px solid #ff4d88;
  box-shadow: 0 0 20px rgba(255, 80, 120, 0.6);
}
.answer-card p {
  margin: 8px 0 10px;
  text-align: center;
  width: 100%;
  font-size: 14px;
}

.answer-card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
}

.answer-card:hover {
  transform: scale(1.05);
}
.answer-card.selected {
  outline: 2px solid #ff4d88;
  box-shadow: 0 0 15px rgba(255, 80, 120, 0.5);
}

.question-nav {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.question-nav button {
  width: 42px;
  height: 42px;

  border-radius: 50%;

  border: 1px solid rgba(255, 255, 255, 0.08);

  background: rgba(255, 255, 255, 0.04);

  color: white;

  cursor: pointer;

  transition: all 0.25s ease;

  backdrop-filter: blur(8px);
}
.question-nav button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.question-nav button.active {
  background: linear-gradient(135deg, #ff4d88, #6ea8ff);

  box-shadow: 0 0 18px rgba(255, 80, 120, 0.35);

  transform: scale(1.08);
}
.quiz-container {
  position: relative;

  width: min(100%, 980px);

  margin: 0 auto;

  padding: 48px;

  border-radius: 32px;

  background: rgba(255, 255, 255, 0.04);

  border: 1px solid rgba(255, 255, 255, 0.06);

  backdrop-filter: blur(20px);

  box-shadow:
    0 0 40px rgba(255, 50, 100, 0.12),
    0 0 80px rgba(100, 150, 255, 0.06);

  overflow: hidden;

  animation: fadeUp 0.8s ease;
}

.quiz-container::before {
  content: '';

  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 3px;

  background: linear-gradient(90deg, #ff4d88, #6ea8ff);

  opacity: 0.8;
}

.quiz-title {
  font-size: clamp(2.5rem, 5vw, 4rem);

  margin-bottom: 24px;

  font-weight: 800;

  letter-spacing: -2px;

  background: linear-gradient(90deg, #6fb1ff, #ff4d88);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow: 0 0 20px rgba(255, 80, 120, 0.25);

  animation: fadeUp 1s ease;
}
.quiz-section {
  font-size: clamp(1.3rem, 2vw, 1.8rem);

  line-height: 1.5;

  margin: 30px 0 40px;

  opacity: 0.95;

  max-width: 700px;

  margin-inline: auto;
}
.quiz-page {
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 40px;

  color: white;

  position: relative;

  overflow: hidden;

  background:
    radial-gradient(circle at top left, rgba(255, 59, 107, 0.08), transparent 30%),
    radial-gradient(circle at bottom right, rgba(77, 163, 255, 0.08), transparent 30%), #07070a;
}
.quit-btn {
  position: absolute;
  top: 20px;
  right: 20px;

  width: 42px;
  height: 42px;

  border-radius: 50%;
  border: 1px solid rgba(255, 80, 120, 0.4);

  background: rgba(255, 255, 255, 0.05);
  color: white;

  cursor: pointer;
  transition: 0.3s;
}

.quit-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 12px rgba(255, 80, 120, 0.4);
}

.answer-card.text-only {
  min-height: 100px;
  height: auto;
  padding: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.next-btn {
  margin-top: 24px;
  padding: 12px 24px;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  background: rgba(255, 80, 120, 0.15);
  color: white;
}

.question-counter {
  margin: 10px 0 20px;

  font-size: 14px;
  opacity: 0.7;

  letter-spacing: 1px;
}

.question-nav button.answered {
  background: rgba(255, 80, 120, 0.25);
}

.question-nav button.active {
  background: #ff4d88;
  box-shadow: 0 0 12px rgba(255, 80, 120, 0.6);
}
.score-board {
  font-size: 15px;
  opacity: 0.85;
  margin-bottom: 12px;
}

.result-screen {
  text-align: center;
  margin-top: 100px;
}

.final-score {
  font-size: 48px;
  font-weight: bold;
  margin: 20px 0;
}

.final-rank {
  font-size: 28px;
  color: gold;
}

.leaderboard {
  margin-top: 30px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.leaderboard-row {
  display: flex;
  justify-content: space-between;

  padding: 12px 16px;
  margin-bottom: 10px;

  border-radius: 12px;

  background: rgba(255, 255, 255, 0.05);
}

.restart-btn {
  margin-top: 25px;

  padding: 12px 24px;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  transition: 0.3s;
}

.restart-btn:hover {
  transform: scale(1.05);
}

.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 20px;
}

.start-title {
  font-size: 48px;

  background: linear-gradient(90deg, #6ea8ff, #ff4d88);

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow: 0 0 15px rgba(255, 80, 120, 0.25);
}
.name-input {
  width: 320px;

  padding: 14px 18px;

  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);

  background: rgba(255, 255, 255, 0.05);

  color: white;
  font-size: 16px;

  outline: none;

  transition: 0.3s;
}

.name-input:focus {
  border-color: #ff4d88;

  box-shadow: 0 0 15px rgba(255, 80, 120, 0.25);
}
.start-btn {
  padding: 14px 30px;

  border: none;
  border-radius: 12px;

  cursor: pointer;

  font-size: 16px;
  font-weight: bold;

  color: white;

  background: linear-gradient(90deg, #6ea8ff, #ff4d88);

  transition: 0.3s;
}

.start-btn:hover {
  transform: scale(1.05);

  box-shadow: 0 0 20px rgba(255, 80, 120, 0.4);
}
@media (max-width: 768px) {
  .quiz-container {
    padding: 24px 18px;

    border-radius: 24px;
  }

  .quiz-title {
    font-size: 2.2rem;
  }

  .question-nav {
    flex-wrap: wrap;
  }

  .question-nav button {
    width: 38px;
    height: 38px;
  }

  .answers-grid {
    grid-template-columns: repeat(2, 1fr);

    gap: 16px;
  }

  .answer-card {
    height: auto;

    min-height: 150px;
  }

  .answer-card p {
    font-size: 0.9rem;

    padding: 0 6px 10px;
  }

  .final-score {
    font-size: 3rem;
  }

  .leaderboard-row {
    font-size: 0.92rem;
  }
}
@media (max-width: 480px) {
  .answers-grid {
    grid-template-columns: 1fr;
  }

  .answer-card {
    max-width: 100%;
  }

  .start-title {
    font-size: 2.2rem;
  }

  .name-input {
    width: 100%;
  }

  .start-btn,
  .next-btn,
  .restart-btn {
    width: 100%;
  }
}
@media (hover: none) {
  .answer-card:hover {
    transform: none;

    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  }
}
</style>
