// SessionDetails.js
import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const SessionDetails = () => {
    const sessionData = {
        timeSpent: 120, // minutes
        activitiesCompleted: 5,
        performance: 75, // percentage
        recentWords: ['hello', 'world', 'language'],
        recentPhrases: ['How are you?', 'What is your name?', 'Where are you from?']
    };

    return (
        <Card sx={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Session Details
                </Typography>
                <Box>
                    <Typography variant="body2">Time Spent</Typography>
                    <LinearProgress variant="determinate" value={sessionData.timeSpent} sx={{ height: 10, borderRadius: 5, my: 1 }} />
                </Box>
                <Box>
                    <Typography variant="body2">Activities Completed</Typography>
                    <LinearProgress variant="determinate" value={sessionData.activitiesCompleted * 20} sx={{ height: 10, borderRadius: 5, my: 1 }} />
                </Box>
                <Box>
                    <Typography variant="body2">Performance</Typography>
                    <LinearProgress variant="determinate" value={sessionData.performance} sx={{ height: 10, borderRadius: 5, my: 1 }} />
                </Box>
                <Box>
                    <Typography variant="body2">Recent Words</Typography>
                    {sessionData.recentWords.map(word => (
                        <Typography key={word} variant="caption" display="block">{word}</Typography>
                    ))}
                </Box>
                <Box>
                    <Typography variant="body2">Recent Phrases</Typography>
                    {sessionData.recentPhrases.map(phrase => (
                        <Typography key={phrase} variant="caption" display="block">{phrase}</Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default SessionDetails;
