import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  ISBN: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  availabilityStatus: {
    type: Boolean,
    default: true
  }
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
