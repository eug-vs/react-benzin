import React from 'react';

import {
  Typography,
  Divider,
  makeStyles,
  useMediaQuery,
  Theme,
} from '@material-ui/core';


interface PropTypes {
  sectionName: string;
  level?: number;
}

const useStyles = makeStyles(theme => ({
  content: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2, 2, 1, 3),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0),
    },
    marginBottom: theme.spacing(1),
  },
}));

const ContentSection: React.FC<PropTypes> = ({ sectionName, children, level = 0 }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  let adjustedLevel = level + 2; // Make everything smaller
  if (adjustedLevel > 6) adjustedLevel = 6;

  type Variant = 'h3' | 'h4' | 'h5' | 'h6';
  const variant: Variant = `h${adjustedLevel}` as Variant;

  return (
    <>
      <Typography variant={variant}>{sectionName}</Typography>
      <Divider variant={isMobile ? 'fullWidth' : 'middle'} />
      <Typography component="div" className={classes.content}>
        {children}
      </Typography>
    </>
  );
};


export default ContentSection;
