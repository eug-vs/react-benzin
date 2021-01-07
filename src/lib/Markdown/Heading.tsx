import React from 'react';
import { Typography, Divider, makeStyles } from '@material-ui/core';

interface PropTypes {
  level: number;
}

type Variant = 'h3' | 'h4' | 'h5' | 'h6';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0, 1, 0),
  },
}));

const Heading: React.FC<PropTypes> = ({ children, level }) => {
  const classes = useStyles();

  let adjustedLevel = level + 2; // Make everything smaller
  if (adjustedLevel > 6) adjustedLevel = 6;

  const variant: Variant = `h${adjustedLevel}` as Variant;

  return (
    <div className={classes.root}>
      <Typography variant={variant}>{children}</Typography>
      <Divider variant="middle" />
    </div>
  );
};

export default Heading;

