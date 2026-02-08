import Auth from '@/views/Auth.vue'
import HomeView from '@/views/HomeView.vue'
import Reg from '@/views/Reg.vue'
import { authService } from '@/service/authService'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      component: Auth,
      meta: {requiresGuest: true}
    },
    {
      path: '/reg',
      component: Reg,
      meta: {requiresGuest: true}
    },
    {
      path: '/home',
      component: HomeView,
      meta: {requiresAuth: true} 
    }

  ],
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    const isAuthenticate = authService.isValidToken()
    
    if (requiresAuth && !isAuthenticate) {
        // Если требуется авторизация и токена нет
        next('/auth')
    } else if (requiresGuest && isAuthenticate) {
        // Если пользователь уже авторизован и пытается зайти на страницу авторизации
        next('/home')
    } else {
        next()
    }
    setInterval(()=>{
      if(authService.isTokenExp() && router.currentRoute.value.meta.requiresAuth){
        authService.removeToken()
        router.push('/auth')
      }
    },10000)

})
export default router
