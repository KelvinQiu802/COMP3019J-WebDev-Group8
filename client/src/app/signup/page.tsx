'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
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
import { green } from '@mui/material/colors';
import { isBlank } from '../../../utils/stringUtil';
import { useRouter } from 'next/navigation';
import { Alert } from '@mui/material';
import API_HOST from '../../../utils/host';
import { ToastContainer, toast } from 'react-toastify';

// Create a Material-UI theme
const theme = createTheme();

export default function SignUp() {
  const router = useRouter();

  const notifyLogin = () => toast(`Registered successfully, please login`);

  // Define state variables for button and name availability
  let [btnDisabled, setBtnDisabled] = useState(true);
  let [hasSameName, setHasSameName] = useState(false);

  // Define the state variable for user information
  const [userInfo, setUserInfo] = useState({
    userName: '',
    password: '',
    passwordRepeat: '',
  });

  // Handle changes in input field values
  const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => {
      // Update user information and check if the "Sign Up" button should be disabled
      const updated = { ...prev, [e.target.name]: e.target.value };
      setBtnDisabled(
        isBlank(updated.userName) ||
          isBlank(updated.password) ||
          isBlank(updated.passwordRepeat) ||
          updated.password != updated.passwordRepeat
      );
      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Send a POST request to the user creation API endpoint
    const result = await fetch(`${API_HOST}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (result.status != 200) {
      alert('Sign up failed, please try again.');
    } else {
      // If sign-up is successful, navigate to the login page
      // TODO
      notifyLogin();
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  // Check if the chosen username is already in use
  const handleNameCheck = async () => {
    console.log(`${API_HOST}/users`);
    const users = await fetch(`${API_HOST}/users/`);
    const userList = await users.json();
    setHasSameName(userList.includes(userInfo.userName));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: green[200] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="userName"
              color="success"
              onChange={handleInfoChange}
              onBlur={handleNameCheck} // Trigger the username availability check
              value={userInfo.userName}
              autoFocus
            />
            {hasSameName && (
              // Show an error message if the chosen username is already in use
              <Alert severity="error" sx={{ width: 400 }}>
                The user name has been used.
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              color="success"
              onChange={handleInfoChange}
              value={userInfo.password}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="passwordRepeat"
              label="Confirm Password"
              type="password"
              id="passwordRepeat"
              color="success"
              onChange={handleInfoChange}
              value={userInfo.passwordRepeat}
              autoComplete="current-password"
            />
            {userInfo.password != userInfo.passwordRepeat && (
              <Alert severity="error" sx={{ width: 400 }}>
                The passwords entered twice do not match.
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={btnDisabled || hasSameName}
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: green[400],
                ':hover': {
                  backgroundColor: green[600],
                },
              }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  sx={{ color: green[800], textDecorationColor: green[800] }}
                >
                  {'Already have an account? Login'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ThemeProvider>
  );
}
