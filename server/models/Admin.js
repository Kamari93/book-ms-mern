import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminModel = mongoose.model("Admin", adminSchema);

export { adminModel as Admin };
