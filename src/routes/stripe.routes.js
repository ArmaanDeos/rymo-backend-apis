import { Router } from "express";
import { stripeGateway } from "../controllers/stripe.payment.js";
const router = Router();

router.route("/payment").post(stripeGateway);

export default router;
