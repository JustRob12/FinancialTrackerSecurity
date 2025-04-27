import { ENDPOINTS, DEFAULT_HEADERS, getAuthHeaders } from '../config/api';

// Types
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'An error occurred',
      };
    }
    
    return {
      success: true,
      data: data as T,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again later.',
    };
  }
};

// Auth API Service
export const AuthService = {
  // Register a new user
  register: async (userData: RegisterData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again later.',
      };
    }
  },
  
  // Login a user
  login: async (credentials: LoginData): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(credentials),
      });
      
      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again later.',
      };
    }
  },
  
  // Get user profile
  getProfile: async (token: string): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(ENDPOINTS.PROFILE, {
        method: 'GET',
        headers: getAuthHeaders(token),
      });
      
      return handleResponse(response);
    } catch (error) {
      return {
        success: false,
        error: 'Network error. Please try again later.',
      };
    }
  },
}; 