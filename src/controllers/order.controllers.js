import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Order } from "../models/order.models.js";
// import { getLastMonth } from "../utils/helper.js";

// ? CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
  const { userId, products, productId, quantity, amount, address, status } =
    req.body;

  const newOrder = await Order.create({
    userId,
    products,
    productId,
    quantity,
    amount,
    address,
    status,
  });

  if (!newOrder) {
    throw new ApiError(500, "Order not created.");
  }
  res
    .status(201)
    .json(new ApiResponse(200, newOrder, "Order created successfully."));
});

// ? UPDATE ORDER
const updateOrder = asyncHandler(async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  );

  if (!updatedOrder) {
    throw new ApiError(500, "Order not updated.");
  }
  res
    .status(200)
    .json(new ApiResponse(200, updatedOrder, "Order updated successfully."));
});

// ? DELETE ORDER
const deleteOrder = asyncHandler(async (req, res) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  if (!deletedOrder) {
    throw new ApiError(500, "Order not deleted.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedOrder, "Order deleted successfully."));
});

// ? GET USER ORDER
const getUserOrder = asyncHandler(async (req, res) => {
  const userOrder = await Order.find({ userId: req.params.userId });

  if (!userOrder) {
    throw new ApiError(500, "Order not found.");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userOrder, "Order fetched successfully."));
});

// ? GET ALL ORDER
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  if (!orders || orders.length === 0) {
    // If no orders found
    return res.status(404).json(new ApiError(404, "No orders found."));
  }

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully."));
});

// ? GET MONTHLY INCOME
const getMonthlyIncome = asyncHandler(async (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && {
          products: { $elemMatch: { productId } },
        }),
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ]);

  if (!income) throw new ApiError(404, "No income found.");
  res
    .status(200)
    .json(new ApiResponse(200, income, "Order stats fetched successfully."));
});

export {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyIncome,
};
