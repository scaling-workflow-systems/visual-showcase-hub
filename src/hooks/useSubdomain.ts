
const useSubdomain = () => {
  // Get the full hostname (e.g., app.example.com)
  const hostname = window.location.hostname;
  
  // Split the hostname into parts
  const parts = hostname.split('.');
  
  // If we're running locally, parts[0] will be 'localhost'
  if (hostname === 'localhost') return 'main';
  
  // In production, for a URL like 'app.example.com':
  // parts[0] would be 'app'
  // parts[1] would be 'example'
  // parts[2] would be 'com'
  return parts[0];
};

export default useSubdomain;
