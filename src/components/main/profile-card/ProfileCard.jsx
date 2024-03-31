import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LanguageContext } from "../language-context/LanguageContext";
import languagesData from "../data/languages.json";
import Discussion from "../../discussion/Discussion.jsx";
import { motion } from "framer-motion";


const ProfileCard = () => {
	const { currentLanguage } = useContext(LanguageContext);
	const profileData = {
		name: languagesData[currentLanguage].agentName,
	};

	const animationStates = {
		IDLE: {
			scale: 1,
			transition: {
				duration: 2,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
		EXCITED: {
			scale: [1, 1.1],
			rotate: [0, 20, -20, 20, 0],
			transition: {
				duration: 0.2,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
		THINKING: {
			x: [-10, 0, 10],
			scale: 0.98,
			boxShadow: [
				"0 0 8px rgba(255,255,255,0.5)",
				"0 0 12px rgba(255,255,255,0.8)",
				"0 0 8px rgba(255,255,255,0.5)",
			],
			transition: {
				duration: 4,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
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
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				textAlign: "center",
				color: "white",
			}}
		>
			<Typography variant="h5" component="h2" gutterBottom>
				{profileData.name}
			</Typography>
			{/* Enhanced Circular Breathing Animation for Pixar-like liveliness */}
			<motion.div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: 180,
					width: 180,
					borderRadius: "50%",
					background: "linear-gradient(#FDC830, #F37335)",
					boxShadow: "0 0 8px rgba(255,255,255,0.5)",
				}}
				variants={animationStates}
				initial="IDLE"
				animate={animationState}
				// onClick or other event handlers can be used to change the state
				// For example, onClick={() => setAnimationState('EXCITED')}
			/>
			<Discussion
				agentName={profileData.name}
				language={currentLanguage}
				setAnimationState={setAnimationState}
			/>
			<Typography variant="subtitle1">Learning {currentLanguage}</Typography>
		</Box>
	);
};

export default ProfileCard;
