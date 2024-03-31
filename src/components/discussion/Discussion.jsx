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

	useEffect(() => {
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
					}, 3000);
				});
		}
	}, []);

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
		} catch (err) {
			props.setAnimationState("IDLE");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
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
					}, 4000);
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
