import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignUpDialog = ({
  isOpen,
  onClose,
  selectedPlan
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: any;
}) => {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      setIsSuccess(false);
      setErrors({
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
      });
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

    if (!cardNumber || cardNumber.length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
      isValid = false;
    }

    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    }

    if (!cvc || !/^\d{3,4}$/.test(cvc)) {
      newErrors.cvc = 'Please enter a valid CVC';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await axios.post('http://localhost:8000/api/signup', {
          email,
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry,
          cvc,
          plan: selectedPlan ? selectedPlan.name : 'Free'
        });

        if (response.status === 200) {
          setIsSuccess(true);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 16);
    return numbers.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 4);
    if (numbers.length > 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    }
    return numbers;
  };

  const planPrice = selectedPlan ? selectedPlan.price : '$0.00';
  const planName = selectedPlan ? selectedPlan.name : 'Free Plan';

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-[#1a1f2c] text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Thank You!</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-6 text-center">
            <p className="text-lg">
              We've received your information for the {planName} plan.
            </p>
            <p className="text-gray-400">
              Our service is coming soon! We'll email you according to standard FTC marketing rules when we're ready to launch.
            </p>
            <p className="text-gray-400">
              We appreciate your interest and will reach out shortly with more details.
            </p>
            <Button
              className="w-full bg-[#9333ea] hover:bg-[#7928ca] text-white py-6 text-lg mt-4"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1f2c] text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Sign Up - {planName} ({planPrice})</DialogTitle>
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
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />
            {errors.cardNumber && (
              <p className="text-sm text-red-500">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-gray-300">Expiry*</Label>
              <Input
                id="expiry"
                type="text"
                placeholder="MM/YY"
                className="bg-[#2a2f3c] border-gray-700 text-white placeholder:text-gray-500"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
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
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
              />
              {errors.cvc && (
                <p className="text-sm text-red-500">{errors.cvc}</p>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center mt-2">
            By submitting this form, you agree to share your email for marketing purposes. 
            Payment processing is securely handled by Stripe.
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
