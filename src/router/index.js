import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(
  (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // if route requires auth and user isn't authenticated
      if (store.state.auth.isLogin === false){
        let query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath }
        next(
          {
            path: '/login',
            query: query
          }
        )
        return
      }
    }
    next()
  }
)

export default router