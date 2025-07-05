import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import UserProfile from "@/pages/UserProfile";
import BookmarkDetail from "@/pages/BookmarkDetail";

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

const RoutesList = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/bookmark/:id" element={<BookmarkDetail />} />
    <Route path="/settings" element={<Settings />} />
    
    <Route path="/account" element={
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    } />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesList; 