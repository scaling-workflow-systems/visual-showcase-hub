
import React, { createContext, useContext, useEffect, useState } from 'react';
import useSubdomain from '../hooks/useSubdomain';

type SubdomainContextType = {
  subdomain: string;
  isLoading: boolean;
  subdomainData: Record<string, any> | null;
};

const SubdomainContext = createContext<SubdomainContextType | undefined>(undefined);

export const SubdomainProvider = ({ children }: { children: React.ReactNode }) => {
  const subdomain = useSubdomain();
  const [isLoading, setIsLoading] = useState(true);
  const [subdomainData, setSubdomainData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const fetchSubdomainData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/subdomain/${subdomain}`);
        if (response.ok) {
          const data = await response.json();
          setSubdomainData(data);
        }
      } catch (error) {
        console.error('Error fetching subdomain data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubdomainData();
  }, [subdomain]);

  return (
    <SubdomainContext.Provider value={{ subdomain, isLoading, subdomainData }}>
      {children}
    </SubdomainContext.Provider>
  );
};

export const useSubdomainContext = () => {
  const context = useContext(SubdomainContext);
  if (context === undefined) {
    throw new Error('useSubdomainContext must be used within a SubdomainProvider');
  }
  return context;
};
