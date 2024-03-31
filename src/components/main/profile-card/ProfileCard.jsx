import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../language-context/LanguageContext";
import languagesData from "../data/languages.json";
import Discussion from "../../discussion/Discussion.jsx";
import { motion } from "framer-motion";

const ProfileCard = (props) => {
	const { currentLanguage } = useContext(LanguageContext);
	const profileData = {
		name: languagesData[currentLanguage].agentName,
	};

	const animationStates = {
		IDLE: {
			scale: [1.4, 2, 1.4, 2, 1.4], // Erratically change scale
			rotate: [0, 10, -10, 10, 0], // Add rotation for dynamic effect
			transition: {
				duration: 8, // Speed up the transition for an erratic effect
				repeat: Infinity,
				ease: "linear", // Use a linear easing for a more erratic feel
			},
		},
		EXCITED: {
			scale: [1.6, 2, 1.6, 2, 1.6], // Erratically change scale
			rotate: [0, 10, -10, 10, 0], // Add rotation for dynamic effect
			transition: {
				duration: 2, // Speed up the transition for an erratic effect
				repeat: Infinity,
				ease: "linear", // Use a linear easing for a more erratic feel
			},
		},
		THINKING: {
			scale: [1.4, 1.4, 1.4], // Slight scale to keep the movement
			rotate: [0, 720], // Continuous rotation
			borderRadius: ["50%", "20%", "20%", "50%"], // Change borderRadius for rounded square edges
			transition: {
				duration: 5,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	// Define background styles for different states
	const backgroundStyles = {
		IDLE: "linear-gradient(to right, #0072ff, #00c6ff)", // Blue gradient
		EXCITED: "linear-gradient(to right, #ff7e5f, #feb47b)", // Orange gradient
		THINKING: "linear-gradient(to right, #6a11cb, #2575fc)", // Purple gradient
	};

	// We will need a piece of state to hold and change the animation state
	const [animationState, setAnimationState] = React.useState("IDLE");

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "absolute",
				top: "35%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				textAlign: "center",
				color: "white",
			}}
		>
			<Typography variant="h5" component="h2" gutterBottom>
				{profileData.name}
			</Typography>

			<motion.div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: 180,
					width: 180,
					borderRadius: "50%",
					background: backgroundStyles[animationState], // Set background based on animationState
					boxShadow: "0 0 8px rgba(255,255,255,0.5)",
				}}
				variants={animationStates}
				initial="IDLE"
				animate={animationState}
				// onClick or other event handlers can be used to change the state
				// For example, onClick={() => setAnimationState('EXCITED')}
			/>
			<Discussion
				updateFluency={props.updateFluency}
				agentName={profileData.name}
				language={currentLanguage}
				setAnimationState={setAnimationState}
			/>
		</Box>
	);
};

export default ProfileCard;
