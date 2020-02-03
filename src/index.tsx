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

import icon from './assets/icon.png';
import icon2 from './assets/icon2.svg';
import HomeIcon from '@material-ui/icons/Home';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import ExploreIcon from '@material-ui/icons/Explore';
import GitHubIcon from '@material-ui/icons/GitHub';


const useStyles = makeStyles(theme => ({
  window: {
    padding: theme.spacing(4),
  }
}));

const headerContents = {
  home: <HomeIcon />,
  'getting started': <PlayCircleFilledWhiteIcon />,
  explore: <ExploreIcon />,
  contribute: <GitHubIcon />,
};

const renderItem = ({ index, style }: any) => {
  return (
      <Typography variant="h3" style={style} component="div"> {index} </Typography>
  );
};

const Icon1 = <img src={icon} width="32px" height="37px" alt="logo"/>
const Icon2 = <img src={icon2} height="32px" alt="logo"/>

const App = () => {
  const classes = useStyles();
  const [page, setPage] = useState('home');

  return (
    <BenzinThemeProvider>
      <Header
        logo={{
          icon: Icon1,
          title: 'BENZIN',
        }}
        contents={headerContents}
        page={page}
        setPage={setPage}
      />
      <Window type="primary">
        <div className={classes.window}>
          <ContentSection sectionName="Out of fuel? You've came to the right place!">
            <p> Here is some text about BENZIN library. </p>
            <Button variant="contained" color="secondary">
              Charge me up!
            </Button>
            <Button variant="contained" color="primary">
              Learn more
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

