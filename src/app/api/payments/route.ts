import type { CreatePaymentRequest } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const { cart }: CreatePaymentRequest = await request.json();
  const amount = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ paymentIntent });
}
