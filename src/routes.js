// export default {
//   '/': 'Home',
//   '/upgrade': 'Upgrage',
//   '/about': 'About'
// }
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import AutoConfig from './components/AutoConfig.vue'
import NotFound from './components/404.vue'
import Deploy from './components/Deploy.vue'
import About from './components/About.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

import preview_mobile from './components/preview_mobile.vue'
import preview_product from './components/preview_product.vue'


Vue.use(VueRouter)

const routers = new VueRouter({
	routes:[
	{
        path: '/login',
        name: 'login',
        component: Login
    },
	{
		path: '/',
		name: 'home',
		component: Home,
		// children: [
		// { path: '', component: AutoConfig },
  //       { path: 'deploy', component: Deploy },
  //       { path: 'about', component: About},
  //       ]
	},  
    {
        path: '/preview/mobile',//手机预览
        name: 'preview_mobile',
        component: preview_mobile
    }, 
    {
        path: '/preview/pc/',//正常pc浏览
        name: 'preview_product',
        component: preview_product
    }, 
    {
        path: '/preview/pc/:id',//指定布局的正常pc浏览
        component:  preview_product
    },
	{
		path: '/404',
        component: NotFound,
        name: ''
	}
	// {
	// 	path: '/about',
 //        component: Home,
 //        name: '投诉管理',
 //        iconCls: 'el-icon-message',//图标样式class
 //        children: [
 //        { path: 'version', component: Version, name: 'Table' },
 //        { path: 'about', component: About, name: 'Info列表' },
 //        ]
	// }
	]
})

export default routers;