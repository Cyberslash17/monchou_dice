import { useLiveQuery } from 'dexie-react-hooks';
import { db, Score } from '../store/db';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useTranslation } from 'react-i18next';

function ScoreboardHead() {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow aria-label={`score-head`}>
        <TableCell>{t('id_history')}</TableCell>
        <TableCell>{t('player_history')}</TableCell>
        <TableCell>{t('score_history')}</TableCell>
        <TableCell>{t('date_history')}</TableCell>
      </TableRow>
    </TableHead>
  );
}

function ScoreboardRow({ id, name, score, timestamp }: Score) {
  const getDate = (t: number) => new Date(t).toTimeString();

  return (
    <TableRow aria-label={`score-${id}`}>
      <TableCell aria-label={`score-${id}-id`}>{id}</TableCell>
      <TableCell aria-label={`score-${id}-name`}>{name}</TableCell>
      <TableCell aria-label={`score-${id}-score`}>{score}</TableCell>
      <TableCell aria-label={`score-${id}-date`}>{getDate(timestamp)}</TableCell>
    </TableRow>
  );
}

export default function HistoryPage() {

  const scoreData = useLiveQuery(
    async () => db.scores.toArray()
  );

  return (
    <Table aria-label='score-table'>
      <ScoreboardHead />
      <TableBody>
        {scoreData?.map(ScoreboardRow)}
      </TableBody>
    </Table>
  );
}