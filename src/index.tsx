import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { makeStyles, TextField, Button } from '@material-ui/core';

import {
  Benzin,
  Header,
  Window,
  Markdown,
  ContentSection,
} from './lib';

import icon from './assets/icon.svg';

interface RenderPropTypes {
  index: number;
  style: React.CSSProperties;
}


const useStyles = makeStyles(theme => ({
  window: {
    padding: theme.spacing(4),
  },
  promoButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  }
}));


const Icon = <img src={icon} width="32px" height="37px" alt="logo"/>

const headerContents = {
  home: null,
  'spacevim': null,
  'material-ui': null,
  'custom': null,
};

const pageMap: Record<string, string> = {
  home: 'https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md',
  'spacevim': 'https://raw.githubusercontent.com/spacevim/spacevim/master/README.md',
  'material-ui': 'https://raw.githubusercontent.com/mui-org/material-ui/master/README.md',
};


const CustomPage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  const handleParseUrl = () => {
    setUrl(inputEl.current?.value || '');
  }

  return (
    <>
      <ContentSection sectionName="Render custom markdown document" level={2} >
        <p>
          This should be a link to a valid markdown file. Response should give the file contents.
          If you copy README file from GitHub, make sure you provide link to raw view.
        </p>
        <p>
          <TextField
            inputRef={inputEl}
            variant="outlined"
            color="secondary"
            label="Markdown url"
          />
        </p>
        <Button variant="contained" color="secondary" onClick={handleParseUrl} >
          Render!
        </Button>
      </ContentSection>
      <Markdown url={url} />
    </>
  );
}


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>('home');

  const handleGoCustom = () => {
    setPage('custom');
  }

  const url = pageMap[page];
  const fileName = url?.slice(url.lastIndexOf('/') + 1);
  const metadata = [
    `## Markdown\n [Markdown file](${url}) *(...${fileName})* that you can see on the left was parsed and rendered by **BENZIN**! :rocket:`,
    'Switch between tabs on the header to explore other markdown templates. :recycle: ',
    'Currently **only core features** of markdown function.',
    'Templates on the left are being loaded from the [GitHub](https://github.com), though this pane is generated from plaintext. :pen:',
    '## How do I use this feature?',
    '```',
    'import Markdown from \'react-benzin\';',
    'const data = \'# Header\\nHello, *world!*\';',
    'ReactDOM.render(<Markdown data={data}/>, document.getElementById(\'root\'));',
    '```',
  ].join('\n');

  return (
    <Benzin>
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
          {
            (page === 'custom') ?
            <CustomPage />
            :
            <Markdown url={url} />
          }
        </div>
      </Window>
      <Window type="secondary" name="Feature preview">
        <div className={classes.window}>
          <Markdown data={metadata} />
          <p className={classes.promoButton}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleGoCustom}
            >
              Render custom document
            </Button>
          </p>
        </div>
      </Window>
    </Benzin>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

