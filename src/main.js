import Vue from 'vue'
import Main from './components/Main.vue'
import router from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
import Mock from './mock'
Mock.bootstrap();

Vue.use(ElementUI)
Vue.use(Vuex)

router.beforeEach((to, from, next) => {
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('user');
  // }
  // let user = JSON.parse(sessionStorage.getItem('user'));
  // if (!user && to.path != '/login') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }

  next()

})

// const app = new Vue({
//   el: '#app',
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       const matchingView = router[this.currentRoute]
//       return matchingView
//         ? require('./pages/' + matchingView + '.vue')
//         : require('./pages/404.vue')
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
// })

const app = new Vue({
  // el: '#app',
  router,
  store,
  data: {
    currentRoute: window.location.pathname
  },
  render: h => h(Main)
}).$mount('#app')

// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })
