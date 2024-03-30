import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, AppBar, Toolbar } from '@mui/material';
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

const BenefitCard = styled(Card)(({ theme, backgroundColor, titleColor }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  backgroundColor: backgroundColor,
  '& .MuiTypography-h5': {
    background: titleColor,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
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
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="lingua logo" style={{ width: '40px', height: '40px', marginRight: '8px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontWeight: 'bold' }}>
                Lingua
            </Typography>
            </Box>
        </Toolbar>
        </AppBar>
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h1" sx={{ fontWeight: 700, color: 'white', mb: 2 }}>
                Master a language conversationally.
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 400, color: 'white', mb: 4 }}>
                We bring a fluent conversational partner right to your laptop with the power of AI.
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
      <Box sx={{ py: 8, backgroundColor: 'white' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 6 }}>
            Maximize your speaking skills with our innovative approach.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <BenefitCard
                backgroundColor="#F0F8FF"
                titleColor="black"
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Learn by Speaking
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    They say the best way to learn a language is living in the country. We deliver the next best thing right to your fingertips.
                    Engage in interactive conversations with AI to learn a new language, rather than completing mundane quizzes.
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'lightgray',
                    borderRadius: '16px',
                    flexShrink: 0,
                    ml: 2,
                  }}
                />
              </BenefitCard>
            </Grid>
            <Grid item xs={12}>
              <BenefitCard
                backgroundColor="#FFF0F5"
                titleColor="black"
                sx={{ flexDirection: 'row-reverse' }}
              >
                <Box
                  sx={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'lightgray',
                    borderRadius: '16px',
                    flexShrink: 0,
                    mr: 2,
                  }}
                />
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Detailed Insights
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Get comprehensive feedback on your tone and cadence to help you sound like a native speaker. Other apps don't offer this level of detail.
                  </Typography>
                </CardContent>
              </BenefitCard>
            </Grid>
            <Grid item xs={12}>
              <BenefitCard
                backgroundColor="#F0FFF0"
                titleColor="black"
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                    Track Your Progress
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Receive score reports after each session to monitor your improvement. This gamified approach makes learning more fun and engaging.
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'lightgray',
                    borderRadius: '16px',
                    flexShrink: 0,
                    ml: 2,
                  }}
                />
              </BenefitCard>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;