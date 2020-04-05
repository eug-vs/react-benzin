import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { makeStyles } from '@material-ui/core';

import {
  Benzin,
  Header,
  Window,
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
  space: null,
  'spacevim': null,
  'emoji': null,
  'material-ui': null,
};

const pageMap: Record<string, string> = {
  home: 'https://raw.githubusercontent.com/eug-vs/react-benzin/develop/README.md',
  space: 'https://raw.githubusercontent.com/eug-vs/space/master/docs/environment.md',
  'spacevim': 'https://raw.githubusercontent.com/spacevim/spacevim/master/README.md',
  emoji: 'https://raw.githubusercontent.com/muan/emoji/gh-pages/README.md',
  'material-ui': 'https://raw.githubusercontent.com/mui-org/material-ui/master/README.md',
};


const App: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState('home');

  const url = pageMap[page];
  const fileName = url.slice(url.lastIndexOf('/') + 1);
  const metadata = [
    `## Markdown\n [Markdown file](${url}) *(...${fileName})* that you can see on the left was parsed and processed by **BENZIN**! :rocket:`,
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
          <Markdown url={url} />
        </div>
      </Window>
      <Window type="secondary" name="Feature preview">
        <div className={classes.window}>
          <Markdown data={metadata} />
        </div>
      </Window>
    </Benzin>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));

