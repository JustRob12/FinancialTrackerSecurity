// Environment variables are not directly accessible in React Native
// For a production app, you would use a solution like react-native-dotenv
// For now, we'll define the address directly and you can manually update it
// Replace this with your computer's local IP address on your network

// You can find this by running 'ipconfig' on Windows or 'ifconfig' on Mac/Linux
// Example: 192.168.1.5, 10.0.0.4, etc.
export const API_HOST = '192.168.0.100'; // Replace with your actual IP address
export const API_PORT = 5000;
export const API_URL = `http://${API_HOST}:${API_PORT}/api`;

// API endpoints
export const ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_URL}/auth/register`,
  LOGIN: `${API_URL}/auth/login`,
  PROFILE: `${API_URL}/auth/profile`,
  
  // Health check
  HEALTH: `${API_URL}/health`,
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Function to get auth headers with token
export const getAuthHeaders = (token: string) => {
  return {
    ...DEFAULT_HEADERS,
    'Authorization': `Bearer ${token}`,
  };
}; 