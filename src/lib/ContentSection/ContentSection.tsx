import React from 'react';

import {
  Typography,
  Divider,
  makeStyles
} from '@material-ui/core';


interface PropTypes {
  sectionName: string;
}

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(1, 2, 1, 3),
    marginBottom: theme.spacing(1),

    '& .MuiButton-root': {
      margin: theme.spacing(1, 2, 2, 0),
    },
  },
}));

const ContentSection: React.FC<PropTypes> = ({ sectionName, children }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">{sectionName}</Typography>
      <Divider variant="middle"/>
      <Typography component="div" className={classes.content}>
        {children}
      </Typography>
    </>
  );

};


export default ContentSection;
