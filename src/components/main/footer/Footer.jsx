import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
// Removed the unused useNavigate import
import { db } from "../../../firebaseconfig";
import { doc, getDoc } from "firebase/firestore";

const ScrollDownButton = () => {
	const theme = useTheme();
	const [transcriptText, setTranscriptText] = useState("");
	const [error, setError] = useState("");

	async function handleTranscript() {
		const docRef = doc(db, "textTest", "yDJwVRGdSl7L85F7Ov7t");
		try {
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				// Updated to use 'whispertest' field
				setTranscriptText(docSnap.data().whispertest); // Setting transcript text from document
			} else {
				console.log("No such document!");
				setError("No such document!");
			}
		} catch (error) {
			console.error("Error getting document:", error);
			setError("Error getting document: " + error.message);
		}
	}

	return (
		<div
			style={{
				textAlign: "center",
				position: "absolute",
				left: "50%",
				bottom: "5%",
				transform: "translateX(-50%)",
			}}
		>
			<Typography
				variant="h6"
				style={{ marginBottom: theme.spacing(1), color: "white" }}
			>
				See Transcription
			</Typography>
			{/* Display the fetched transcript text or error */}
			{transcriptText && (
				<Typography style={{ color: "white", marginBottom: theme.spacing(2) }}>
					{transcriptText}
				</Typography>
			)}
			{error && (
				<Typography style={{ color: "red", marginBottom: theme.spacing(2) }}>
					{error}
				</Typography>
			)}
			<Button
				variant="contained"
				color="primary"
				style={{
					borderRadius: "50%",
					width: 48,
					height: 48,
					padding: theme.spacing(1),
					minWidth: 0,
					minHeight: 0,
				}}
				onClick={handleTranscript}
			>
				<KeyboardArrowDownIcon style={{ fontSize: "1.5rem" }} />
			</Button>
		</div>
	);
};

export default ScrollDownButton;
