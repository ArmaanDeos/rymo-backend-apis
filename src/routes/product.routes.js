import { Router } from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifytoken.middlewares.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  updateProduct,
} from "../controllers/product.controllers.js";
const router = Router();

router.route("/").post(verifyTokenAndAdmin, createProduct);

router.route("/:id").put(verifyTokenAndAdmin, updateProduct);

router.route("/:id").delete(verifyTokenAndAdmin, deleteProduct);

router.route("/find/:id").get(getProducts);

router.route("/").get(getAllProducts);

export default router;
