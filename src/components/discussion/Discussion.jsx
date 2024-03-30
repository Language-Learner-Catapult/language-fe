import React, { useState, useEffect, useRef } from 'react';
import './discussion.css';

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
        // ... Your Firebase upload logic here ...
    }

    return (
        <div className={`character ${talking ? 'talk' : ''}`}>
            <div className="mouth"></div>
        </div>
    );
};

export default Discussion;
