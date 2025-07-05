import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import UserProfile from "@/pages/UserProfile";
import BookmarkDetail from "@/pages/BookmarkDetail";
import Subscriptions from "@/pages/Subscriptions";

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}

const RoutesList = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/bookmark/:id" element={<BookmarkDetail />} />

    <Route path="/subscriptions" element={
      <PrivateRoute>
        <Subscriptions />
      </PrivateRoute>
    } />

    <Route path="/account" element={
      <PrivateRoute>
        <UserProfile />
      </PrivateRoute>
    } />

    <Route path="/settings" element={<Settings />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesList; 