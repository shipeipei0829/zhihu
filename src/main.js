// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/icon/iconfont.css'

Vue.prototype.ev=new Vue();
Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.ev=new Vue();
//axios
import axios from 'axios'
Vue.prototype.$http = axios

//公共组件
import commonComponents from './components/common'
for (var i in commonComponents) {
  Vue.component(i, commonComponents[i])
}

//过滤器
// import Filter from './filter/index'
// for (var i in Filter) {
//   Vue.filter(i, Filter[i])
// }


import * as filters from './filter/index' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
