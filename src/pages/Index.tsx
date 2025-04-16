import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductDemo from '@/components/ProductDemo';
import SignUpDialog from '@/components/SignUpDialog';

const Index = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <Button variant="ghost" onClick={() => scrollToSection('features')}>Features</Button>
              <Button variant="ghost" onClick={() => scrollToSection('pricing')}>Pricing</Button>
              <Button variant="ghost" onClick={() => scrollToSection('solutions')}>Solutions</Button>
              <Button variant="ghost" onClick={() => scrollToSection('faq')}>FAQ</Button>
              <Button 
                className="bg-gradient-to-r from-payment-purple to-payment-pink hover:opacity-90"
                onClick={() => setIsSignUpOpen(true)}
              >
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

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Instant Transfers</h3>
              <p className="text-gray-400">Transfer funds instantly to anywhere in the world.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Secure Encryption</h3>
              <p className="text-gray-400">Your transactions are protected with military-grade encryption.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Low Fees</h3>
              <p className="text-gray-400">Save money with our industry-leading low transaction fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-400">/month</span></p>
              <ul className="text-gray-400 space-y-2 mb-6">
                <li>100 transactions/month</li>
                <li>Email support</li>
                <li>Basic analytics</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500">
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$79<span className="text-sm text-gray-400">/month</span></p>
              <ul className="text-gray-400 space-y-2 mb-6">
                <li>1,000 transactions/month</li>
                <li>Priority support</li>
                <li>Advanced analytics</li>
                <li>API access</li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-payment-purple to-payment-pink">Get Started</Button>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">$199<span className="text-sm text-gray-400">/month</span></p>
              <ul className="text-gray-400 space-y-2 mb-6">
                <li>Unlimited transactions</li>
                <li>24/7 phone support</li>
                <li>Custom analytics</li>
                <li>Dedicated account manager</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">For Small Business</h3>
              <p className="text-gray-400">Affordable payment solutions designed for small businesses.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">For Enterprise</h3>
              <p className="text-gray-400">Scalable solutions for large companies with complex needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">FAQ</h2>
          <div className="space-y-4">
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">How secure is NextPay?</h3>
              <p className="text-gray-400">NextPay uses bank-level encryption to protect all of your transactions and personal data.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">Can I integrate NextPay with my website?</h3>
              <p className="text-gray-400">Yes, we offer API integration for all plans above the Basic tier.</p>
            </div>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-2">How fast are international transfers?</h3>
              <p className="text-gray-400">Most international transfers are completed within 24 hours, with many happening instantly.</p>
            </div>
          </div>
        </div>
      </section>

      <SignUpDialog 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
      />
    </div>
  );
};

export default Index;
