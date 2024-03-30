import React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';
import app from '../../firebaseconfig';
import { useNavigate } from 'react-router-dom';

const SignInButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  textTransform: 'none',
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: '0.05rem',
  boxShadow: '0 3px 5px 2px rgba(66, 133, 244, .3)',
  background: 'linear-gradient(45deg, #4285F4 30%, #34A853 90%)',
  color: 'white',
  '&:hover': {
    backgroundColor: '#357ae8',
  },
}));

const LandingPage = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        Cookies.set('user_id', user.uid, { expires: 1 });
        setAuthenticated(true);
        navigate('/learn');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
                Master a Language Faster by Speaking with AI
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 400, color: 'white', mb: 4 }}>
                Transform your language learning experience through 24/7 immersion with personalized AI chat-based tools.
              </Typography>
              <SignInButton startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
                Sign in with Google
              </SignInButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '16px',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              {/* Placeholder for phone mockup */}
              <Box sx={{ width: '100%', height: '400px', backgroundColor: 'lightgray', borderRadius: '16px' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage;