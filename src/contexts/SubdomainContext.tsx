
import React, { createContext, useContext } from 'react';
import useSubdomain from '../hooks/useSubdomain';

type SubdomainContextType = {
  subdomain: string;
};

const SubdomainContext = createContext<SubdomainContextType | undefined>(undefined);

export const SubdomainProvider = ({ children }: { children: React.ReactNode }) => {
  const subdomain = useSubdomain();

  return (
    <SubdomainContext.Provider value={{ subdomain }}>
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
