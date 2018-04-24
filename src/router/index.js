import Vue from 'vue'
import Router from 'vue-router'
import ServicesManagement from '@/ServicesManagement/Index'
import ServiceDetail from '@/ServicesManagement/ServiceDetail'
import ServiceInstance from '@/ServicesManagement/ServiceInstance'
import BillEngineDemo from '@/billengine/listviewpage'
import BillDetailEngineDemo from '@/billengine/detail'
import Login from '@/Views/Login'
import Layout from '@/Views/layout/layout'
import Index from '@/Views/index/index'
import NotFound from '@/Views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: Login
    }, {
      path: '/',
      component: Layout,
      children: [{
        name: 'Index',
        path: '',
        component: Index
      }]
    }, {
      path: '/services',
      component: Layout,
      children: [{
        name: 'ServicesManagement',
        path: '',
        component: ServicesManagement
      }, {
        path: 'detail',
        name: 'ServiceDetail',
        component: ServiceDetail
      }, {
        path: 'instace',
        name: 'ServiceInstance',
        component: ServiceInstance
      }]
    }, {
      path: '/billengine',
      component: Layout,
      children: [{
        name: 'BillEngineDemo',
        path: '',
        component: BillEngineDemo
      }, {
        name: 'BillDetailEngineDemo',
        path: 'detail',
        component: BillDetailEngineDemo
      }]
    }, {
      path: '*',
      component: NotFound
    }
  ]
})
