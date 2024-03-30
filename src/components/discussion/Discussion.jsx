import React, { useEffect, useRef, useState } from "react";
import "./discussion.css";
import app from "../../firebaseconfig";
import UIFx from "uifx";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Discussion = (props) => {
	const db = getFirestore(app);
	const mediaRecorderRef = useRef(null);
	const [base64Audio, setAudio] = useState("");

	useEffect(() => {
		if (!Cookies.get("thread_id")) {
			axios.get("http://localhost:5000/create_thread").then((response) => {
				Cookies.set("thread_id", response.data, { expires: 1 });
			});
		}
	}, []);

	const startRecording = async () => {
		props.setTalking(true);
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
		} catch (err) {
			console.error("Error accessing microphone:", err);
			props.setTalking(false); // Stop talking if there is an error
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			props.setTalking(false);
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
			const base64data = { audio: reader.result };

			axios
				.post(
					"http://localhost:5000/messages/" +
						Cookies.get("thread_id") +
						"/send",
					base64data
				)
				.then(async (response) => {
					const sound = new UIFx(
						"data:audio/webm;base64," + response.data.audio,
						{
							volume: 0.8,
						}
					);
					sound.play();
				});

			let uuid = uuidv4();
			await setDoc(
				doc(
					db,
					"audioRecords",
					Cookies.get("user_id"),
					Cookies.get("user_id"),
					uuid
				),
				base64data
			);
		};
	};

	return (
		<>
			<button onClick={startRecording}>Start Recording</button>
			<button onClick={stopRecording}>Stop Recording</button>
		</>
	);
};

export default Discussion;
