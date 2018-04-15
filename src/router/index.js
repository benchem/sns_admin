import Vue from 'vue'
import Router from 'vue-router'
import ServicesManagement from '@/components/ServicesManagement'
import ServiceDetail from '@/ServicesManagement/ServiceDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ServicesManagement',
      component: ServicesManagement
    },
    {
      path: '/services/detail',
      name: 'ServiceDetail',
      component: ServiceDetail
    }
  ]
})
