import { Router } from "express";
const router = Router();

import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifytoken.middlewares.js";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getUserOrder,
  updateOrder,
  getMonthlyIncome,
} from "../controllers/order.controllers.js";

router.route("/").post(verifyToken, createOrder);

router.route("/:id").put(verifyTokenAndAdmin, updateOrder);

router.route("/:id").delete(verifyTokenAndAdmin, deleteOrder);

router.route("/find/:id").get(verifyTokenAndAuthorization, getUserOrder);

router.route("/").get(verifyTokenAndAdmin, getAllOrders);

router.route("/income").get(verifyTokenAndAdmin, getMonthlyIncome);

export default router;
