import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export interface PageBoxProps {
  title: string;
  page: React.ReactElement;
}

export default function PageBox({ title, page }: PageBoxProps) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        m: 2
      }}
    >
      <Typography fontWeight={'bold'} variant='h6'>{t(title)}</Typography>
      {page}
    </Box>
  );
}


export function createPageBox(title: string, page: React.ReactElement) {
  return (
    <PageBox title={title} page={page} />
  );
}