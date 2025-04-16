
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
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

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
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm email={email} setIsSubmitting={setIsSubmitting} />
          </Elements>

          <p className="text-sm text-gray-400 text-center mt-2">
            Your card won't be charged. We're just collecting interest for our upcoming launch!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
