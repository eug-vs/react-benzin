import React from 'react';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ParserPropTypes } from './types';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: theme.spacing(1),
    overflowX: 'auto',
    fontFamily: 'Monospace',
    scrollbarColor: 'auto',
  },
}));

const CodeBlock: React.FC<ParserPropTypes> = ({ rawLines }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      {rawLines.map(line => <pre>{line}</pre>)}
    </Paper>
  );
};

export default CodeBlock;

