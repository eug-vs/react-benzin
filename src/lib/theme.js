import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#0a0909',
    },
    secondary: {
      main: '#ff7315',
    },
    background: {
      default: '#232020',
      paper: '#0f0e0e',
      elevation: 'rgba(255, 255, 255, 0.04)',
    },
    text: {
      primary: '#f4f4f4',
      secondary: '#6f6666',
    }
  },
});

export default theme;
