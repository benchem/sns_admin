import { getToken } from '@/utils/auth.js'

export function getMemus () {
  var token = getToken()
  console.log(token)
  return [
    {
      index: 10,
      name: 'channel-scm',
      caption: '供应链',
      groups: [
        {
          index: 1010,
          name: 'group-stockwork-inoutworkplan',
          caption: '出入库计划',
          functions: [
            {
              index: 101010,
              name: 'scm_seorder',
              caption: '销售订单',
              component: '/billengine',
              args: {}
            },
            {
              index: 101020,
              name: 'scm_moorder',
              caption: '生产订单',
              component: '/billengine',
              args: {}
            }
          ]
        }, {
          index: 1020,
          name: 'group-stockwork-inoutwork',
          caption: '出入库单'
        }
      ]
    }, {
      index: 90,
      name: 'channel-settings',
      caption: '系统管理',
      groups: [
        {
          index: 9010,
          name: 'group-settings-microservice',
          caption: '微服务管理',
          functions: [
            {
              index: 901010,
              name: 'serviceManager',
              caption: '微服务管理',
              component: '/services',
              args: {}
            }
          ]
        }
      ]
    }
  ]
}
