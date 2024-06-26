import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Cookies from "js-cookie";

import LanguageSelector from "./language-selector/LanguageSelector";
import ProfileCard from "./profile-card/ProfileCard";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { LanguageContext } from "./language-context/LanguageContext";
import languagesData from "./data/languages.json";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { db } from "../../firebaseconfig"; // Import the Firestore database configuration
import theme from "./theme";
import UserProfileButton from "./user-profile-button/UserProfileButton";

function Main() {
	const [currentLanguage, setCurrentLanguage] = useState("Spanish");
	const [profile, setProfile] = useState("");
	const [fluency, updateFluency] = useState(20);
	const [pace, setPace] = useState("_");
	const [state, reset] = useState(0);

	useEffect(() => {
		const fetchProfile = async () => {
			const docRef = doc(db, "profiles", Cookies.get("user_id"));
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setProfile(docSnap.data());
				console.log(docSnap.data());
			}
		};

		fetchProfile();
	}, []);

	let userLevel = "Beginner";
	return (
		<ThemeProvider theme={theme}>
			<LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
				<Box
					sx={{
						width: "100vw",
						minHeight: "100vh",
						display: "flex",
						flexDirection: "column",
						background: "linear-gradient(to right, #ff7057, #bdaa4f)",
					}}
				>
					<AppBar
						position="static"
						sx={{
							height: "10vh",
							justifyContent: "center",
							background: "transparent",
							boxShadow: "none", // Remove drop shadow
						}}
					>
						<Toolbar>
							<LanguageSelector sx={{ border: "none", boxShadow: "none" }} />
							<Box sx={{ flexGrow: 1 }} />
							<UserProfileButton profile={profile} userLevel={userLevel} />
						</Toolbar>
					</AppBar>

					<Container
						component="main"
						sx={{ flexGrow: 1, overflow: "auto", padding: "20px" }}
					>
						<Grid
							container
							spacing={3}
							alignItems="center"
							justifyContent="center"
						>
							<Grid item xs={12} md={4}>
								{/*  <SessionDetails />*/}
							</Grid>
							<Grid item xs={12} md={4}>
								<ProfileCard
									setPace={setPace}
									reset={state}
									updateFluency={updateFluency}
								/>
								<Typography
									variant="h2"
									component="h2"
									sx={{
										flexGrow: 1,
										color: "white",
										textAlign: "center",
										position: "absolute",
										top: "25%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									{languagesData[currentLanguage].agentName}
								</Typography>

								<Typography
									variant="title1"
									sx={{
										flexGrow: 1,
										color: "white",
										textAlign: "center",
										position: "absolute",
										top: "75%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									Learning {currentLanguage}
								</Typography>
								<Typography
									variant="title1"
									sx={{
										flexGrow: 1,
										color: "white",
										textAlign: "center",
										position: "absolute",
										top: "79%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									Fluency Score {fluency}/100
								</Typography>
								<Typography
									variant="title1"
									sx={{
										flexGrow: 1,
										color: "white",
										textAlign: "center",
										position: "absolute",
										top: "83%",
										left: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									Pace: {pace} WPM
								</Typography>
								<Button
									variant="contained"
									color="primary"
									style={{
										flexGrow: 1,
										position: "absolute",
										borderRadius: "50%",
										top: "90%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										width: 48,
										height: 48,
										minWidth: 0,
										minHeight: 0,
									}}
									onClick={() => {
										Cookies.remove("thread_id");
										reset();
									}}
								>
									<SettingsBackupRestoreIcon style={{ fontSize: "1.5rem" }} />
								</Button>
							</Grid>
							<Grid item xs={12} md={4}></Grid>
						</Grid>
					</Container>
				</Box>
			</LanguageContext.Provider>
		</ThemeProvider>
	);
}

export default Main;
