import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { generateAccessToken } from "../middlewares/token.middleware.js";

// ? GENERATE ACCESS TOKEN AND REFRESH TOKEN
// const generateAccessAndRefreshToken = async (userId) => {
//   try {
//     const user = await User.findById(userId);
//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({ validateBeforeSave: false });

//     return { accessToken, refreshToken };
//   } catch (error) {
//     throw new ApiError(
//       500,
//       "Something went wrong while generating access and refresh token."
//     );
//   }
// };

// ? REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
  // GET USER DETAILS
  const { username, email, password, isAdmin } = req.body;

  // VALIDATE ALL FIELDS ARE REQUIRED
  // Method 1
  //   if (!username || !email || !password) {
  //     throw new ApiError(400,"All fields are required");
  //   }
  //Method 2
  if ([username, email, password].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // CHECK FOR EXISTED USER
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(400, "Username or email is already exist");
  }

  // CREATE USER OBJECT - CREATE ENTRY IN DB
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    isAdmin,
  });

  // REMOVE PASSWORD FIELD FROM DB
  const createdUser = await User.findById(user._id).select("-password");

  // CHECK USER IS CREATED OR NOT
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while register a user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Registration successfull."));
});

// ? LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
  /*
  TODO :
  1.take data from user (req.body)
  2.validation username and email
  3.find user
  4.password check
  5.access and refresh token gene
  6.send cookies
  7.send res
  */

  // user info and validation
  const { username, email, password } = req.body;
  // if (!username && !email) {
  //   throw new ApiError(401, "All fields are required");
  // }
  if (!username || !email) {
    throw new ApiError(400, "All fields are required");
  }

  // finde user exist or not
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  // check is password is valid or not
  const isValidPassword = await user.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Password is incorrect");
  }

  // const accessToken = jwt.sign(
  //   {
  //     id: user._id,
  //     isAdmin: user.isAdmin,
  //   },
  //   process.env.ACCESS_TOKEN_SECRET,
  //   {
  //     expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  //   }
  // );

  // get logged user and remove password
  // const loggedInUser = await User.findById(user._id).select("-password");

  // // var { password, ...others } = user._doc;

  // // set cookies options
  // const options = {
  //   httpOnly: true,
  //   secure: true,
  // };

  // return res
  //   .status(200)
  //   .cookie("accessToken", accessToken, options)

  //   .json(
  //     new ApiResponse(
  //       200,
  //       { user: loggedInUser, accessToken },
  //       "User Logged In successfully."
  //     )
  //   );

  generateAccessToken(user, 200, res);
});

const logoutUser = asyncHandler(async (req, res) => {
  // Set cookie with an expiration date in the past to clear it
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out Successfully",
  });
});

export { registerUser, loginUser, logoutUser };
