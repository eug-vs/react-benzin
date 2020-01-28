import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import 'typeface-roboto';


const benzinTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffa726',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      elevation1: '#1e1e1e',
      elevation2: '#232323',
      elevation3: '#252525',
    },
    text: {
      primary: '#f4f4f4',
      secondary: 'rgba(255, 255, 255, 0.6)',
    }
  },
});


const BenzinThemeProvider = ({ children }) => (
  <ThemeProvider theme={benzinTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);


export default BenzinThemeProvider;

