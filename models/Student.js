const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    class: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    age: {
      type: Number
    },
    roll: {
      type: String
    },
    profile_pic: {
      data: Buffer,
      contentType: String
    },
    phone: {
      type: Number,
      maxlength: 10
    },
    address: {
      type: String
    },
    mealType: {
      type: String,
      default: "N/A"
    },
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
