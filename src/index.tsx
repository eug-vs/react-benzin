import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { makeStyles, Link } from '@material-ui/core';

import {
  BenzinThemeProvider,
  Header,
  Window,
  ContentSection,
  SmartList,
  Button,
  Markdown,
} from './lib';

import icon from './assets/icon.svg';

interface RenderPropTypes {
  index: number;
  style: React.CSSProperties;
}


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


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState('home');

  const renderItem: React.FC<RenderPropTypes> = ({ index, style}) => {
    return (
        <div style={style} className={classes.window}>
          <ContentSection sectionName={`Item ${index+1}`}>
            <p>
              Fusce commodo.  Vestibulum convallis, lorem a tempus semper, dui dui euismod elit, vitae placerat urna tortor vitae lacus.  Nullam libero mauris, consequat quis, varius et, dictum id, arcu.  Mauris mollis tincidunt felis.
            </p>
            {(index % 2 === 0)?
              (
                <Button color="primary">
                  primary
                </Button>
              )
              :
              (
                <Button color="secondary">
                  secondary
                </Button>
              )
            }
          </ContentSection>
        </div>
    );
  };

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque dapibus suscipit ligula.  Donec posuere augue in quam.  Etiam vel tortor sodales tellus ultricies commodo.  Suspendisse potenti.  Aenean in sem ac leo mollis blandit.  Donec neque quam, dignissim in, mollis nec, sagittis eu, wisi.  <Link href="#">Phasellus lacus.</Link> Etiam laoreet quam sed arcu.  Phasellus at dui in ligula mollis ultricies.  Integer placerat tristique nisl.  Praesent augue.  Fusce commodo.
            </p>
            <Button color="secondary">
              secondary
            </Button>
            <Button color="primary">
              primary
            </Button>
          </ContentSection>
          <Markdown url='https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md' />
        </div>
      </Window>
      <Window type="secondary" name="SmartList preview window">
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

