import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Browser from './pages/Browser';
import Details from './pages/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Browser />} />
      <Route path="/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
