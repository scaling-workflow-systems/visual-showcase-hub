
const useSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // For local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'main';
  }
  
  // In production, return the first part of the hostname
  return parts[0];
};

export default useSubdomain;
