import React from 'react';

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.elevation2,
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(3),
  },
  logo: {
    margin: theme.spacing(0, 3, 0, 1),
  },
  tab: {
    '& .MuiTab-wrapper': {
      padding: theme.spacing(2),
      flexDirection: 'row',
      '& svg': {
        marginRight: theme.spacing(1),
        marginBottom: '0 !important',
      }
    }
  }
}));


const Header = ({ logo, contents, page, setPage }) => {
  const classes = useStyles();

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
  <AppBar position="sticky" className={classes.root}>
    <Toolbar>
        {logo.icon}
        <Typography variant="h4" className={classes.logo} color="primary">
          {logo.title}
        </Typography>
      <Tabs onChange={handleChange} value={page}>
        {contents && Object.keys(contents).map(item => (
          <Tab
            label={item}
            icon={contents[item]}
            value={item}
            className={classes.tab}
            key={item}
          />
        ))}
      </Tabs>
    </Toolbar>
  </AppBar>
  );
};

export default Header;
