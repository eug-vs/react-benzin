import React from 'react';

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import TimerIcon from '@material-ui/icons/Timer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.elevation2,
    color: theme.palette.text.primary,
  },
  logo: {
    margin: theme.spacing(0, 3, 0, 3),
    color: theme.palette.primary.main,
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


const Header = ({ page, setPage }) => {
  const classes = useStyles();

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const icons = {
    app: (<TimerIcon />),
    profile: (<AccountCircleIcon />),
    scoreboard: (<AssignmentIcon />),
    contribute: (<GitHubIcon />),
  };

  return (
  <AppBar position="sticky" className={classes.root}>
    <Toolbar>
      <Typography variant="h4" className={classes.logo}>
        ChronoCube
      </Typography>
      <Tabs onChange={handleChange} value={page}>
        { Object.keys(icons).map(item => (
          <Tab
            label={item}
            icon={icons[item]}
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
