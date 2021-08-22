import { createRouter, createWebHistory } from 'vue-router'
import Frete from '../views/Frete.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Frete,
  },
  // {
  //   path: '/frete/',
  //   name: 'Info',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "info" */ '../views/Frete.vue'),
  // },
  // {
  //   path: '/frete/:id',
  //   name: 'Frete single',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "info" */ '../views/Frete.vue'),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
