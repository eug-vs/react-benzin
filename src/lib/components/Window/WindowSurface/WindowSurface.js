import React from 'react';

import { Paper, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  surface: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.elevation,
    overflowY: 'auto',
    scrollbarColor: `${theme.palette.primary.dark} ${theme.palette.primary.light}`,
  }
}));


const WindowSurface = ({ size, position, children }) => {
  const classes = useStyles();

  return (
    <Paper
      elevation={3}
      style={{...size, ...position}}
      className={classes.surface}
    >
      {children}
    </Paper>
  )
};


export default WindowSurface;