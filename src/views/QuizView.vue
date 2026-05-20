<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
const questions = [
  {
    question: 'Who is Jailbird #55?',
    options: [
      { name: 'Shiori', image: 'public/Shiori_Novella_Portrait.webp', correct: false },
      { name: 'Nerissa', image: 'public/nerissaportrait.png', correct: false },
      { name: 'Kiara', image: 'public/Takanashi_Kiara_Portrait.webp', correct: false },
      { name: 'Liz', image: 'public/lizpotrait.png', correct: true },
    ],
  },
  {
    question: 'Which one is the first ever Bloodraven one on one stream?',
    options: [
      {
        name: 'Powerwash stream with Rissa/Liz',
        correct: true,
      },
      {
        name: 'Wicked Part One Watchalong',
        correct: false,
      },
      {
        name: 'League of Legends Collab',
        correct: false,
      },
      {
        name: 'ENReco Season 1',
        correct: false,
      },
    ],
  },
  {
    question: 'Who is Liz’s mama?',
    options: [
      { name: 'Joe Mama', correct: false },
      { name: 'MEPHIST0216', correct: true },
      { name: 'Mama Rissa', correct: false },
      { name: 'Yagoo', correct: false },
    ],
  },
  {
    question: 'Which song from Wicked makes Nerissa get reminded of ENReco?',
    options: [
      { name: 'No One Mourns The Wicked', correct: false },
      { name: 'What Is This Feeling', correct: false },
      { name: 'No Good Deed', correct: true },
      { name: 'Defying Gravity', correct: false },
    ],
  },
  {
    question: 'What did Liz call Nerissa on the among us stream?',
    options: [
      { name: 'Ravencroft', correct: false },
      { name: 'My Pwincess', correct: true },
      { name: 'Juliet', correct: false },
      { name: 'Rissa', correct: false },
    ],
  },
  {
    question: 'Who is Rissa’s mama?',
    options: [
      { name: 'Nekojira', correct: false },
      { name: 'EB+', correct: true },
      { name: 'rollsheeeep', correct: false },
      { name: 'Yomosaka', correct: false },
    ],
  },
  {
    question: 'Who calls Elizabeth with the name of Romeo in Enigmatic Recollection?',
    options: [
      { name: 'Roa Pandora', correct: false },
      { name: 'Shiori Nyavella', correct: false },
      { name: 'Nerissa Pickles Mustard Linkin Park Juliet Bloodflame Ravencroft', correct: true },
      { name: 'Cecilia Immerkind', correct: false },
    ],
  },
  {
    question: 'Which episode did Nerissa die in Chapter 1 of EnReco?',
    options: [
      { name: 'Episode 6', correct: true },
      { name: 'Episode 7', correct: false },
      { name: 'Episode 5', correct: false },
      { name: 'Episode 3', correct: false },
    ],
  },
  {
    question: 'Which poem did Nerissa write in Chapter 2 of EnReco?',
    options: [
      { name: 'To me, fair friend, you never can be old', correct: false },
      { name: 'Maven In Blue', correct: true },
      { name: 'O, how much more doth beauty beauteous seem', correct: false },
      { name: 'From hyou have I been absent in the spring', correct: false },
    ],
  },
  {
    question:
      'What did Elizabeth dare Nerissa to do during Nerissa’s birthday on November 21st, 2024?',
    options: [
      { name: 'I dare you to pinch Mococos cheeks', correct: false },
      { name: 'I dare you to give us a kiss', correct: false },
      { name: ' I dare you to dump Fauna', correct: true },
      { name: 'Try to touch your nose with your tongue', correct: false },
    ],
  },
  {
    question:
      'Which Episode or Day in Enigmatic Recollection when Lady Bloodflame beat Nerissa Juliet with a stick?',
    options: [
      { name: 'Episode/Day 6', correct: false },
      { name: 'Episode/Day 7', correct: false },
      { name: 'Episode/Day 8', correct: false },
      { name: 'Episode/Day 5', correct: true },
    ],
  },
  {
    question: 'What did Nerissa Mii say to Liz Mii in their confession?',
    options: [
      { name: 'Love you Queen', correct: true },
      { name: 'Pwincess', correct: false },
      { name: 'I like your vibe, Elizabeth', correct: false },
      { name: 'What is up with you?', correct: false },
    ],
  },
  {
    question:
      'True or False that Nerissa Pickles Mustard Linkin Park Juliet Bloodflame Ravencroft does not become a witch in ENReco Chapter 2?',
    options: [
      { name: 'True', correct: false },
      { name: 'False', correct: true },
    ],
  },
]
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

const correctAnswer = new Audio('public/VERYGOOD.wav')
const wrongAnswer = new Audio('public/bonktwo.mp3')
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

  border-radius: 14px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);

  cursor: pointer;
  transition: 0.25s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
  transform: translateY(-6px) scale(1.05);
  box-shadow: 0 0 20px rgba(255, 80, 120, 0.3);
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.question-nav button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.question-nav button.active {
  background: #ff4d88;
  box-shadow: 0 0 15px #ff4d88;
}

.quiz-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);

  box-shadow:
    0 0 40px rgba(255, 50, 100, 0.15),
    0 0 80px rgba(100, 150, 255, 0.08);
}
.quiz-title {
  font-size: 32px;
  margin-bottom: 20px;

  background: linear-gradient(90deg, #6fb1ff, #ff4d88);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-shadow: 0 0 20px rgba(255, 80, 120, 0.4);
}
.quiz-section {
  font-size: 22px;
  margin: 20px 0 30px;
  opacity: 0.9;
}
.quiz-page {
  position: relative;
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
</style>
