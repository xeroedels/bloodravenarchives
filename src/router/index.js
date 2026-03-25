import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChronicleHub from '../views/ChronicleHub.vue'
import Chronicle from '../views/Chronicle.vue'
import Clips from '../views/Clips.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
