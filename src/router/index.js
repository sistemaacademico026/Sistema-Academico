import { createRouter, createWebHistory } from 'vue-router'
import PaginaInicio from '@/views/PaginaInicio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
})

export default router
