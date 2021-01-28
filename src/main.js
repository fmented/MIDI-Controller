import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import './assets/midifont.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.mixin({
  computed:{
    $touch(){
      return navigator.maxTouchPoints > 0
    }
  },
  methods:{
    $random_vel(){
      return Math.floor(Math.random()*(128-68))+68
  },
  }
})