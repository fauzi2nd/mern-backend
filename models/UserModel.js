import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"
import { isEmail, isPhone } from "../utility/Validator.js";

const User = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 100,
      trim: true,
      uppercase: true,
      required: true,
      match: /^(?!\s*$).+/,
    },
    email: {
      type: String,
      minlength: 5,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
      validate: isEmail,
    },
    username: {
      type: String,
      minlength: 5,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      index: {
        unique: true,
        dropDups: true,
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "User phone number required"],
      index: {
        unique: true,
        dropDups: true,
      },
      validate: isPhone,
    },
    roles: {
      type: String,
      enum: ["Super Admin", "Admin", "User"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

User.plugin(uniqueValidator)

export default mongoose.model("Users", User);
