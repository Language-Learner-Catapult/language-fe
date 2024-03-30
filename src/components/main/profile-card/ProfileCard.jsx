import React, { useContext } from 'react';
import { Typography, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LanguageContext } from '../language-context/LanguageContext';
import languagesData from '../data/languages.json';

const ProfileCard = () => {
    const { currentLanguage } = useContext(LanguageContext);
    const profileData = {
        name: languagesData[currentLanguage].agentName,
        avatarUrl: languagesData[currentLanguage].image // Ensure this points to the correct image path
    };
    console.log(profileData.avatarUrl)

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
                // Ensure the text color is visible on the background gradient
                color: 'white', // Adjust as needed depending on your background
            }}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                {profileData.name}
            </Typography>
            <Avatar
                alt={profileData.name}
                src={profileData.avatarUrl}
                sx={{
                    width: 180, // Adjust the avatar size accordingly
                    height: 180,
                    margin: '8px 0',
                    // If your background is light, consider adding a subtle shadow for depth
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            />
            <Typography variant="subtitle1">
                Learning {currentLanguage}
            </Typography>
        </Box>
    );
};

export default ProfileCard;
