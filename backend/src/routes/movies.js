import express from 'express';
import supabase from '../config/supabase.js';

const router = express.Router();

// GET: Ambil semua film favorit dari Supabase
router.get('/favorites', async (req, res) => {
    const { data, error } = await supabase
        .from('favorites') // Pastikan tabel 'favorites' sudah dibuat di Supabase
        .select('*');

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST: Tambah film ke favorit
router.post('/favorites', async (req, res) => {
    const { movie_id, title, poster_path, rating } = req.body;

    const { data, error } = await supabase
        .from('favorites')
        .insert([{ movie_id, title, poster_path, rating }])
        .select();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Berhasil disimpan ke favorit", data });
});

// DELETE: Hapus dari favorit berdasarkan ID
router.delete('/favorites/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Berhasil dihapus" });
});

export default router;