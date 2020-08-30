import { createMuiTheme } from '@material-ui/core/styles';

const MainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#d2d2d2',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1b1464',
      main: '#1b1464',
      dark: '#0b0454',
      contrastText: '#000',
    },
  },
});

export default MainTheme;
