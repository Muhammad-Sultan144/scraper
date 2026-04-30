import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wapscbzikpiukhwzcyfy.supabase.co'
const supabaseAnonKey = 'sb_publishable__nT3nM77Rvjt-pIv5Cn_SQ_TZVvVweF'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
