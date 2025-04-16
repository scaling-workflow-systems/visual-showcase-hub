
import React from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  email: string;
  setIsSubmitting: (value: boolean) => void;
}

const CheckoutForm = ({ email, setIsSubmitting }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      <Button
        type="submit"
        className="w-full bg-[#9333ea] hover:bg-[#7928ca] text-white py-6 text-lg"
        disabled={!stripe || !elements}
      >
        {!stripe || !elements ? 'Loading...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default CheckoutForm;
