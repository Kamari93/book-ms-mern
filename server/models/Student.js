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
});

const studentModel = mongoose.model("Student", studentSchema);

export { studentModel as Student };
