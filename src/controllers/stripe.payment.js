import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeGateway = async (req, res) => {
  try {
    // Validate if tokenId exists in the request body
    if (!req.body.tokenId) {
      // If tokenId is missing, respond with a 400 status code and an error message
      return res
        .status(400)
        .json({ error: "Token ID is missing from the request body" });
    }

    // Validate if amount exists in the request body
    if (!req.body.amount) {
      // If amount is missing, respond with a 400 status code and an error message
      return res
        .status(400)
        .json({ error: "Amount is missing from the request body" });
    }

    // Attempting to create a charge using the Stripe API
    const charge = await stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );

    res.status(200).json(charge);
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
