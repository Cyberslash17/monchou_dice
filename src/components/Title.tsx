import React from 'react';

import Typography from '@mui/material/Typography';

import CasinoIcon from '@mui/icons-material/Casino';

const title = 'Shut the box';

export default function Title() {
  return (
    <React.Fragment>
      <CasinoIcon
        sx={{
          mr: 1,
          display: {
            sm: 'none',
            md: 'flex'
          }
        }}
      />
      <Typography
        variant='h6'
        noWrap
        sx={{
          mr: 2,
          display: {
            sm: 'none',
            md: 'flex'
          }
        }}
      >
        {title}
      </Typography>
      <CasinoIcon
        sx={{
          mr: 1,
          display: { sm: 'flex', md: 'none' }
        }}
      />
      <Typography
        variant='h5'
        noWrap
        sx={{
          mr: 2,
          display: { sm: 'flex', md: 'none' }
        }}
      >
        {title}
      </Typography>
    </React.Fragment>
  );
}