// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
  const { loggedInUser } = useAuth();

  return (
    <Routes>
      <Route path={path} element={loggedInUser ? element : <Navigate to="/login" />} />
    </Routes>
  );
};

export default ProtectedRoute;
