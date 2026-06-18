//src/routes/authRoutes.js

const express = require('express'); 
const router = express. Router(); 
const authController = require('../controllers/authController'); 
const { authenticate, authorize } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentikasi dan Otorisasi
 */

// Route Publik (tidak memerlukan token) 
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: yayya@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Validasi gagal atau email sudah terdaftar
 */
router.post('/register', authController.register); 

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login dan dapatkan JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: yayya@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login berhasil, mengembalikan JWT Token
 *       401:
 *         description: Email atau password salah
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/token/refresh:
 *   post:
 *     summary: Perbarui access token menggunakan refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTc4MTcyMzQwOSwiZXhwIjoxNzgyMzI4MjA5fQ.XpPLVKpgZJHtLUWIM_oNA0apWyg7D605GotfHUdsCb8
 *     responses:
 *       200:
 *         description: Token berhasil diperbarui
 *       401:
 *         description: Refresh token tidak valid
 */
router.post(
  '/token/refresh',
  authController.refreshToken
);

// Route Terproteksi (memerlukan autentikasi)

// Semua user yang sudah login dapat mengakses profil 
/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Lihat profil pengguna yang sedang login (perlu login)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Selamat datang!
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: integer
 *                       example: 1
 *                     role:
 *                       type: string
 *                       example: USER
 *       401:
 *         description: Token tidak valid
 */
router.get('/profile', authenticate, (req, res) => { 
  res.json({ message: `Selamat datang!`, user: req.user });
}); 

// Ubah password hanya untuk user yang sudah login 
/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     summary: Ubah password pengguna
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 example: passwordBaru123
 *     responses:
 *       200:
 *         description: Password berhasil diubah
 *       401:
 *         description: Token tidak valid
 */
router.put('/change-password', authenticate, authController.changePassword);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout pengguna (perlu login)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI...
 *     responses:
 *       200:
 *         description: Logout berhasil
 */
router.post(
  '/logout',
  authenticate,
  authController.logout
);

// Route Khusus Admin ===
/**
 * @swagger
 * /api/auth/admin/dashboard:
 *   get:
 *     summary: Dashboard khusus admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard admin berhasil diakses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Dashboard admin.
 *       403:
 *         description: Akses ditolak
 */
router.get('/admin/dashboard',
  authenticate, 
  authorize("ADMIN"), 
  (req, res) => { res.json({ message: "Dashboard admin." }); }
); 

// Route untuk Admin dan Moderator
/**
 * @swagger
 * /api/auth/content/review:
 *   get:
 *     summary: Review konten untuk admin dan moderator (perlu login)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Halaman review konten
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Halaman review konten.
 *       403:
 *         description: Akses ditolak
 */
router.get('/content/review',
  authenticate, 
  authorize("ADMIN", "MODERATOR"), 
  (req, res) => { res.json({ message: "Halaman review konten." }); }
); 

module.exports = router;