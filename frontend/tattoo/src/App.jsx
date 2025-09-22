import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Navigationbar from './components/Navigationbar';
import AdminLogin from './pages/AdminLogin';

const App = () => {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </div>
  );
};

export default App;
