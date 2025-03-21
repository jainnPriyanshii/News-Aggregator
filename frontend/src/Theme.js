import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      // Define your primary and secondary colors based on your gradient
      primary: {
        main: '#093745', // Darker blue from your gradient
      },
      secondary: {
        main: '#6e7a7a', // Lighter gray from your gradient
      },
      background: {
        // Keep your gradient as the background for both modes or adjust for dark/light
        default: mode === 'light' 
          ? '#ffffff' 
          : '#121212',
        paper: mode === 'light'
          ? '#ffffff'
          : '#1e1e1e',
      },
    },
    components: {
      // Style the root element
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: 'linear-gradient(to top, #6e7a7a 0%, #093745 100%)',
            margin: 0,
            padding: 0,
          },
          '#root': {
            maxWidth: '1280px',
            margin: '0 auto',
            paddingTop: 0,
            textAlign: 'center',
          },
        },
      },
      // Style for logos
      MuiBox: {
        styleOverrides: {
          root: {
            '&.logo': {
              height: '6em',
              padding: '1.5em',
              willChange: 'filter',
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #646cffaa)',
              },
              '&.react:hover': {
                filter: 'drop-shadow(0 0 2em #61dafbaa)',
              },
              // Add the animation for the second logo
              '&.animate': {
                animation: 'logo-spin infinite 20s linear',
              },
            },
          },
        },
      },
      // Style for cards
      MuiCard: {
        styleOverrides: {
          root: {
            padding: '2em',
          },
        },
      },
      // Additional styles
      MuiTypography: {
        styleOverrides: {
          root: {
            '&.read-the-docs': {
              color: '#888',
            },
          },
        },
      },
    },
    // Define the keyframes
    '@keyframes logo-spin': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  });
};