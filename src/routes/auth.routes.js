import { Router } from "express";
import { loginUser, registerUser ,logoutUser} from "../controllers/auth.controllers.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
export default router;
