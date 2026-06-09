<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref('')
const estudiante = ref(null)

onMounted(async () => {
  await cargarEstudiante()
})

async function cargarEstudiante() {
  loading.value = true
  error.value = ''
  try {
    const id = route.params.id
    const { data, error: err } = await supabase
      .from('alumnos')
      .select('*')
      .eq('id', id)
      .single()

    if (err) throw err
    estudiante.value = data
  } catch (e) {
    error.value = 'Error al cargar el perfil del estudiante'
    console.error(e)
  } finally {
    loading.value = false
  }
}

function volver() {
  router.push('/Estudiantes')
}
</script>

<template>
  <div class="profile-page">
    <header class="profile-header">
      <button class="btn-back" @click="volver">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="back-icon">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver
      </button>
      <h1>Perfil del Estudiante</h1>
    </header>

    <main class="profile-content">
      <transition name="fade" mode="out-in">
        <div v-if="loading" key="loading" class="loading-state">
          <div class="spinner" />
          <p>Cargando perfil...</p>
        </div>

        <div v-else-if="error" key="error" class="error-state">
          <p>{{ error }}</p>
        </div>

        <div v-else-if="estudiante" key="profile" class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-placeholder">
              {{ estudiante.nombre?.charAt(0)?.toUpperCase() }}
            </div>
          </div>

          <div class="profile-name">
            <h2>{{ estudiante.nombre }}</h2>
            <span class="matricula-badge">{{ estudiante.matricula }}</span>
          </div>

          <div class="info-grid">
            <div class="info-item">
              <label>Correo electrónico</label>
              <div class="info-value">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="info-icon">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{{ estudiante.email }}</span>
              </div>
            </div>

            <div class="info-item">
              <label>Teléfono</label>
              <div class="info-value">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="info-icon">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{{ estudiante.telefono || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<style scoped>
.profile-page {
  position: fixed;
  inset: 0;
  background: #000000;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-y: auto;
  padding-top: 82px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #022451;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.profile-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.btn-back:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.back-icon {
  width: 16px;
  height: 16px;
}

.profile-content {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.5);
}

.spinner {
  width: 24px;
  height: 24px;
  margin: 0 auto 1rem;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-top-color: #004aad;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.profile-card {
  width: 100%;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #004aad, #022451);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

.profile-name {
  text-align: center;
}

.profile-name h2 {
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 0.375rem;
}

.matricula-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(0, 74, 173, 0.1);
  border: 1px solid rgba(0, 74, 173, 0.2);
  border-radius: 999px;
  font-size: 0.8125rem;
  color: #004aad;
  font-weight: 500;
}

.info-grid {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.info-item label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #a6a6a6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.85);
}

.info-icon {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
