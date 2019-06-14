import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import index from '../components/pages/index.vue'
import news from '../components/pages/news.vue'
import pinglun from '../components/pages/pinglun.vue'
import collection from '../components/pages/collection.vue'
export default new Router({
  routes: [
    {
      path:'/index',
      component:index
    },
    {
      path:'/news/:id',
      component:news
    },
    {
      path:'/pinglun/:id',
      component:pinglun
    },
    {
      path:'/collection',
      component:collection
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
