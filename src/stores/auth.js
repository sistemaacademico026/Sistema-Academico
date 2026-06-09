import { supabase } from '@/lib/supabase'
import { reactive } from 'vue'

const state = reactive({
  user: null,
  session: null,
  loading: true,
})

export function useAuth() {
  async function initSession() {
    state.loading = true
    const { data: { session } } = await supabase.auth.getSession()
    state.session = session
    state.user = session?.user ?? null
    state.loading = false

    supabase.auth.onAuthStateChange((_event, session) => {
      state.session = session
      state.user = session?.user ?? null
    })
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  function getUserRole() {
    return state.user?.user_metadata?.role ?? null
  }

  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return data
  }

  return {
    state,
    initSession,
    login,
    logout,
    signUp,
    getUserRole,
  }
}
