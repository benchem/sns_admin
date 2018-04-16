import Vue from 'vue'
import Router from 'vue-router'
import ServicesManagement from '@/components/ServicesManagement'
import ServiceDetail from '@/ServicesManagement/ServiceDetail'
import ServiceInstance from '@/ServicesManagement/ServiceInstance'
import BillEngineDemo from '@/billengine/demo'
import BillDetailEngineDemo from '@/billengine/detail'

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
    },
    {
      path: '/services/instace',
      name: 'ServiceInstance',
      component: ServiceInstance
    },
    {
      path: '/billengine/demo',
      name: 'BillEngineDemo',
      component: BillEngineDemo
    },
    {
      path: '/billengine/detail',
      name: 'BillDetailEngineDemo',
      component: BillDetailEngineDemo
    }
  ]
})
