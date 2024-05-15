// // Importing the Stripe library
// import Stripe from "stripe";

// // Initializing the Stripe instance with the secret key from environment variables
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // Defining an asynchronous function named stripeGateway that takes request and response objects
// export const stripeGateway = async (req, res) => {
//   try {
//     // Attempting to create a charge using the Stripe API
//     const charge = await stripe.charges.create(
//       {
//         // Setting the payment source (token ID) from the request body
//         source: req.body.tokenId,
//         // Setting the amount to charge from the request body
//         amount: req.body.amount,
//         // Specifying the currency (here, USD) for the charge
//         currency: "usd",
//       },
//       // Callback function for handling the response from Stripe
//       (stripeErr, stripeRes) => {
//         // If there is an error from Stripe, respond with a 500 status code and the error
//         if (stripeErr) {
//           res.status(500).json(stripeErr);
//         } else {
//           // If there is no error, respond with a 200 status code and the Stripe response
//           res.status(200).json(stripeRes);
//         }
//       }
//     );

//     // Responding with a 200 status code and the charge object
//     res.status(200).json(charge);
//   } catch (error) {
//     // If there is an error during the process, log the error and respond with a 500 status code and an error message
//     console.error("Error processing payment:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
