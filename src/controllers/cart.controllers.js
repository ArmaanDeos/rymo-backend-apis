import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../models/cart.models.js";

// ? CREATE CART
const createCart = asyncHandler(async (req, res) => {
  const newCart = await Cart.save(req.body);

  if (!newCart) {
    throw new ApiError(500, "Cart not created.");
  }
  res
    .status(201)
    .json(new ApiResponse(200, newCart, "Cart created successfully."));
});

// ? UPDATE CART
const updateCart = asyncHandler(async (req, res) => {
  const updatedCart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedCart) {
    throw new ApiError(500, "Cart not updated.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Cart updated successfully."));
});

// ? DELETE CART
const deleteCart = asyncHandler(async (req, res) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);

  if (!deletedCart) {
    throw new ApiError(500, "Cart not deleted.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedCart, "Cart deleted successfully."));
});

// ? GET USER CART
const getUserCart = asyncHandler(async (req, res) => {
  const userCart = await Cart.findOne({ userId: req.params.userId });

  if (!userCart) {
    throw new ApiError(500, "Cart not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userCart, "Cart fetched successfully."));
});

// ? GET ALL CARTS
const getAllCarts = asyncHandler(async (req, res) => {
  const carts = await Cart.find();

  if (!carts) {
    throw new ApiError(500, "Carts not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, carts, "Carts fetched successfully."));
});

export { createCart, updateCart, deleteCart, getUserCart, getAllCarts };
