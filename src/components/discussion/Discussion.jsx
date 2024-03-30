import React, { useState, useRef } from 'react';
import './discussion.css';
import app from '../../firebaseconfig';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const Discussion = () => {
    const db = getFirestore(app);
    const [talking, setTalking] = useState(false);
    const mediaRecorderRef = useRef(null);

    const startRecording = async () => {
        setTalking(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            let mimeType = 'audio/wav';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'audio/webm'; // Fallback to webm if wav is not supported
            }
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: mimeType });

            mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
            mediaRecorderRef.current.start();
        } catch (err) {
            console.error('Error accessing microphone:', err);
            setTalking(false); // Stop talking if there is an error
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setTalking(false);
        }
    };

    const handleDataAvailable = async (event) => {
        if (event.data.size > 0) {
            const audioBlob = new Blob([event.data], { type: 'audio/webm' });

            await uploadAudioToFirebase(audioBlob);
        }
    };

    const uploadAudioToFirebase = async (audioBlob) => {
        const reader = new FileReader();

        reader.readAsDataURL(audioBlob); // Convert audioBlob to Base64 Data URL

        reader.onloadend = async () => {
            const base64data = {audio: reader.result};
            let uuid = uuidv4();
            await setDoc(
                doc(
                    db,
                    'audioRecords',
                    Cookies.get("user_id"),
                    Cookies.get("user_id"),
                    uuid,
                ),
                base64data,
            );
        };
    };

    return (<>
        <div className={`character ${talking ? 'talk' : ''}`}>
            <div className="mouth"></div>
        </div>
    <button onClick={startRecording}>Start Recording</button>
    <button onClick={stopRecording}>Stop Recording</button>
        </>
);
};

export default Discussion;
