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
  'live preview': null,
};

const pageMap: Record<string, string> = {
  home: 'https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md',
  'spacevim': 'https://raw.githubusercontent.com/spacevim/spacevim/master/README.md',
  'material-ui': 'https://raw.githubusercontent.com/mui-org/material-ui/master/README.md',
};


const CustomPage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  const handleParseUrl = (): void => {
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
            fullWidth
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

interface LivePropTypes {
  setLivePreviewData: (livePreviewData: string) => void;
}

const LivePreviewPage: React.FC<LivePropTypes> = ({ setLivePreviewData }) => {
  const classes = useStyles();
  const inputEl = useRef<HTMLInputElement>(null);

  const handleRender = (): void => {
    setLivePreviewData(inputEl.current?.value || '');
  }

  return (
    <>
      <ContentSection sectionName="Markdown live preview" level={2} >
        <p>
          Start typing and see your text rendered on the left window! We recommend starting with # Header.
        </p>
        <p>
          <TextField
            fullWidth
            multiline
            inputRef={inputEl}
            variant="outlined"
            color="primary"
            label="Markdown"
            onChange={handleRender}
          />
        </p>
      </ContentSection>
    </>
  )
}


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>('home');
  const [livePreviewData, setLivePreviewData] = useState<string>('');

  const handleGoLivePreview = (): void => {
    setPage('live preview');
  }

  const url = pageMap[page];
  const fileName = url?.slice(url.lastIndexOf('/') + 1);
  const info = [
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
            (page === 'live preview') ?
            <Markdown data={livePreviewData || '# Start typing in the right window!'} />
            :
            <Markdown url={url} />
          }
        </div>
      </Window>
      <Window type="secondary" name="Feature preview">
        <div className={classes.window}>
          {
            (page === 'live preview') ?
            <LivePreviewPage setLivePreviewData={setLivePreviewData} />
            :
            <>
              <Markdown data={info} />
              <p className={classes.promoButton}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleGoLivePreview}
                >
                  Try it yourself!
                </Button>
              </p>
            </>
          }
        </div>
      </Window>
    </Benzin>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

