
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe
const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

const SignUpDialog = ({
  isOpen,
  onClose,
  selectedPlan
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any;
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setIsSubmitting(false);
      setErrors({ email: '', cardNumber: '', expiry: '', cvc: '' });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      cardNumber: '',
      expiry: '',
      cvc: ''
    };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    }

    if (!expiry) {
      newErrors.expiry = 'Expiry date is required';
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiry)) {
      newErrors.expiry = 'Invalid expiry date (MM/YY)';
      isValid = false;
    }

    if (!cvc) {
      newErrors.cvc = 'CVC is required';
      isValid = false;
    } else if (!/^[0-9]{3,4}$/.test(cvc)) {
      newErrors.cvc = 'Invalid CVC';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = async () => {
    if (validateForm()) {
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
    }
  };

  const planName = selectedPlan ? selectedPlan.name : 'Free Plan';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1f2c] text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Sign Up - {planName}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email*</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-[#2a2f3c] border-gray-700 text-white placeholder:text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-gray-300">Card Number*</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="bg-[#2a2f3c] border-gray-700 text-white placeholder:text-gray-500"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-gray-300">Expiry (MM/YY)*</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                className="bg-[#2a2f3c] border-gray-700 text-white placeholder:text-gray-500"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
              />
              {errors.expiry && (
                <p className="text-sm text-red-500">{errors.expiry}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvc" className="text-gray-300">CVC*</Label>
              <Input
                id="cvc"
                type="text"
                placeholder="123"
                className="bg-[#2a2f3c] border-gray-700 text-white placeholder:text-gray-500"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                maxLength={4}
              />
              {errors.cvc && (
                <p className="text-sm text-red-500">{errors.cvc}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center mt-2">
            Your card won't be charged. We're just collecting interest for our upcoming launch!
          </p>

          <Button
            className="w-full bg-[#9333ea] hover:bg-[#7928ca] text-white py-6 text-lg"
            onClick={handleProceed}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Sign Up'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
