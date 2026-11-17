import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseIsConfigured = Boolean(supabaseUrl && supabaseAnonKey)
export const supabase = supabaseIsConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
