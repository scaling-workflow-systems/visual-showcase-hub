
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductDemo from '@/components/ProductDemo';

const Index = () => {
  return (
    <div className="min-h-screen bg-payment-dark text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-payment-dark/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-payment-purple to-payment-pink bg-clip-text text-transparent">
              NextPay
            </div>
            <div className="flex gap-4 items-center">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">Solutions</Button>
              <Button variant="ghost">FAQ</Button>
              <Button className="bg-gradient-to-r from-payment-purple to-payment-pink hover:opacity-90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-payment-purple to-payment-pink bg-clip-text text-transparent">
            Next-Gen Payment Solution
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience seamless transactions with our cutting-edge payment
            processing system.
          </p>
          <ProductDemo />
        </div>
      </section>
    </div>
  );
};

export default Index;
