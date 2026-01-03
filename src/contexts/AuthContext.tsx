import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const mockUser: User = {
  id: '1',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Traveler',
  phone: '+1 234 567 8900',
  city: 'San Francisco',
  country: 'USA',
  avatar: '',
  createdAt: new Date(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;
  const isAdmin = user?.email === 'admin@globaltrotter.com';

  const login = useCallback(async (email: string, password: string) => {
    // Mock login - in production, this would call the API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === 'admin@globaltrotter.com') {
      setUser({
        ...mockUser,
        id: 'admin',
        email: 'admin@globaltrotter.com',
        firstName: 'Admin',
        lastName: 'User',
      });
    } else {
      setUser({ ...mockUser, email });
    }
  }, []);

  const register = useCallback(async (userData: Partial<User> & { password: string }) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser({
      id: Date.now().toString(),
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      phone: userData.phone,
      city: userData.city,
      country: userData.country,
      avatar: userData.avatar,
      additionalInfo: userData.additionalInfo,
      createdAt: new Date(),
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (userData: Partial<User>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(prev => prev ? { ...prev, ...userData } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
