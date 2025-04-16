
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const CheckoutForm = ({ email, setIsSubmitting }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setIsSubmitting(true);

    try {
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you when we launch.",
      });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <Button
        type="submit"
        className="w-full bg-[#9333ea] hover:bg-[#7928ca] text-white py-6 text-lg"
        disabled={!stripe || isLoading}
      >
        {isLoading ? 'Processing...' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default CheckoutForm;
