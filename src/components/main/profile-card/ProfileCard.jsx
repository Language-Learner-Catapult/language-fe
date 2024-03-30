import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import { LanguageContext } from '../language-context/LanguageContext';
import languagesData from '../data/languages.json';
import Discussion from '../../discussion/Discussion.jsx';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileCard = () => {
    const { currentLanguage } = useContext(LanguageContext);
    const profileData = {
        name: languagesData[currentLanguage].agentName,
        // avatarUrl will not be used for the image anymore
    };

    // Function to generate random animation for each bar
    const generateAnimation = () => ({
        hidden: { scaleY: 0.2 },
        show: {
            scaleY: [0.2, Math.random() + 0.5, Math.random()],
            transition: {
                duration: Math.random() * 0.5 + 0.5, // Random duration between 0.5 to 1 second
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'mirror',
            }
        }
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
            }}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                {profileData.name}
            </Typography>
            {/* Animated Bars with Separate Random Animations */}
            <Box
                sx={{
                    display: 'flex',
                    height: 180,
                    margin: '8px 0',
                }}
            >
                <AnimatePresence>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <motion.div
                            key={`bar-${index}`}
                            style={{
                                background: 'white',
                                width: '20px',
                                height: '100%',
                                margin: '0 2px',
                                borderRadius: '10px',
                                originY: 1, // Animation origin at the bottom
                            }}
                            variants={generateAnimation()} // Call generateAnimation to get unique animations
                            initial="hidden"
                            animate="show"
                        />
                    ))}
                </AnimatePresence>
            </Box>
            <Discussion/>
            <Typography variant="subtitle1">
                Learning {currentLanguage}
            </Typography>
        </Box>
    );
};

export default ProfileCard;
