import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../components/UserPool';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Log out the user when leaving the page
      const user = userPool.getCurrentUser();
      if (user) {
        user.signOut();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = new CognitoUser({
      Username: email.toLowerCase(),
      Pool: userPool,
    });
    const authDetails = new AuthenticationDetails({
      Username: email.toLowerCase(),
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('Login success', data);
        navigate('/dashboard'); // Redirect to dashboard after successful login
      },
      onFailure: (err) => {
        console.error('Login error', err);
        if (err.code === 'UserNotConfirmedException') {
          console.log('User is not confirmed');
          // Handle unconfirmed user
          navigate('/confirm');
        } else if (err.code === 'UserNotFoundException') {
          setError('User not found. Please sign up.');
        } else if (err.code === 'NotAuthorizedException') {
          setError('Incorrect username or password.');
        } else if (err.code === 'UserNotConfirmedException') {
          setError('User is not confirmed. Please confirm your email.');
        } else if (err.code === 'PasswordResetRequiredException') {
          setError('Password reset is required.');
        } else {
          setError(err.message || 'An error occurred while logging in');
        }
      },
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 3 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              {/* Grid items */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
