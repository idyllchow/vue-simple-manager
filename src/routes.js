// export default {
//   '/': 'Home',
//   '/upgrade': 'Upgrage',
//   '/about': 'About'
// }
import Main from './components/Main.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import NotFound from './components/404.vue'
import Deploy from './components/Deploy.vue'
import About from './components/About.vue'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routers = new VueRouter({
	routes:[
	{
        path: '/login',
        component: Login
    },
	{
		path: '/',
		component: Home,
		children: [
		{ path: 'home', component: Home },
        { path: 'deploy', component: Deploy },
        { path: 'about', component: About},
        ]
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