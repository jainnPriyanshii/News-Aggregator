import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
const providers = [{ id: 'credentials', name: 'Email and Password' }];


const signIn = async (provider, formData) => {
  
  try {
    const email = formData?.get('email')
    const password = formData?.get('password')
    await axios.post('http://localhost:3000/backend/auth/signIn/', { email, password }, { withCredentials: true });


    window.location.href = '/'
  } catch (error) {
    console.error("Signin error:", error);

  
    const errorMessage = error.response?.data?.message || 'An error occurred during sign in.';
      setErrors(errorMessage);
  }
};

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
      />
    </AppProvider>
    // preview-end
  );
}
