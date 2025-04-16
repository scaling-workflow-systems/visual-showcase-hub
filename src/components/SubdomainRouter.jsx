
import { Routes, Route } from "react-router-dom";
import { useSubdomainContext } from "../contexts/SubdomainContext";
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Admin from "../pages/Admin";
import App from "../pages/App";

const SubdomainRouter = () => {
  const { subdomain } = useSubdomainContext();

  switch (subdomain) {
    case 'admin':
      return (
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    
    case 'app':
      return (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    
    default:
      return (
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
  }
};

export default SubdomainRouter;
