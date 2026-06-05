//src/routes/authRoutes.js

const express = require('express'); 
const router = express. Router(); 
const authController = require('../controllers/authController'); 
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Route Publik (tidak memerlukan token) 
router.post('/register', authController.register); 
router.post('/login', authController.login);
router.post(
  '/token/refresh',
  authController.refreshToken
);

// Route Terproteksi (memerlukan autentikasi)

// Semua user yang sudah login dapat mengakses profil 
router.get('/profile', authenticate, (req, res) => { 
  res.json({ message: `Selamat datang!`, user: req.user });
}); 

// Ubah password hanya untuk user yang sudah login 
router.put('/change-password', authenticate, authController.changePassword);
router.post(
  '/logout',
  authenticate,
  authController.logout
);

// Route Khusus Admin ===
router.get('/admin/dashboard',
  authenticate, 
  authorize("ADMIN"), 
  (req, res) => { res.json({ message: "Dashboard admin." }); }
); 

// Route untuk Admin dan Moderator
router.get('/content/review',
  authenticate, 
  authorize("ADMIN", "MODERATOR"), 
  (req, res) => { res.json({ message: "Halaman review konten." }); }
); 

module.exports = router;