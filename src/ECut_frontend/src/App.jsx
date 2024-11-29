import React, { useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ExplorePage from './pages/Explore';
import BarberShopDetailPage from './pages/BarberShopDetail';
import { ECut_backend } from 'declarations/ECut_backend';
import { useSession } from './component/session/SessionUtil';
function App() {

    const { refreshSession } = useSession();
    useEffect(() => {
      const refreshAppSession = async () => {
        try {
          window.showLoader();
          await refreshSession();
          window.hideLoader();
          // Handle any other necessary logic after session refresh
        } catch (error) {
          console.error("Error refreshing session:", error);
        }
      }

      refreshAppSession();
    }, [])

  return (
    <Router>
      {/* <Naviga /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/barbershop/:id" element={<BarberShopDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
