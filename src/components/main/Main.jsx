import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';

import LanguageSelector from './language-selector/LanguageSelector';
import ProfileCard from './profile-card/ProfileCard';
import SessionStats from './session-stats/SessionStats';
import Footer from './footer/Footer';
import { LanguageContext } from './language-context/LanguageContext';
import languagesData from './data/languages.json';
import theme from "./theme";

import "./Main.css";

function Main() {
    const [currentLanguage, setCurrentLanguage] = useState('English');
    const [userName, setUserName] = useState('');
    const [userLevel, setUserLevel] = useState('Beginner'); // Example level, replace with real data

    // Retrieve user's name from cookies
    useEffect(() => {
        const userId = Cookies.get('user_id');
        // Your fetch logic here
        setUserName('John Doe'); // Replace with fetched data
    }, []);


    const languageGradient = useMemo(() => {
        return languagesData[currentLanguage].gradient;
    }, [currentLanguage]);

    return (
        <ThemeProvider theme={theme}>
            <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
                <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', background: languageGradient}}>
                    <AppBar position="static" sx={{ height: '10vh', justifyContent:'center' }}>
                        <Toolbar>
                            <LanguageSelector />
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', pr: 2 }}>
                                <Avatar alt={userName} src="/path-to-avatar.jpg" sx={{ width: 40, height: 40 }} /> {/* Reduced avatar size */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                    <Typography variant="subtitle1">{Cookies.get("user_id")}</Typography>
                                    <Typography variant="caption">{`Level: ${userLevel}`}</Typography>
                                </Box>
                            </Box>
                        </Toolbar>
                    </AppBar>

                    <Container component="main" sx={{ flex: 1, padding: '20px 0' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={6}>
                                <ProfileCard />
                            </Grid>
                            <Grid item xs={12} md={4} lg={6}>
                                <SessionStats />
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
