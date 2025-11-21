import express from 'express';

const router = express.Router();

// Data Mock (Sementara) - Nanti bisa diganti dengan koneksi Database/Supabase
const reviews = [
    {
        id: 1,
        movie_title: "Inception",
        review: "Film yang sangat membingungkan tapi seru!",
        rating: 5
    },
    {
        id: 2,
        movie_title: "Dune: Part Two",
        review: "Visualnya luar biasa, ceritanya epik.",
        rating: 4.8
    }
];

// GET /api/reviews - Ambil semua review
router.get('/', (req, res) => {
    res.json({
        status: "success",
        data: reviews
    });
});

// POST /api/reviews - Tambah review baru (Contoh sederhana)
router.post('/', (req, res) => {
    const newReview = req.body;
    // Di sini nanti logika simpan ke database
    console.log("Review baru diterima:", newReview);
    
    res.json({
        status: "success",
        message: "Review berhasil ditambahkan (Mock)",
        data: newReview
    });
});

export default router;