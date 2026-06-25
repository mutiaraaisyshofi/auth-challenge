const prisma = require("../config/prisma");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();

    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.searchBook = async (req, res) => {
  try {
    const { title } = req.query;

    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title || "",
          mode: "insensitive"
        }
      }
    });

    res.status(200).json({
      success: true,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid"
      });
    }

    const book = await prisma.book.findUnique({
      where: { id }
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan"
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, price, stock } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        stock
      }
    });

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid"
      });
    }

    const existingBook = await prisma.book.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan"
      });
    }

    const { title, author, price, stock } = req.body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        price,
        stock
      }
    });

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID tidak valid"
      });
    }

    const existingBook = await prisma.book.findUnique({
      where: { id }
    });

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan"
      });
    }

    await prisma.book.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: "Buku berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};