import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  makeStyles,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import {
  Benzin,
  Markdown,
  Heading,
} from './lib';

import Header from './demo/Header/Header';
import Window from './demo/Window/Window';
import content from './demo/content.md';
import icon from './assets/icon.svg';

const useStyles = makeStyles(theme => ({
  window: {
    padding: theme.spacing(4),
  },
  promoButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
}));


const Icon = <img src={icon} width="32px" height="37px" alt="logo" />;

const headerContents = {
  home: null,
  dotfiles: null,
  'material-ui': null,
  custom: null,
  'live preview': null,
};

const pageMap: Record<string, string> = {
  home: 'https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md',
  'material-ui': 'https://raw.githubusercontent.com/mui-org/material-ui/master/README.md',
  dotfiles: 'https://raw.githubusercontent.com/eug-vs/dotfiles/master/.github/README.md',
};


const CustomPage: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const inputEl = useRef<HTMLInputElement>(null);

  const handleParseUrl = (): void => {
    setUrl(inputEl.current?.value || '');
  };

  return (
    <>
      <Heading level={2}>Render custom markdown document</Heading>
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
      <Button variant="contained" color="secondary" onClick={handleParseUrl}>
        Render!
      </Button>
      <Markdown url={url} />
    </>
  );
};

interface LivePropTypes {
  setLivePreviewData: (livePreviewData: string) => void;
}

const LivePreviewPage: React.FC<LivePropTypes> = ({ setLivePreviewData }) => {
  const inputEl = useRef<HTMLInputElement>(null);

  const handleRender = (): void => {
    setLivePreviewData(inputEl.current?.value || '');
  };

  return (
    <>
      <Heading level={2}>Markdown live preview</Heading>
      <p>
        Start typing and see your text rendered on the left window!
        You can find the list of all Markdown features
        {' '}
        <Link href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">
          here
        </Link>
        . (some of them are yet in progress).
        We recommend starting with # Header.
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
    </>
  );
};


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<string>('home');
  const [livePreviewData, setLivePreviewData] = useState<string>('');

  const handleGoLivePreview = (): void => {
    setPage('live preview');
  };

  const url = pageMap[page];
  const fileName = url?.slice(url.lastIndexOf('/') + 1);

  let primaryWindowContent = <Markdown url={url} />;
  if (page === 'custom') primaryWindowContent = <CustomPage />;
  else if (page === 'live preview') {
    primaryWindowContent = <Markdown data={livePreviewData || '# Start typing in the right window!'} />;
  }

  const tryButton = (
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
  );

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
        <div className={classes.window}>{primaryWindowContent}</div>
      </Window>
      <Window type="secondary" name="Feature preview">
        <div className={classes.window}>
          {
            (page === 'live preview')
              ? <LivePreviewPage setLivePreviewData={setLivePreviewData} />
              : <Markdown url={content} context={{ tryButton, fileName }} />
          }
        </div>
      </Window>
    </Benzin>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

