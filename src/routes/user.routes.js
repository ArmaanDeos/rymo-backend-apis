import { Router } from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifytoken.middlewares.js";
import {
  deletUser,
  getAllUsers,
  getUser,
  getUserStats,
  updateUser,
} from "../controllers/user.controllers.js";
const router = Router();

router.route("/:id").put(verifyTokenAndAuthorization, updateUser);

router.route("/:id").delete(verifyTokenAndAuthorization, deletUser);

router.route("/find/:id").get(verifyTokenAndAdmin, getUser);

router.route("/").get(getAllUsers);

router.route("/stats").get(verifyTokenAndAdmin, getUserStats);

export default router;
