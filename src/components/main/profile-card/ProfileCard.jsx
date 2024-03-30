import React, { useContext } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { LanguageContext } from '../language-context/LanguageContext';

const ProfileCard = () => {
    const { currentLanguage } = useContext(LanguageContext);

    // Dummy data for the profile, replace with actual data from your backend
    const profileData = {
        name: "John",
        languageTeaching: currentLanguage,
        avatarUrl: "/path-to-avatar.jpg", // Replace with actual path
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardContent>
                <Avatar alt={profileData.name} src={profileData.avatarUrl} sx={{ width: 56, height: 56, margin: 'auto' }} />
                <Typography gutterBottom variant="h5" component="div" align="center">
                    {profileData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    Teaching {profileData.languageTeaching}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
