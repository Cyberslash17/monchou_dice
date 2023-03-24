import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import CasinoIcon from '@mui/icons-material/Casino';
import {
  Link
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { pageAtom } from '../store/pageState';
import { useTranslation } from 'react-i18next';

export default function BottomBar() {
  const [page, setPage] = useRecoilState(pageAtom);
  const { t, i18n } = useTranslation();

  return (
    <BottomNavigation
      showLabels
      value={page}
      onChange={(e, n) => {
        setPage(n);
      }}
    >
      <BottomNavigationAction component={Link} label={t('game_title')} to="/" icon={<CasinoIcon />} />
      <BottomNavigationAction component={Link} label={t('history_title')} to="/history" icon={<HistoryIcon />} />
      <BottomNavigationAction component={Link} label={t('settings_title')} to="/settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}