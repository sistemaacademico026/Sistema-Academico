<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const { state, logout, initSession } = useAuth()
const loading = ref(false)

onMounted(async () => {
  await initSession()
})

async function handleLogout() {
  loading.value = true
  try {
    await logout()
    router.push('/login')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Panel de Administración</h1>
      <div class="header-right">
        <span class="user-email">{{ state.user?.email }}</span>
        <button class="btn-logout" :disabled="loading" @click="handleLogout">
          {{ loading ? 'Saliendo...' : 'Cerrar sesión' }}
        </button>
      </div>
    </header>
    <main class="dashboard-content">
      <div class="welcome-card">
        <h2>Bienvenido al Sistema Académico</h2>
        <p>Aquí podrás gestionar el control de asistencia de los alumnos.</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  position: fixed;
  inset: 0;
  background: #0f172a;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.dashboard-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

.btn-logout {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-logout:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.btn-logout:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dashboard-content {
  padding: 2rem;
}

.welcome-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 2rem;
  max-width: 640px;
}

.welcome-card h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fff;
}

.welcome-card p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}
</style>
