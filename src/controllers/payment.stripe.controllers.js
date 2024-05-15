// import Stripe from "stripe";
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// import { asyncHandler } from "../utils/AsyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// export const getPaymentGateway = asyncHandler(async (req, res) => {
//   try {
//     const charge = await stripe.charges.create({
//       source: req.body.tokenId,
//       amount: req.body.amount,
//       currency: "usd",
//     });

//     res.status(200).json(new ApiResponse(200, charge, "Payment successfully."));
//   } catch (error) {
//     console.log(`Error while getting payment gateway:`, error);
//     res.status(500).json(new ApiError(500, error.message));
//   }
// });
