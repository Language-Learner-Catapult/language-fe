import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';
import app from '../../firebaseconfig';

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
  const handleGoogleSignIn = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        Cookies.set('user_id', user.uid, { expires: 1 });
        setAuthenticated(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Language Learner
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Learn a new language through interactive conversations with AI!
          </Typography>
          <Box mt={4}>
            <SignInButton startIcon={<GoogleIcon />} onClick={handleGoogleSignIn}>
              Sign in with Google
            </SignInButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;