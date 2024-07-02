"use client";

import {
  StripeExpressCheckoutElementConfirmEvent,
  loadStripe,
} from "@stripe/stripe-js";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = loadStripe(stripeKey);

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleExpressConfirm = async (
    event: StripeExpressCheckoutElementConfirmEvent
  ) => {
    if (!stripe || !elements) {
      console.warn(">>> stripe not loaded... exiting.");
      return;
    }

    debugger;
    console.log(">>> handleExpressConfirm()");
    console.log({ event });

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(">>> error submitting... exiting.");
      console.error({ submitError });
      return;
    }

    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "/",
      },
    });
  };

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.warn(">>> stripe not loaded... exiting.");
      return;
    }

    setLoading(true);
    console.log(">>> handlePayment()");
    debugger;
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(">>> error submitting... exiting.");
      console.error({ submitError });
      setLoading(false);
      return;
    }
    setLoading(false);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "/",
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* <ExpressCheckoutElement
        onConfirm={handleExpressConfirm}
        options={{
          paymentMethodOrder: ["applePay", "googlePay", "link"],
          paymentMethods: {
            applePay: "always",
            googlePay: "always",
            link: "auto",
          },
        }}
      />
      <div className="flex justify-center items-center my-4 border-t border-gray-300">
        <p className="text-gray-400 absolute bg-white p-2">
          Or pay another way
        </p>
      </div> */}
      <div>
        <PaymentElement
          options={{
            wallets: { applePay: "never", googlePay: "never" },
          }}
        />
        <button
          className="bg-black text-white font-bold text-center p-4 rounded mt-4 w-full disabled:opacity-50"
          disabled={loading}
          onClick={handlePayment}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
