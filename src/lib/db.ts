import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseAnonKey = process.env.GATSBY_SUPABASE_KEY

const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export default supabase
