import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { ColorModeContext } from '../App';
import { useRecoilState } from 'recoil';
import { colorModeAtom, langAtom, maxPlayersAtom } from '../store/settingsState';
import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation();

  const colorMode = React.useContext(ColorModeContext);
  const [mode, _] = useRecoilState<'light' | 'dark'>(colorModeAtom);
  const [lang, setLang] = useRecoilState(langAtom);
  const [maxPlayer, setMaxPlayer] = useRecoilState(maxPlayersAtom);

  const handleLangChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as any);
  };

  const handleMaxPlayerChange = (event: any) => {
    setMaxPlayer(event.target.value);
  };

  return (
    <React.Fragment>
      <FormGroup
        sx={{
          alignItems: 'center'
        }}
      >
        <FormControlLabel
          sx={{
            m: 2
          }}
          control={<Switch
            checked={mode !== 'light'}
            onChange={colorMode.toggleColorMode}
            inputProps={{ 'aria-label': 'color-mode-switch' }}
          />}
          label={t('dark_mode_setting')}
          labelPlacement='start'
        />
        <FormControl>
          <InputLabel id="change-lang-select-label">Language</InputLabel>
          <Select
            labelId="change-lang-select-label"
            id="change-lang-select"
            value={lang}
            onChange={handleLangChange}
            label={t('language_setting')}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='fr'>Francais</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{
            m: 1
          }}
          type='number'
          variant='standard'
          value={maxPlayer}
          onChange={handleMaxPlayerChange}
          InputProps={{
            inputProps: { min: 5, max: 12 }
          }}
          label={t('max_player_setting')}
        />
      </FormGroup>
    </React.Fragment>
  );
}