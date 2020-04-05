import React from 'react';
import { ParserPropTypes } from './types';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: theme.spacing(2),
    overflowX: 'auto',
    fontFamily: 'Monospace',
  },
}));

const CodeBlock: React.FC<ParserPropTypes> = ({ rawLines }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      {rawLines.map(line => <> {line} <br/> </>)}
    </Paper>
  );
}

export default CodeBlock;

