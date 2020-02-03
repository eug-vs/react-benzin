import React from 'react';

import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


interface PropTypes {
  logo: {
    icon: React.ReactNode;
    title: string;
  };
  contents: {
    [key: string]: React.ReactNode | null;
  };
  page: string;
  setPage: (newPage: string) => void;
}

const useStyles = makeStyles((theme: any) => ({
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
      fontSize: '0.8125rem',
      '& svg': {
        marginRight: theme.spacing(1),
        marginBottom: '0 !important',
      }
    }
  }
}));


const Header: React.FC<PropTypes> = ({ logo, contents, page, setPage }) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, newPage: string) => {
    setPage(newPage);
  };

  return (
  <AppBar position="sticky" className={classes.root}>
    <Toolbar>
      {logo.icon}
      <Typography variant="h5" className={classes.logo} color="primary">
        {logo.title}
      </Typography>
      <Tabs onChange={handleChange} value={page}>
        {contents && Object.keys(contents).map((item: string) => (
          <Tab
            label={item}
            icon={contents[item] as JSX.Element}
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
