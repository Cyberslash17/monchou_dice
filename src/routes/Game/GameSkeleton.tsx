import React from 'react';
import { TableRow, TableCell, Skeleton } from '@mui/material';


export function GameSkeleton() {
  const a = [0, 0, 0, 0, 0];

  return (
    <React.Fragment>
      {

        a.map(() => (
          <TableRow>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell><Skeleton /></TableCell>
            <TableCell
              sx={{
                borderLeft: '1px solid'
              }}
            >
              <Skeleton />
            </TableCell>
          </TableRow>))
      }
    </React.Fragment>
  );
}