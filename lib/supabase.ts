import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Server-side client (service role — use only in Server Components, API routes, etc.) */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/** Browser/client-side client (anon key — safe to use in 'use client' components) */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
