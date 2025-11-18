"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import api from "@/lib/xior";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const createIntent = async () => {
      const res = await api.post("/orders/create");
      setClientSecret(res.data.clientSecret);
    };
    createIntent();
  }, []);

  if (!clientSecret) return <p>Loading Payment...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Secure Checkout</h1>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();

  const { clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      },
    );

    if (error) {
      toast.error(error.message || "Payment failed");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      toast.success("Payment Successful!");
      clearCart.mutate();
      window.location.href = "/dashboard";
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <CardElement className="p-4 border rounded-md" />

      <Button className="w-full" onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}
