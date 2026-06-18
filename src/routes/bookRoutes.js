const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/authMiddleware");

const {
  getAllBooks,
  createBook,
  getBookById,
  searchBook,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Manajemen Buku
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Ambil semua buku (publik)
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data buku
 */

router.get("/", getAllBooks);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Cari buku berdasarkan judul (publik)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Judul buku yang dicari
 *     responses:
 *       200:
 *         description: Hasil pencarian buku
 *       404: 
 *         description: Buku tidak ditemukan
 */

router.get("/search", searchBook);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Ambil buku berdasarkan ID (publik)
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detail buku
 *       404:
 *         description: Buku tidak ditemukan
 */

router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tambah buku baru (perlu login)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 example: OBH COMBI SACHET
 *               author:
 *                 type: string
 *                 example: Uhukuhuk
 *               price:
 *                 type: integer
 *                 example: 150000
 *               stock:
 *                 type: integer
 *                 example: 10
 *           example:
 *             title: OBH COMBI SACHET
 *             author: Uhukuhuk
 *             price: 150000
 *             stock: 10
 *     responses:
 *       201:
 *         description: Buku berhasil ditambahkan
 *       401:
 *         description: Token tidak valid
 *       400: 
 *         description: Validasi gagal
 */
router.post("/", authenticate, createBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update buku (perlu login)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: integer
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil diperbarui
 *       401:
 *         description: Token tidak valid
 *       404:
 *         description: Buku tidak ditemukan
 */
router.put("/:id", authenticate, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Hapus buku (perlu login)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Buku berhasil dihapus
 *       401:
 *         description: Token tidak valid
 *       404:
 *         description: Buku tidak ditemukan
 */
router.delete("/:id", authenticate, deleteBook);

module.exports = router;