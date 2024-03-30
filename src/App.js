import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Main from './components/main/Main';
import LandingPage from './components/landing/Landing';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('user_id');
    console.log('user_id retrieved from cookie with value: ' + userId);
    if (userId) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Main /> : <LandingPage setAuthenticated={setAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;