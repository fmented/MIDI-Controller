import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Play.vue'),
    children:[
      {
        path: '',
        name: 'App',
        component: ()=> import('../components/Instruments.vue')
      },
      {
        path: 'piano',
        name: 'Piano',
        component: ()=> import('../components/PianoKey.vue')
      },
      {
        path: 'drum',
        name: 'Drum',
        component: ()=> import('../components/Drum.vue')
      },
      {
        path: 'launchpad',
        name: 'Launchpad',
        component: ()=> import('../components/LaunchPad.vue')
      },
      {
        path: 'mixer',
        name: 'Mixer',
        component: ()=> import('../components/Mixer.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
