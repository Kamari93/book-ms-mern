import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  roll: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  checkedOutBooks: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    default: [], // ✅ Sets default to an empty array
  },
  // checkedOutBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // New field
});

const studentModel = mongoose.model("Student", studentSchema);

export { studentModel as Student };
