import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Main from './components/main/Main';
import LandingPage from './components/landing/Landing';
import Discussion from './components/discussion/Discussion'

function App() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const userId = Cookies.get('user_id');
    console.log('user_id retrieved from cookie with value: ' + userId);
    setAuthenticated(!!userId);
  }, []);

  if (authenticated === null) {
    return null; // Render nothing while checking authentication
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage setAuthenticated={setAuthenticated} />} />
        <Route
          path="/learn"
          element={authenticated ? <Main /> : <Navigate to="/" replace />}
        />
        <Route
          path="/discussion"
          element={authenticated ? <Discussion /> : <Navigate to="/discussion" replace />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;