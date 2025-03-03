import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  totalCopies: {
    type: Number,
    default: 1,
    min: 1,
    max: 3,
  },
});

const bookModel = mongoose.model("Book", bookSchema);

export { bookModel as Book };
