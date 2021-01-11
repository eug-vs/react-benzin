import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    fontFamily: 'Monospace',
  },
}));

const InlineCode: React.FC = ({ children }) => {
  const classes = useStyles();
  return <span className={classes.root}>{children}</span>;
};

export default InlineCode;
