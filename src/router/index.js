import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChronicleHub from '../views/ChronicleHub.vue'
import Chronicle from '../views/Chronicle.vue'
import Clips from '../views/Clips.vue'
import QuizView from '@/views/QuizView.vue'

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

export default router
