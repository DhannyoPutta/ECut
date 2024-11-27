import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import ExplorePage from './pages/Explore';
import BarberShopDetailPage from './pages/BarberShopDetail';

function App() {
  return (
    <Router>
      {/* <Naviga /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/barbershop/:id" element={<BarberShopDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
