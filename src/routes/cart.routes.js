import { Router } from "express";
const router = Router();
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifytoken.middlewares.js";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getUserCart,
  updateCart,
} from "../controllers/cart.controllers.js";

router.route("/").post(verifyToken, createCart);

router.route("/:id").put(verifyTokenAndAuthorization, updateCart);

router.route("/:id").delete(verifyTokenAndAuthorization, deleteCart);

router.route("/find/:id").get(verifyTokenAndAuthorization, getUserCart);

router.route("/").get(verifyTokenAndAdmin, getAllCarts);

export default router;
