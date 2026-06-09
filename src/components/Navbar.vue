<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <nav class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <img src="@/images/CCGLOGO.png" alt="Centro Cultural Gymmart" class="logo-icon" />
        <span class="logo-text">Centro Cultural Gymmart</span>
      </router-link>
      <button v-if="route.path === '/'" class="btn-login" @click="router.push('/login')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
          <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3" />
        </svg>
        <span>Iniciar sesión</span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.navbar-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  user-select: none;
  text-decoration: none;
}

.logo-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.logo-text {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #000000;
}

.btn-login {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: 8px;
  background: #004aad;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  text-decoration: none;
}

.btn-login:hover {
  background: #022451;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 74, 173, 0.3);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .logo-text {
    font-size: 0.8125rem;
  }

  .btn-login span {
    display: none;
  }

  .btn-login {
    padding: 0.625rem;
  }
}
</style>
