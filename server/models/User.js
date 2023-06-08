const mongoose = require("mongoose");
const validator = require("validator");

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid Email");
        }
      },
    },
    mobileNumber:{
      type: Number,
      required: true
    },
    password: {
      type: String,
      required: [true, "Password is required field"],
      validate(value) {
        if (!validator.isLength(value, { min: 6 , max: 100 })) {
          throw new Error("length of the password should be between 6-100");
        }
        if (value.toLowerCase().includes("password")) {
          throw new Error(
            "The password should not contain the keyword 'password'!"
          );
        }
      },
    },
    image: {
      type: String
    },
    // roles: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Role",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
