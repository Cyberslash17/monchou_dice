import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../store/pageState';
import Title from './Title';

// Mui
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiToolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import CasinoIcon from '@mui/icons-material/Casino';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useTranslation } from 'react-i18next';

export default function AppBar() {
  const [_, setPage] = useRecoilState(pageAtom);
  const { t, i18n } = useTranslation();

  const pages = [
    { name: t('game_title'), path: '/', icon: <CasinoIcon /> },
    { name: t('history_title'), path: '/history', icon: <HistoryIcon /> },
    { name: t('settings_title'), path: '/settings', icon: <SettingsIcon /> },
  ];

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <React.Fragment>

      <MuiAppBar
        sx={{
          display: {
            xs: 'none',
            sm: 'flex'
          }
        }}
      >
        <MuiToolbar>
          <Box
            sx={{ flexGrow: 1, display: { sm: 'flex', md: 'none' } }}>
            <IconButton
              color='inherit'
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Title />
          <Box
            sx={{
              flexGrow: 1, display: { sm: 'none', md: 'flex' }
            }}>
            {
              pages.map((p, n) =>
                <MenuItem
                  key={`appbar-${n}`}
                  component={Link}
                  to={p.path}
                  onClick={() => setPage(n)}
                >
                  <Typography>{p.name}</Typography>
                </MenuItem>
              )
            }
          </Box>
        </MuiToolbar>
      </MuiAppBar>
      <Drawer
        anchor='left'
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          width: 240
        }}
      >
        <List>
          {
            pages.map(({ name, path, icon }, index) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={() => setPage(index)}
                  sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: 3,
                      justifyContent: 'center'
                    }}

                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    sx={{
                      display: 'flex',
                      flexGrow: 1,
                      mr: 8
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </React.Fragment >
  );
}