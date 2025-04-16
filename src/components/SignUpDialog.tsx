
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setIsSubmitting(false);
      setIsSuccess(false);
      setErrors({ email: '' });
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = { email: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // For now, just simulate success since we're just collecting interest
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setIsSuccess(true);
        toast({
          title: "Interest Registered",
          description: "We'll notify you when we launch!",
        });
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

          <p className="text-sm text-gray-400 text-center mt-2">
            By submitting this form, you agree to share your email for marketing purposes. 
            We'll notify you when we launch!
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
