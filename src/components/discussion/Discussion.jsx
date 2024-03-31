import React, { useEffect, useRef, useState } from "react";
import "./discussion.css";
import app from "../../firebaseconfig";
import UIFx from "uifx";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import MicOffIcon from "@mui/icons-material/MicOff";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const Discussion = (props) => {
	const db = getFirestore(app);
	const mediaRecorderRef = useRef(null);
	const effectRan = useRef(false);
	const [isRecording, setIsRecording] = useState(false); // Added state to track recording status

	useEffect(() => {
		console.log(props);
		if (!effectRan.current) {
			if (!Cookies.get("thread_id")) {
				axios
					.post("http://localhost:5000/create_thread", {
						name: props.agentName,
						language: props.language,
					})
					.then((response) => {
						Cookies.set("thread_id", response.data.thread_id, { expires: 1 });
						props.setAnimationState("EXCITED");
						const sound = new UIFx(
							"data:audio/webm;base64," + response.data.audio,
							{
								volume: 1.0,
							}
						);
						sound.play();
						setTimeout(() => {
							props.setAnimationState("IDLE");
						}, 20000);
					});
			}
		}

		return () => (effectRan.current = true);
	}, []);

	const toggleRecording = async () => {
		if (isRecording) {
			stopRecording();
		} else {
			await startRecording();
		}
	};

	const startRecording = async () => {
		props.setAnimationState("THINKING");
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			let mimeType = "audio/wav";
			if (!MediaRecorder.isTypeSupported(mimeType)) {
				mimeType = "audio/webm"; // Fallback to webm if wav is not supported
			}
			mediaRecorderRef.current = new MediaRecorder(stream, {
				mimeType: mimeType,
			});

			mediaRecorderRef.current.addEventListener(
				"dataavailable",
				handleDataAvailable
			);
			mediaRecorderRef.current.start();
			setIsRecording(true); // Update recording status
		} catch (err) {
			props.setAnimationState("IDLE");
			console.error("Error accessing microphone:", err);
			props.setAnimationState("IDLE"); // Stop talking if there is an error

		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false); // Update recording status
			props.setAnimationState("THINKING");
		}
	};

	const handleDataAvailable = async (event) => {
		if (event.data.size > 0) {
			const audioBlob = new Blob([event.data], { type: "audio/webm" });

			await uploadAudioToFirebase(audioBlob);
		}
	};

	const uploadAudioToFirebase = async (audioBlob) => {
		const reader = new FileReader();

		reader.readAsDataURL(audioBlob); // Convert audioBlob to Base64 Data URL

		reader.onloadend = async () => {
			const base64data = {
				audio: reader.result,
				name: props.agentName,
				language: props.language,
			};

			axios
				.post(
					"http://localhost:5000/messages/" +
						Cookies.get("thread_id") +
						"/send",
					base64data
				)
				.then((response) => {
					props.setAnimationState("EXCITED");
					const sound = new UIFx(
						"data:audio/webm;base64," + response.data.audio,
						{
							volume: 1.0,
						}
					);
					sound.play();
					setTimeout(() => {
						props.setAnimationState("IDLE");
					}, 14000);
				});

			// await setDoc(
			// 	doc(db, "audioRecords", Cookies.get("user_id"), Cookies.get("user_id")),
			// 	base64data
			// );
		};
	};

	return (
		<>
			<button onClick={toggleRecording}>
				{isRecording ? <MicOffIcon /> : <KeyboardVoiceIcon />}
			</button>
		</>
	);
};

export default Discussion;
