import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { makeStyles, Button, Typography } from '@material-ui/core';

import {
  BenzinThemeProvider,
  Header,
  Window,
  ContentSection,
  SmartList,
} from './lib';

import icon from './assets/icon.svg';


const useStyles = makeStyles(theme => ({
  window: {
    padding: theme.spacing(4),
  }
}));


const Icon = <img src={icon} width="32px" height="37px" alt="logo"/>

const headerContents = {
  home: null,
  page: null,
  'another page': null,
};

const renderItem = ({ index, style }: any) => {
  return (
      <Typography variant="h3" style={style} component="div"> {index} </Typography>
  );
};

const App = () => {
  const classes = useStyles();
  const [page, setPage] = useState('home');

  return (
    <BenzinThemeProvider>
      <Header
        logo={{
          icon: Icon,
          title: 'BENZIN',
        }}
        contents={headerContents}
        page={page}
        setPage={setPage}
      />
      <Window type="primary">
        <div className={classes.window}>
          <ContentSection sectionName="Library preview">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Button variant="contained" color="secondary">
              secondary
            </Button>
            <Button variant="contained" color="primary">
              primary
            </Button>
          </ContentSection>
        </div>
      </Window>
      <Window type="secondary" name="SmartList test window">
        <SmartList
          itemSize={270}
          itemCount={100}
          renderItem={renderItem}
        />
      </Window>
    </BenzinThemeProvider>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

