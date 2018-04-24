// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Global_ from './Global.vue'
import '@/utils/auth.js'
import { getToken } from './utils/auth'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = Global_
Vue.prototype.router = router
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  var token = getToken()
  console.log(token)
  if (getToken()) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
