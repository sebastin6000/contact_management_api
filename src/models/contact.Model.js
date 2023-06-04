import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name should be mandatory "],
    },
    email: {
      type: String,
      required: [true, " email should be mandatory "],
    },
    phone: {
      type: String,
      required: [true, " Phone Number should be mandatory "],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", contactSchema);
