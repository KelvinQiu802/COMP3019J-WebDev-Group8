'use client';

import {useState, ChangeEvent, FormEvent} from 'react';
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
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {green} from '@mui/material/colors';
import {isBlank} from '../../../utils/stringUtil';
import {useRouter} from 'next/navigation';
import {Alert} from '@mui/material';
import API_HOST from '../../../utils/host';

// Create a Material-UI theme
const theme = createTheme();

export default function LogIn() {
    // Use the useRouter provided by next.js for page navigation
    const router = useRouter();

    // Define state variables using useState
    let [unautherized, setUnautherized] = useState(false);
    let [btnDisabled, setBtnDisabled] = useState(true);

    // Define the state variable for user information
    const [userInfo, setUserInfo] = useState({
        userName: '',
        password: '',
    });

    // Handle changes in input field values
    const handleInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prev) => {
            // Update the user information and check if the "Log In" button should be disabled
            const updated = {...prev, [e.target.name]: e.target.value};
            setBtnDisabled(isBlank(updated.userName) || isBlank(updated.password));
            return updated;
        });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send a POST request to the login API endpoint
        const result = await fetch(`${API_HOST}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        setUnautherized(false);
        if (result.status == 200) {
            // If the login is successful, store the user's name and navigate to the home page
            localStorage.setItem('userName', userInfo.userName);
            router.push('/');
        } else if (result.status == 401) {
            // If the login fails due to incorrect credentials, show an error message and reset the form
            setUnautherized(true);
            setBtnDisabled(true);
            setUserInfo({userName: '', password: ''});
        } else {
            // Handle other error cases
            alert('Login failed, please try again.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: green[200]}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{mt: 1}}
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
                            value={userInfo.userName}
                            autoFocus
                        />
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

                        {unautherized && (
                            <Alert severity="error" sx={{width: 400}}>
                                The user name or password is incorrect.
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={btnDisabled}
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: green[400],
                                ':hover': {
                                    backgroundColor: green[600],
                                },
                            }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    href="/signup"
                                    variant="body2"
                                    sx={{color: green[800], textDecorationColor: green[800]}}
                                >
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
