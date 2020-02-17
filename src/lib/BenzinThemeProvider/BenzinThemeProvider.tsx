import React from 'react';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import 'typeface-roboto';


declare module '@material-ui/core/styles/createPalette' {
  interface TypeBackground {
      elevation1: string;
      elevation2: string;
      elevation3: string;
  }
}


const benzinTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[400],
    },
    secondary: {
      main: purple[500],
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


const BenzinThemeProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={benzinTheme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);


export default BenzinThemeProvider;

