import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CatProvider from './context/CatProvider';
import Details from './pages/Details';
import Browser from './pages/Browser';

const App = () => {
  return (
    <CatProvider>
      <Routes>
        <Route path="/" element={<Browser />} />
        <Route path="/:imageId" element={<Details />} />
      </Routes>
    </CatProvider>
  );
};

export default App;
