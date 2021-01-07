import React from 'react';
import { Paper, makeStyles } from '@material-ui/core';

interface PropTypes {
  value: string;
}

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: theme.spacing(1),
    overflowX: 'auto',
    fontFamily: 'Monospace',
    scrollbarColor: 'auto',
  },
}));

const CodeBlock: React.FC<PropTypes> = ({ value }) => {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.root}>
      <pre>
        {value}
      </pre>
    </Paper>
  );
};

export default CodeBlock;

