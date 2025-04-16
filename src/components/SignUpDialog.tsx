
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, CreditCard } from 'lucide-react';

const SignUpDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [errors, setErrors] = useState({ email: '', creditCard: '' });

  const validateForm = () => {
    const newErrors = { email: '', creditCard: '' };
    let isValid = true;

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Credit card validation (basic length check)
    if (!creditCard) {
      newErrors.creditCard = 'Credit card is required';
      isValid = false;
    } else if (creditCard.length < 16) {
      newErrors.creditCard = 'Please enter a valid credit card number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = async () => {
    if (validateForm()) {
      toast({
        title: "Coming Soon!",
        description: "Thank you for your interest. We'll notify you when we launch.",
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Get Started Now</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">$0.00</div>
            <div className="text-gray-400">No credit card required</div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="creditCard">Credit Card</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="creditCard"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
                value={creditCard}
                onChange={(e) => setCreditCard(e.target.value.replace(/\D/g, '').slice(0, 16))}
              />
            </div>
            {errors.creditCard && (
              <p className="text-sm text-red-500 mt-1">{errors.creditCard}</p>
            )}
          </div>

          <Button
            className="w-full bg-gradient-to-r from-payment-purple to-payment-pink hover:opacity-90"
            onClick={handleProceed}
          >
            Start Using NextPay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
