import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: { type: String },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* -------------------------------------------------------------------------- */
/*                              // ? Custom Hooks                             */
/* -------------------------------------------------------------------------- */

userSchema.pre("save", async function (next) {
  const user = this;
  // check is password is modified or a new user is created
  if (!user.isModified("password")) return next();
  try {
    const hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// ! Methods to Compare Password during Authentication

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    // Use bcrypt to compare password with hashed password.
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new ApiError(400, "Password is incorrect");
  }
};

userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    }
  );
};

// // ! Methods to Generate Refresh Token
// userSchema.methods.generateRefreshToken = function () {
//   try {
//     return jwt.sign(
//       {
//         _id: this._id,
//       },
//       process.env.REFRESH_TOKEN_SECRET,
//       {
//         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
//       }
//     );
//   } catch (error) {
//     console.error("Error generating refresh token:", error);
//     throw new Error("Error generating refresh token");
//   }
// };

export const User = mongoose.model("User", userSchema);
