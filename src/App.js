import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Main from "./components/main/Main";
import SignIn from "./components/sign-in/SignIn";

function App() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const userId = Cookies.get("user_id");
        console.log("user_id retrieved from cookie with value: " + userId);
        if (!userId) {
            setDialogOpen(true); // If no user_id cookie, open sign-in dialog
        } else {
            setAuthenticated(true);
        }
    }, [dialogOpen]);
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") return;
        setDialogOpen(false);
    };
  return (
      <div className={!authenticated ? "blur-background" : ""}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    <SignIn open={dialogOpen} onClose={handleClose} />
          </div>
  );
}

export default App;
