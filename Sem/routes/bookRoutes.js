import express from "express";
import auth from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.post("/", auth, isAdmin, bookController.addBook);
router.get("/", auth, bookController.getBooks);
router.get("/:id", auth, bookController.getBookById);
router.put("/:id", auth, isAdmin, bookController.updateBook);
router.delete("/:id", auth, isAdmin, bookController.deleteBook);

export default router;
