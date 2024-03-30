import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie';

import LanguageSelector from './language-selector/LanguageSelector';
import ProfileCard from './profile-card/ProfileCard';
import SessionDetails from './session-details/SessionDetails'; // New component for session details
import LearningProgress from './learning-progress/LearningProgress'; // New component for learning progress
import Footer from './footer/Footer';
import { LanguageContext } from './language-context/LanguageContext';
import languagesData from './data/languages.json';
import theme from "./theme";

function Main() {
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userId = Cookies.get('user_id');
        setUserName(userId); // Fetch and set user name
    }, []);

    const languageGradient = useMemo(() => {
        return languagesData[currentLanguage].gradient;
    }, [currentLanguage]);

    return (
        <ThemeProvider theme={theme}>
            <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
                <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: languageGradient }}>
                    <AppBar position="static" sx={{height: '10vh', justifyContent: 'center'}}>
                        <Toolbar>
                            <LanguageSelector />
                            <Box sx={{ flexGrow: 1 }} />
                            <Avatar alt={userName} src="/path-to-avatar.jpg" sx={{ width: 40, height: 40 }} />
                            <Typography sx={{ marginLeft: 1 }}>{userName}</Typography>
                        </Toolbar>
                    </AppBar>
                    <Container component="main" sx={{ flexGrow: 1, overflow: 'auto', padding: '20px'}}>
                        <Grid container spacing={3} alignItems="center" justifyContent="center">
                            <Grid item xs={12} md={4}>
                                <SessionDetails />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <ProfileCard />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <LearningProgress />
                            </Grid>
                        </Grid>
                    </Container>
                    <Footer />
                </Box>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
}

export default Main;
