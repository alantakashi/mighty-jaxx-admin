import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createTheme,
  MuiThemeProvider
} from '@material-ui/core/styles'
import { ClientContext } from 'graphql-hooks'
import gClient from '@utils/graphqlClient'
import Routes from '@routes'

const theme = createTheme({
  palette: {
    background: {
      default: "#eaeaea"
    },
    primary: {
      main: '#000000'
    },
    secondary: {
      main: "#ffd34a"
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Roboto",
      "sans-serif"
    ].join(',')
  },
  overrides: {
    MuiButton: {
      outlined: {
        backgroundColor: "#ffd34a",
        border: "2px solid #000000",
        color: "#000000",

        '&:hover': {
          backgroundColor: "#fbc02d",
        }
      },
      outlinedPrimary: {
        border: "2px solid #000000",

        '&:hover': {
          border: "2px solid #000000",
          backgroundColor: "#fbc02d",
        }
      },
      outlinedSecondary: {
        borderWidth: "2px",
        backgroundColor: "#000000",

        '&:hover': {
          backgroundColor: "#212121",
          border: "2px solid rgba(255, 211, 74, 0.5)",
        }
      }
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0
      }
    },
    MuiBottomNavigationAction: {
      root: {
        "&.Mui-selected": {
          color: "#ff9100",
        }
      }
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ClientContext.Provider value={gClient}>
        <Routes />
      </ClientContext.Provider>
    </MuiThemeProvider>
  );
}

export default App;
