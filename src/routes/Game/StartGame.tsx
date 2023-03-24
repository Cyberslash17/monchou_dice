import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { db } from '../../store/db';
import { useRecoilState } from 'recoil';
import { activeGameAtom, maxPlayersAtom } from '../../store/settingsState';
import { useTranslation } from 'react-i18next';

export default function GameStart() {
  const [names, setNames] = React.useState([] as string[]);
  const [current, setCurrent] = React.useState('');
  const [_, setActiveGame] = useRecoilState(activeGameAtom);
  const [maxPlayer, _setMaxPlayer] = useRecoilState(maxPlayersAtom);
  const { t } = useTranslation();

  async function createGame() {
    setActiveGame(true);
    return db.currentGame.bulkAdd(
      names.map((name) => ({ name, score1: 0, score2: 0 }))
    );
  }

  const addPlayer = () => {
    if (current.length > 0) {
      if (names.includes(current)) {
        console.log('Already registered');
      }
      setNames([
        ...names,
        current
      ]);
      setCurrent('');
    }
  };

  const removePlayer = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const handleEnterKey = (event: any) => {
    if (event.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <React.Fragment>
      <Button
        sx={{
          mb: 1,
          width: '100%'
        }}
        variant='contained'
        disabled={names.length < 2}
        onClick={createGame}
      >
        {t('start_game')}
      </Button>
      <Box
        sx={{
          display: 'flex',
          top: 0
        }}
      >
        <TextField
          required
          id="outlined-required"
          label={t('add_label')}
          sx={{
            mr: 2
          }}
          onKeyDown={handleEnterKey}
          value={current}
          onChange={
            (e) => setCurrent(e.target.value)
          }
          disabled={names.length >= maxPlayer}
        />
        <Button
          disabled={names.length >= maxPlayer}
          variant='outlined'
          onClick={addPlayer}
        >{t('add_button')}</Button>
      </Box >
      <List
      >
        {
          names.map((n, i) => (
            <ListItem
              key={`name-${i}`}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removePlayer(i)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={n} />
            </ListItem>
          ))
        }
      </List>
    </React.Fragment>
  );
}