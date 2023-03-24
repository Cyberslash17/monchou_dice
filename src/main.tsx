import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './store/i18n';
import {
  createBrowserRouter, RouterProvider, Route, createRoutesFromElements
} from 'react-router-dom';
import GamePage from './routes/GamePage';
import HistoryPage from './routes/HistoryPage';
import SettingsPage from './routes/SettingsPage';
import { RecoilRoot } from 'recoil';
import { createPageBox } from './components/PageBox';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route index path='/' element={createPageBox('game_title', <GamePage />)} />
      <Route index path='/history' element={createPageBox('history_title', <HistoryPage />)} />
      <Route index path='/settings' element={createPageBox('settings_title', <SettingsPage />)} />
    </Route>
  ),
  {
    basename: "/monchou_dice/"
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
