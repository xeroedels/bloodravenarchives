import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChronicleHub from '../views/ChronicleHub.vue'
import Chronicle from '../views/Chronicle.vue'
import Clips from '../views/Clips.vue'
import QuizView from '@/views/QuizView.vue'
import { isLoading, loadingMessage } from '@/loadingState'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/hub',
    name: 'ChronicleHub',
    component: ChronicleHub,
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Chronicle,
  },
  {
    path: '/clips',
    name: 'Clips',
    component: Clips,
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: QuizView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const routeMessages = {
    Home: 'Initializing BloodRaven Archive...',

    ChronicleHub: 'Accessing Chronicle Gateway...',

    Archive: 'Reconstructing Timeline...',

    Clips: 'Loading Clips Records...',

    Quiz: 'Preparing BloodRaven Quiz...',
  }

  loadingMessage.value = routeMessages[to.name] || 'Accessing BloodRaven Systems...'

  isLoading.value = true

  setTimeout(() => {
    next()
  }, 1800)
})
router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})
export default router
