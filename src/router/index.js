import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/views/PaginaInicio.vue'
import { supabase } from '@/lib/supabase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/SimpleLogin.vue'),
    },
    {
      path: '/Inicio',
      name: 'inicio',
      component: PaginaInicio,
    },
    {
      path: '/Registro',
      name: 'registro',
      component: () => import('@/views/RegistroUsuarios.vue'),
    },
    {
      path: '/Estudiantes',
      name: 'estudiantes',
      component: () => import('@/views/EstudiantesInicio.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminDashboard.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
