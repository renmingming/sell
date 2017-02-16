// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
 import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods'
import Ratings from './components/ratings/ratings'
import Seller from './components/seller/seller.vue'

import './common/style/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */  // 这条注释是让下面跳过一些规则
/* new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}) */
const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller}
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')

router.push('/goods') // 指定路由地址为/ 时的加载组件
