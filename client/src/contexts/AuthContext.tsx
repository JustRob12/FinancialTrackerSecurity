import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthService } from '../services/api';

// Define types
interface User {
  id: number;
  full_name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (full_name: string, email: string, password: string, confirm_password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = '@financial_tracker:user';
const TOKEN_STORAGE_KEY = '@financial_tracker:token';

// Provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user data from storage on app start
  useEffect(() => {
    const loadStoredUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
        const storedToken = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
        
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Error loading authentication data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredUserData();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login({ email, password });
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Save to state
        setUser(user);
        setToken(token);
        
        // Save to storage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
        
        return true;
      } else {
        setError(response.error || 'Login failed');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    full_name: string, 
    email: string, 
    password: string, 
    confirm_password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.register({
        full_name,
        email,
        password,
        confirm_password
      });
      
      if (response.success && response.data) {
        const { user, token } = response.data;
        
        // Save to state
        setUser(user);
        setToken(token);
        
        // Save to storage
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
        
        return true;
      } else {
        setError(response.error || 'Registration failed');
        return false;
      }
    } catch (error) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Clear storage
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      
      // Clear state
      setUser(null);
      setToken(null);
      setError(null);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // The value that will be provided to consumers of this context
  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 