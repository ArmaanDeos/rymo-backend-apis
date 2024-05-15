import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";

const verifyToken = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ApiError(401, "Please login to access this resource"));
  }

  try {
    const decodedData = jwt.verify(
      String(token),
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = await User.findById(decodedData._id);
    if (!req.user) {
      return next(new ApiError(401, "User not found"));
    }
    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized"));
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  await verifyToken(req, res, async (error) => {
    if (error) {
      return next(error);
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    }
    return next(new ApiError(403, "You are not allowed to do that"));
  });
};

const verifyTokenAndAdmin = async (req, res, next) => {
  await verifyToken(req, res, async (error) => {
    if (error) {
      return next(error);
    }
    if (req.user.isAdmin) {
      return next();
    }
    return next(new ApiError(403, "You are not allowed to do that"));
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
