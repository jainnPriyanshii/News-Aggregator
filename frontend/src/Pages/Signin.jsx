import * as React from 'react';
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const providers = [{name: 'Email and password' }];

const NotificationsSignInPageError = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState(null);

  const signIn = async (provider, formData) => {
    try {
      const email = formData?.get('email');
      const password = formData?.get('password');

      const response = await axios.post('http://localhost:3000/backend/auth/signin/', { email, password }, { withCredentials: true });

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Navigate to home page
      navigate('/');

      return { type: 'CredentialsSignin', error: null };
    } catch (error) {
      console.error("Signin error:", error);

  
      const errorMessage = error.response?.data?.message || 'An error occurred during sign in.';
      setErrors(errorMessage);

      return { type: 'CredentialsSignin', error: errorMessage };
    }
  };

  return (
    <AppProvider theme={theme}>
      {errors && <p style={{ color: 'red', textAlign: 'center' }}>{errors}</p>}
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
};

export default NotificationsSignInPageError;


