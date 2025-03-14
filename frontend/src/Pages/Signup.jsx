import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Link } from '@mui/material';

const Signup = () => {
  
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  
  const [errors, setErrors] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  
  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formValues.username ? '' : 'Username is required';
    tempErrors.email = /$^|.+@.+..+/.test(formValues.email) ? '' : 'Email is not valid';
    tempErrors.password = formValues.password ? '' : 'Password is required';
    tempErrors.confirmPassword = formValues.password === formValues.confirmPassword ? '' : 'Passwords do not match';
    setErrors({ ...tempErrors });

    return Object.values(tempErrors).every((x) => x === '');
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted Successfully', formValues);
      
    } else {
      console.log('Validation Failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" alignItems="center">
            {/* Username */}
            <TextField
              label="Username"
              fullWidth
              name="username"
              value={formValues.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{ mb: 2 }}
            />

            {/* Email */}
            <TextField
              label="Email"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            {/* Password */}
            <TextField
              label="Password"
              fullWidth
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 2 }}
            />

            {/* Confirm Password */}
            <TextField
              label="Confirm Password"
              fullWidth
              name="confirmPassword"
              type="password"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 2 }}
            />

            {/* Sign Up Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </form>

        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;

