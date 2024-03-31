import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import Main from "./components/main/Main";
import LandingPage from "./components/landing/Landing";
import Profile from "./components/profile/Profile";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";

function App() {
	const [authenticated, setAuthenticated] = useState(false);
	const [isProfileSet, setIsProfileSet] = useState(null);

	const fetchProfileStatus = async () => {
		const profile = Cookies.get("profile");
		if (profile != null) {
			setIsProfileSet(true);
		}
		const userId = Cookies.get("user_id");
		if (userId) {
			const docRef = doc(db, "profiles", userId);
			const docSnap = await getDoc(docRef);
			setIsProfileSet(docSnap.exists());
			if (docSnap.exists()) {
				setIsProfileSet(true);
				Cookies.set("profile", true, { expires: 1 });
			}
			setAuthenticated(true);
		} else {
			setAuthenticated(false);
			setIsProfileSet(null);
		}
	};

	useEffect(() => {
		fetchProfileStatus();
	}, []); // Empty dependency array means this effect runs once on mount

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<LandingPage setAuthenticated={setAuthenticated} />}
				/>
				<Route
					path="/learn"
					element={
						authenticated && isProfileSet ? (
							<Main />
						) : (
							<Navigate to="/profile" replace />
						)
					}
				/>
				<Route
					path="/profile"
					element={
						authenticated ? (
							<Profile
								onProfileUpdate={fetchProfileStatus}
								setter={setIsProfileSet}
							/>
						) : (
							<Navigate to="/" replace />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
