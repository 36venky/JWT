import Book from "../models/Book.js";

const addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

const getBooks = async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.available) {
    filter.availabilityStatus = req.query.available === "true";
  }

  const books = await Book.find(filter);
  res.json(books);
};

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
};

const updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(book);
};

const deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
};

export default {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};
