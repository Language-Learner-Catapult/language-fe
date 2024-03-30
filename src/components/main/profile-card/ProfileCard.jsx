import React, { useContext } from 'react';
import { Card, Typography, Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LanguageContext } from '../language-context/LanguageContext';

const ProfileCard = () => {
    const { currentLanguage } = useContext(LanguageContext);

    // Dummy data for the profile, replace with actual data from your backend
    const profileData = {
        name: "John Doe",
        avatarUrl: "/path-to-avatar.jpg", // Replace with actual path
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute', // Position it in the middle
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 250, // Adjust size accordingly
                height: 250,
                borderRadius: '50%',
                overflow: 'hidden',
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    boxShadow: '0 4px 10px 0 rgba(0,0,0,0.2)',
                    borderRadius: '50%',
                    backgroundColor: 'primary.main', // Adjust the color based on your theme
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    {profileData.name}
                </Typography>
                <Avatar
                    alt={profileData.name}
                    src={profileData.avatarUrl}
                    sx={{
                        width: 100, // Adjust the avatar size accordingly
                        height: 100,
                        margin: '8px 0',
                        border: '4px solid', // Add a border if you like
                        borderColor: 'background.paper', // Adjust border color based on your theme
                    }}
                />
                <Typography variant="subtitle1" color="text.secondary">
                    Learning {currentLanguage}
                </Typography>
            </Card>
        </Box>
    );
};

export default ProfileCard;
