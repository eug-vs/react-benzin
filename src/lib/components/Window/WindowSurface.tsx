import React from 'react';

import { Paper, makeStyles } from '@material-ui/core';

import { SurfaceSize, SurfacePosition } from './types';


interface PropTypes {
  size: SurfaceSize;
  position: SurfacePosition;
  children?: any;
}


const useStyles = makeStyles((theme: any) => ({
  surface: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    scrollbarColor: `${theme.palette.secondary.dark} ${theme.palette.secondary.light}`,

    '& a.MuiTypography-root': {
      color: theme.palette.primary.light,
    },
  }
}));


const WindowSurface = (props: PropTypes) => {
  const classes = useStyles();
  const { size, position, children } = props;

  return (
    <Paper
      variant="outlined"
      style={{...size, ...position}}
      className={classes.surface}
    >
      {children}
    </Paper>
  )
};


export default WindowSurface;
