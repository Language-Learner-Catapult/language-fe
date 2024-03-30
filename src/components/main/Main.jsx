import "./Main.css";
import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LanguageSelector from './language-selector/LanguageSelector';
import ProfileCard from './profile-card/ProfileCard';
import SessionStats from './session-stats/SessionStats';
import Footer from './footer/Footer';
import { LanguageContext } from './language-context/LanguageContext';
import languagesData from './data/languages.json';

function Main() {
    const [currentLanguage, setCurrentLanguage] = useState('English');

    const theme = createTheme({
        // Customize the theme here
    });

    const languageGradient = useMemo(() => {
        return languagesData[currentLanguage].gradient;
    }, [currentLanguage]);

    return (
        <ThemeProvider theme={theme}>
            <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
                <Box style={{ background: languageGradient }}>
                    <LanguageSelector />
                    <ProfileCard />
                    <SessionStats />
                    <Footer />
                </Box>
            </LanguageContext.Provider>
        </ThemeProvider>
    );
}

export default Main;
