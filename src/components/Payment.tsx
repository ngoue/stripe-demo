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

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = loadStripe(stripeKey);

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const handleConfirm = async (
    event: StripeExpressCheckoutElementConfirmEvent
  ) => {
    if (!stripe || !elements) {
      console.warn(">>> stripe not loaded... exiting.");
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error(">>> error submitting... exiting.");
      console.error({ submitError });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "/",
      },
    });
  };

  return (
    <>
      {/* <ExpressCheckoutElement onConfirm={handleConfirm} /> */}
      <PaymentElement />
    </>
  );
}
