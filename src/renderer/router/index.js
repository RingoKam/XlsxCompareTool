import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/Files')
    },
    {
      path: '/Compare/:index/file/:filename',
      name: 'Compare',
      component: require('@/components/Compare'),
      props: true
    },
    {
      path: '*',
      redirect: '/file'
    }
  ]
})
