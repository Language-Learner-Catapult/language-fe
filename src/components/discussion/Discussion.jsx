import React, { useEffect, useRef, useState } from "react";
import "./discussion.css";
import app from "../../firebaseconfig";
import UIFx from "uifx";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import MicOffOutlinedIcon from "@mui/icons-material/MicOffOutlined";
import hark from "hark";

const Discussion = (props) => {
	const db = getFirestore(app);
	const mediaRecorderRef = useRef(null);
	const effectRan = useRef(false);
	const [isRecording, setIsRecording] = useState(false); // Added state to track recording status
	const [fluencyScore, setFluencyScore] = useState(20);

	useEffect(() => {
		console.log(props);
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			var speech = hark(stream); // init hark stream
			speech.on("stopped_speaking", function () {
				// Start a timeout when stopped speaking is detected
				if (isRecording) {
					stopRecording();
				}
			});
		});

		if (!effectRan.current) {
			if (!Cookies.get("thread_id")) {
				axios
					.post("http://127.0.0.1:5000/create_thread", {
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
						}, 4000);
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
			var stream = await navigator.mediaDevices.getUserMedia({ audio: true });

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
			console.log("stopped_speaking");
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
				proficiency: fluencyScore,
			};

			axios
				.post(
					"http://127.0.0.1:5000/messages/" +
					Cookies.get("thread_id") +
					"/send",
					base64data
				)
				.then((response) => {
					props.setAnimationState("EXCITED");
					props.setPace(Math.round(response.data.pace));
					props.updateFluency(response.data.fluency);
					const sound = new UIFx(
						"data:audio/webm;base64," + response.data.audio,
						{
							volume: 1.0,
						}
					);
					sound.play();
					setTimeout(() => {
						props.setAnimationState("IDLE");
					}, 8000);
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
				{!isRecording ? (
					<MicOffOutlinedIcon
						fontSize={"large"}
						style={{ color: "white" }}
						className={"svg_icons"}
					/>
				) : (
					<MicOutlinedIcon
						fontSize={"large"}
						style={{ color: "white" }}
						className={"svg_icons"}
					/>
				)}
			</button>
		</>
	);
};

export default Discussion;
