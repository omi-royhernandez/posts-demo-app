import { Box, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Correct import for makeStyles
import React from 'react';
import { SpinnerProps } from './types';

// Define styles using makeStyles
const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
  },
}));

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  const classes = useStyles();

  if (!isLoading) return null; // Return null if not loading

  return (
    <Box className={classes.spinnerContainer}>
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
