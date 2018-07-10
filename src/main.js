import Vue from 'vue'
import Main from './components/Main.vue'
import router from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex/store'
import Vuex from 'vuex'
import Mock from './mock/mock'
Mock.bootstrap();
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import ElUpload from 'element-upload'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
//为代码文本提供高亮、缩进
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

import pretty from 'pretty'
Vue.prototype.$prettyDom = pretty


import './assets/css/global.css'
// import '@/assets/css/theme-dark.css'
Vue.use(MuseUI)

Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(Vuex)
Vue.component('el-upload', ElUpload)

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }

  // next()

})


// const app = new Vue({
//   // el: '#app',
//   router,
//   store,
//   data: {
//     currentRoute: window.location.pathname
//   },
//   components: {Main},
//   render: h => h(Main)
// }).$mount('#app')

window._Vue = new Vue({
    el: '#app',
    store,
    router,
    data: {
      currentRoute: window.location.pathname
    },
    template: '<Main/>',
    components: { Main }
})

