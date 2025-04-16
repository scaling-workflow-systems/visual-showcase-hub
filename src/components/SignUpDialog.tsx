
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SignUpDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();

  const handleProceed = async () => {
    // Dummy Stripe integration for now
    toast({
      title: "Success!",
      description: "Your free account has been created.",
    });
    onClose();
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
