import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    userName: {
      type: String,
      required: [true, "username is mandatory"],
    },
    email: {
      type: String,
      required: [true, "email address is mandatory"],
      unique: [true, "email address already used "],
    },
    password: {
      type: String,
      required: [true, "password is mandatory"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
