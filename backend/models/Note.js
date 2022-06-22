import mongoose from "mongoose";
const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
      min: 3,
    },
    description: {
      type: String,
      min: 3,
    },
    tag: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("note", noteSchema);
