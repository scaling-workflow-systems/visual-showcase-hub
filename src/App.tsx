
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SubdomainProvider } from "./contexts/SubdomainContext";
import SubdomainRouter from "./components/SubdomainRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SubdomainProvider>
        <BrowserRouter>
          <SubdomainRouter />
        </BrowserRouter>
      </SubdomainProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
