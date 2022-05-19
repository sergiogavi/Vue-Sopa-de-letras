import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import game from '@/components/game'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },

    {
      path: '/game',
      name: 'game',
      component: game
    }
  ]
})
