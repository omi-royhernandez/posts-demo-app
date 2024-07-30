import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<string>('');

  const login = (userEmail: string) => {
    setLoggedInUser(userEmail); // Set the email of the logged-in user
  };

  const logout = () => {
    setLoggedInUser(''); // Clear the logged-in user
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
