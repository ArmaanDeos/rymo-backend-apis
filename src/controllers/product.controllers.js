import { Product } from "../models/product.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// ? CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  const { title, desc, img, categories, size, color, price } = req.body;

  const newProduct = await Product.create({
    title,
    desc,
    img,
    categories,
    size,
    color,
    price,
  });

  if (!newProduct) {
    throw new ApiError(500, "Product not created.");
  }

  res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product created successfully."));
});

// ? UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updateProduct) {
    throw new ApiError(404, "Product not found.");
  }
  res
    .status(201)
    .json(new ApiResponse(201, updateProduct, "Product updated successfully."));
});

// ? DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deleteProduct) {
    throw new ApiError(404, "Product not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deleteProduct, "Product deleted successfully."));
});

// ? GET PRODUCTS
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.findById(req.params.id);

  if (!products) {
    throw new ApiError(404, "Product not found.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully."));
});

// ? GET ALL PRODUCTS
const getAllProducts = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  let products;
  if (qNew) {
    products = await Product.find().sort({ createdAt: -1 }).limit(1);
  } else if (qCategory) {
    products = await Product.find({ categories: { $in: [qCategory] } });
  } else {
    products = await Product.find();
  }
  res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully."));
});

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getAllProducts,
};
