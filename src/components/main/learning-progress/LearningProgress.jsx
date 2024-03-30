import React from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const LearningProgress = () => {
    const progressData = {
        wordsLearned: 150,
        totalWords: 1000,
        phrasesLearned: 50,
        totalPhrases: 300,
        lessonsCompleted: 20,
        totalLessons: 50
    };

    // Gradient styles for LinearProgress
    const progressGradient = (value) => ({
        height: 10,
        borderRadius: 5,
        my: 1,
        '& .MuiLinearProgress-bar': {
            backgroundImage: `linear-gradient(to right, #64B6AC, #3C8CE7 ${value}%, #D16BA5)`,
        },
    });

    return (
        <Card sx={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            top: '50%',
            background: 'linear-gradient(145deg, #ECE9E6, #FFFFFF)' // Card background gradient
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Learning Progress
                </Typography>
                <Box>
                    <Typography variant="body2">Words Learned</Typography>
                    <LinearProgress variant="determinate" value={(progressData.wordsLearned / progressData.totalWords) * 100} sx={progressGradient((progressData.wordsLearned / progressData.totalWords) * 100)} />
                </Box>
                <Box>
                    <Typography variant="body2">Phrases Learned</Typography>
                    <LinearProgress variant="determinate" value={(progressData.phrasesLearned / progressData.totalPhrases) * 100} sx={progressGradient((progressData.phrasesLearned / progressData.totalPhrases) * 100)} />
                </Box>
                <Box>
                    <Typography variant="body2">Lessons Completed</Typography>
                    <LinearProgress variant="determinate" value={(progressData.lessonsCompleted / progressData.totalLessons) * 100} sx={progressGradient((progressData.lessonsCompleted / progressData.totalLessons) * 100)} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default LearningProgress;
