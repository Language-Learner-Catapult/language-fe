import React, { useState, useEffect, useRef } from 'react';
import './discussion.css';
import firebase from 'firebase';

const Discussion = () => {
    const [talking, setTalking] = useState(false);
    const mediaRecorderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTalking(prevTalking => !prevTalking);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Start Recording on Component Mount
    useEffect(() => {
        async function startRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

                // Use MediaRecorder for WAV support (check browser compatibility)
                mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/wav' });

                mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
                mediaRecorderRef.current.start();
            } catch (err) {
                console.error('Error accessing microphone:', err);
            }
        }

        startRecording();

        return () => {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();
            }
        }
    }, []);

    const handleDataAvailable = (event) => {
        if (event.data.size > 0) {
            const audioBlob = new Blob([event.data], { type: 'audio/wav' });

            uploadAudioToFirebaseJSON(audioBlob);
        }
    }

    const uploadAudioToFirebaseJSON = (audioBlob) => {
        const reader = new FileReader();

        reader.readAsDataURL(audioBlob); // Convert audioBlob to Base64 Data URL

        reader.onloadend = () => {
            const base64data = reader.result;

            // Example JSON Structure
            const jsonData = {
                audio: base64data
            };

            // Assuming you have Firebase configured and a reference 'audioRecords'
            const firebaseRef = firebase.database().ref('audioRecords');
            firebaseRef.push(jsonData); // Upload to Firebase
        };
    };


    return (
        <div className={`character ${talking ? 'talk' : ''}`}>
            <div className="mouth"></div>
        </div>
    );
};

export default Discussion;
