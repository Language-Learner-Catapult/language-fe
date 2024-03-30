import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const ScrollDownButton = () => {
    const theme = useTheme();

    function handleTranscript() {
        //implement
    }

    return (
        <div style={{
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            bottom: '5%', // Reduced to take up less space
            transform: 'translateX(-50%)'
        }}>
            <Typography
                variant="h6"
                style={{ marginBottom: theme.spacing(1), color: 'white' }} // Text color set to white
            >
                See Transcription
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{
                    borderRadius: '50%',
                    width: 48, // Smaller button
                    height: 48, // Smaller button
                    padding: theme.spacing(1),
                    minWidth: 0, // Ensure the button can be smaller without padding
                    minHeight: 0,
                }}
                onClick={() => {
                    handleTranscript();
                }}
            >
                <KeyboardArrowDownIcon style={{ fontSize: '1.5rem' }} /> {/* Smaller icon */}
            </Button>
        </div>
    );
};

export default ScrollDownButton;
