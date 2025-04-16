
type FeatureCard = {
  title: string;
  description: string;
}

type PricingTier = {
  name: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

type Solution = {
  title: string;
  description: string;
}

type FAQ = {
  question: string;
  answer: string;
}

type SubdomainConfig = {
  title: string;
  subtitle: string;
  heroTitle: string;
  heroSubtitle: string;
  features: {
    title: string;
    cards: FeatureCard[];
  };
  pricing: {
    title: string;
    tiers: PricingTier[];
  };
  solutions: {
    title: string;
    items: Solution[];
  };
  faq: {
    title: string;
    items: FAQ[];
  };
  signUpCta: string;
}

const subdomainConfig: Record<string, SubdomainConfig> = {
  main: {
    title: "NextPay",
    subtitle: "Modern Payment Processing",
    heroTitle: "Next-Gen Payment Solution",
    heroSubtitle: "Experience seamless transactions with our cutting-edge payment processing system.",
    features: {
      title: "Features",
      cards: [
        {
          title: "Instant Transfers",
          description: "Transfer funds instantly to anywhere in the world."
        },
        {
          title: "Secure Encryption",
          description: "Your transactions are protected with military-grade encryption."
        },
        {
          title: "Low Fees",
          description: "Save money with our industry-leading low transaction fees."
        }
      ]
    },
    pricing: {
      title: "Pricing",
      tiers: [
        {
          name: "Basic",
          price: "$29",
          features: ["100 transactions/month", "Email support", "Basic analytics"],
          cta: "Get Started"
        },
        {
          name: "Pro",
          price: "$79",
          features: ["1,000 transactions/month", "Priority support", "Advanced analytics", "API access"],
          cta: "Get Started",
          highlighted: true
        },
        {
          name: "Enterprise",
          price: "$199",
          features: ["Unlimited transactions", "24/7 phone support", "Custom analytics", "Dedicated account manager"],
          cta: "Get Started"
        }
      ]
    },
    solutions: {
      title: "Solutions",
      items: [
        {
          title: "For Small Business",
          description: "Affordable payment solutions designed for small businesses."
        },
        {
          title: "For Enterprise",
          description: "Scalable solutions for large companies with complex needs."
        }
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "How secure is NextPay?",
          answer: "NextPay uses bank-level encryption to protect all of your transactions and personal data."
        },
        {
          question: "Can I integrate NextPay with my website?",
          answer: "Yes, we offer API integration for all plans above the Basic tier."
        },
        {
          question: "How fast are international transfers?",
          answer: "Most international transfers are completed within 24 hours, with many happening instantly."
        }
      ]
    },
    signUpCta: "Sign Up"
  },
  admin: {
    title: "NextPay Admin",
    subtitle: "Payment Management Suite",
    heroTitle: "Admin Dashboard Suite",
    heroSubtitle: "Powerful tools to manage your payment infrastructure, reporting, and user management.",
    features: {
      title: "Admin Features",
      cards: [
        {
          title: "User Management",
          description: "Manage user accounts, permissions, and roles."
        },
        {
          title: "Data Analytics",
          description: "Advanced analytics and reporting for all transactions."
        },
        {
          title: "Security Controls",
          description: "Fine-grained security controls and audit logs."
        }
      ]
    },
    pricing: {
      title: "Admin Plans",
      tiers: [
        {
          name: "Team",
          price: "$99",
          features: ["5 admin users", "Basic reporting", "Standard support"],
          cta: "Get Started"
        },
        {
          name: "Business",
          price: "$199",
          features: ["20 admin users", "Advanced reporting", "Priority support", "Custom roles"],
          cta: "Get Started",
          highlighted: true
        },
        {
          name: "Enterprise",
          price: "$499",
          features: ["Unlimited admin users", "Real-time reporting", "24/7 support", "Custom integrations"],
          cta: "Get Started"
        }
      ]
    },
    solutions: {
      title: "Admin Solutions",
      items: [
        {
          title: "For Finance Teams",
          description: "Streamline financial operations and reporting."
        },
        {
          title: "For IT Departments",
          description: "Secure management and integration capabilities."
        }
      ]
    },
    faq: {
      title: "Admin FAQ",
      items: [
        {
          question: "How granular are the permission controls?",
          answer: "NextPay Admin allows role-based permissions down to individual feature level access."
        },
        {
          question: "Can we customize the reporting dashboard?",
          answer: "Yes, Business and Enterprise plans allow for fully customizable dashboards and reports."
        },
        {
          question: "Is there an audit log for admin actions?",
          answer: "All admin actions are logged with user, timestamp, and IP address for security compliance."
        }
      ]
    },
    signUpCta: "Request Admin Access"
  },
  app: {
    title: "NextPay App",
    subtitle: "Your Payment Portal",
    heroTitle: "User Payment Dashboard",
    heroSubtitle: "Manage your payments, track expenses, and analyze your financial data all in one place.",
    features: {
      title: "App Features",
      cards: [
        {
          title: "Payment Tracking",
          description: "Track all your payments and transactions in real-time."
        },
        {
          title: "Financial Reports",
          description: "Generate detailed financial reports and analytics."
        },
        {
          title: "Invoice Management",
          description: "Create, send, and track invoices from a single dashboard."
        }
      ]
    },
    pricing: {
      title: "App Plans",
      tiers: [
        {
          name: "Personal",
          price: "$9",
          features: ["5 invoices/month", "Basic reports", "Email support"],
          cta: "Get Started"
        },
        {
          name: "Professional",
          price: "$29",
          features: ["50 invoices/month", "Advanced reports", "Priority support", "Payment reminders"],
          cta: "Get Started",
          highlighted: true
        },
        {
          name: "Business",
          price: "$59",
          features: ["Unlimited invoices", "Custom reports", "24/7 support", "Team access"],
          cta: "Get Started"
        }
      ]
    },
    solutions: {
      title: "App Solutions",
      items: [
        {
          title: "For Freelancers",
          description: "Simple tools for managing client payments and tracking income."
        },
        {
          title: "For Small Teams",
          description: "Collaborate on invoicing and payment tracking with your team."
        }
      ]
    },
    faq: {
      title: "App FAQ",
      items: [
        {
          question: "Can I accept payments directly through the app?",
          answer: "Yes, you can generate payment links and accept credit cards directly."
        },
        {
          question: "Is there a mobile version?",
          answer: "Yes, NextPay App is available for iOS and Android with all the same features."
        },
        {
          question: "Can I connect my bank account?",
          answer: "Yes, you can connect bank accounts for automatic payment reconciliation."
        }
      ]
    },
    signUpCta: "Create Account"
  }
};

export default subdomainConfig;
