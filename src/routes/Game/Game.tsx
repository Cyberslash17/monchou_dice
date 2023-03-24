import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { useLiveQuery } from 'dexie-react-hooks';
import { CurrentGame, db } from '../../store/db';
import { Trans, useTranslation } from 'react-i18next';
import { Button, FormGroup } from '@mui/material';
import { useRecoilState } from 'recoil';
import { activeGameAtom } from '../../store/settingsState';
import { GameSkeleton } from './GameSkeleton';
import { Link } from 'react-router-dom';

function getMax(player: CurrentGame): number {
  return player.score1 + player.score2;
}

interface GameRowProps {
  action: any;
  idx: number;
  game: CurrentGame;
}

function GameHead() {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ minWidth: 155 }}>{t('player')}</TableCell>
        <TableCell>{t('round1')}</TableCell>
        <TableCell>{t('round2')}</TableCell>
        <TableCell
          sx={{
            borderLeft: '1px solid'
          }}
        >
          {t('total')}
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function GameRow({ action, idx, game }: GameRowProps) {
  return (
    <TableRow key={`game-player-${idx}`}>
      <TableCell>{game.name}</TableCell>
      <TableCell>
        <TextField
          value={game.score1 || 0}
          type='number'
          variant='standard'
          InputProps={{
            inputProps: { min: 0, max: 77 }
          }}
          onChange={(e) => action(game.id || 0, 1, Number(e.target.value))}

        />
      </TableCell>
      <TableCell>
        <TextField
          value={game.score2 || 0}
          type='number'
          variant='standard'
          InputProps={{
            inputProps: { min: 0, max: 77 }
          }}
          onChange={(e) => action(game.id || 0, 2, Number(e.target.value))}
        />
      </TableCell>
      <TableCell
        sx={{
          borderLeft: '1px solid'
        }}
      >
        {game.score1 + game.score2}
      </TableCell>
    </TableRow>
  );
}

function WinnerPrompt({ player }: { player?: CurrentGame; }) {
  if (!player || !player.name) return null;

  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Typography>
        <Trans
          i18nKey='winning'
          values={{ name: player.name, count: getMax(player) }}
          components={{ bold: <strong /> }}
        />
      </Typography>
    </Box>
  );
}


export default function Game() {
  const { t } = useTranslation();
  const [_, setActiveGame] = useRecoilState(activeGameAtom);

  const playerData = useLiveQuery(
    async () => db.currentGame.toArray()
  );

  // Manage game state

  function getWinningPlayer() {
    return playerData?.reduce((m, c) => {
      if (getMax(m) < getMax(c)) return c;
      return m;
    }, { score1: 0, score2: 0, name: '' });
  }

  async function finishGame() {
    const winner = getWinningPlayer();

    if (winner) {
      await db.scores.add({
        name: winner?.name,
        score: winner?.score1 + winner?.score2,
        timestamp: Date.now()
      });

      return clearGame();
    }
  }

  async function clearGame() {
    setActiveGame(false);
    return db.currentGame.clear();
  }

  async function updatePlayerScore(id: number, key: 1 | 2, score: number) {
    const update = key === 1 ? { score1: score } : { score2: score };

    await db.currentGame.update(id, update);
  }

  return (
    <React.Fragment>
      <TableContainer>
        <Table>
          <GameHead />
          <TableBody>
            {
              playerData === undefined
                ? <GameSkeleton />
                : playerData?.map((p, i) => (
                  <GameRow
                    idx={i}
                    action={updatePlayerScore}
                    game={p}
                  />
                ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <WinnerPrompt player={getWinningPlayer()} />
      <FormGroup
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          m: 2
        }}>
        <Button variant='outlined' onClick={clearGame}>{t('reset_game')}</Button>
        <Button variant='contained' onClick={finishGame} component={Link} to='/history'>{t('finish_game')}</Button>
      </FormGroup>
    </React.Fragment>
  );
}