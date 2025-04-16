
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductDemo from '@/components/ProductDemo';
import SignUpDialog from '@/components/SignUpDialog';
import { useSubdomainContext } from '@/contexts/SubdomainContext';
import subdomainConfig from '@/config/subdomainConfig';

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { subdomain } = useSubdomainContext();
  
  // Get configuration for current subdomain, fallback to main if not found
  const config = subdomainConfig[subdomain] || subdomainConfig.main;
  
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
              {config.title}
            </div>
            <div className="flex gap-4 items-center">
              <Button variant="ghost" onClick={() => scrollToSection('features')}>{config.features.title}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('pricing')}>{config.pricing.title}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('solutions')}>{config.solutions.title}</Button>
              <Button variant="ghost" onClick={() => scrollToSection('faq')}>{config.faq.title}</Button>
              <Button 
                className="bg-gradient-to-r from-payment-purple to-payment-pink hover:opacity-90"
                onClick={() => setIsSignUpOpen(true)}
              >
                {config.signUpCta}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-payment-purple to-payment-pink bg-clip-text text-transparent">
            {config.heroTitle}
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            {config.heroSubtitle}
          </p>
          <ProductDemo />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{config.features.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {config.features.cards.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{config.pricing.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {config.pricing.tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-gray-900/50 p-6 rounded-xl border ${tier.highlighted ? 'border-purple-500' : 'border-gray-800'}`}
              >
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-3xl font-bold mb-4">{tier.price}<span className="text-sm text-gray-400">/month</span></p>
                <ul className="text-gray-400 space-y-2 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${tier.highlighted ? 'bg-gradient-to-r from-payment-purple to-payment-pink' : ''}`}
                >
                  {tier.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{config.solutions.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {config.solutions.items.map((solution, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                <p className="text-gray-400">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{config.faq.title}</h2>
          <div className="space-y-4">
            {config.faq.items.map((faq, index) => (
              <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
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

export default LandingPage;
