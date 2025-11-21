import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Pastikan kedua variabel ini tidak undefined
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL dan Key harus diisi di file .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- INI BARIS YANG MUNGKIN HILANG ---
export default supabase;