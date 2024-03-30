import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const SessionStats = () => {
    // Dummy stats data, replace with actual data from your backend
    const statsData = {
        wordsLearned: 4,
        conversationTopic: "Coffee Shop",
        // Add more stats as needed
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', marginTop: 2 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Session Stats
                </Typography>
                <Typography variant="body2">
                    Words Learned: {statsData.wordsLearned}
                </Typography>
                <Typography variant="body2">
                    Conversation Topic: {statsData.conversationTopic}
                </Typography>
                {/* Add more stat items here */}
            </CardContent>
        </Card>
    );
};

export default SessionStats;
