
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setIsSubmitting(true);

    try {
      // Instead of redirecting to a server endpoint, we can simulate collecting interest
      // This would be replaced with a real API call in a production environment
      toast({
        title: "Thank you for your interest!",
        description: "We'll contact you when we launch.",
      });
      
      // In a real implementation, you would create a payment intent on the server
      // and confirm the payment here with stripe.confirmPayment()
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
