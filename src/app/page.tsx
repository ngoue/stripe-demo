"use client";

import Cart from "@/components/Cart";
import Payment from "@/components/Payment";
import { CartItem } from "@/types";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentIntent, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = loadStripe(stripeKey);

const cart: CartItem[] = [
  {
    id: "dcl1",
    title: "Drop-Cut Lux T-Shirt",
    url: "https://cdn.shopify.com/s/files/1/1464/5034/products/black_d53eddc6-c2d4-4c32-bc87-db086e79007c.jpg?v=1698961721&width=1280&quality=90",
    price: 3500,
    quantity: 2,
  },
  {
    id: "evs2.0",
    title: "Everyday Short 2.0",
    url: "https://cdn.shopify.com/s/files/1/1464/5034/files/D2EverydayShortsCharcoal_1608.jpg?v=1711731248&width=1280&quality=90",
    price: 9800,
    quantity: 1,
  },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent>();

  useEffect(() => {
    const loadPaymentIntent = async () => {
      if (loading) {
        return;
      }

      setLoading(true);
      console.log(">>> loading payment intent...");
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });
      const { paymentIntent } = await response.json();
      setPaymentIntent(paymentIntent);
      setLoading(false);
    };

    loadPaymentIntent();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 font-mono lg:p-24">
      <div className="z-10 w-full max-w-5xl text-sm">
        <h1 className="font-bold text-2xl mb-4">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="flex flex-col basis-2/3 p-4 gap-4 border border-gray-400 rounded">
            <Cart items={cart} />
          </div>
          <div className="flex flex-col basis-1/3 p-4 gap-4 border border-gray-400 rounded">
            {loading ? (
              <p>Loading...</p>
            ) : !paymentIntent ? (
              <p>No paymentIntent</p>
            ) : (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret: paymentIntent.client_secret as string,
                }}
              >
                <Payment />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
