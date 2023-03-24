import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BottomBar from './components/BottomBar';
import AppBar from './components/AppBar';
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { colorModeAtom } from './store/settingsState';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const [mode, setMode] = useRecoilState<'light' | 'dark'>(colorModeAtom);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box className="App">
          <CssBaseline enableColorScheme={true} />
          <AppBar />
          <Card>
            <Outlet />
          </Card>
          <Paper sx={{
            display: { xs: 'block', sm: 'none' },
            position: 'fixed',
            bottom: 0, left: 0, right: 0
          }}>
            <BottomBar />
          </Paper>
        </Box >
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
