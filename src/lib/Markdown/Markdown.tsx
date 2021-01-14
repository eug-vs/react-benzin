import React, { useState, useEffect } from 'react';
import { Link, Typography } from '@material-ui/core';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import emoji from 'remark-gemoji';

import CodeBlock from './CodeBlock';
import InlineCode from './InlineCode';
import Heading from './Heading';
import Image from './Image';

interface PropTypes {
  source?: string;
  url?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plugins?: any[]
}

const resolveUrls = (line: string, baseUrl: string): string => line.replace(
  /src="(?!http)(.*)"[\s>]/,
  (match, url) => `src="${baseUrl}/${url}?sanitize=true"`,
).replace(
  /\[(.*\]?.*)\]\((?!http)(.+?)\)/g,
  (match, text, url) => `[${text}](${baseUrl}/${url})`,
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WrappedInlineCode = (context: Record<string, any>): React.FC => ({ children }) => {
  if (typeof children === 'string' && children?.startsWith('$')) {
    const symbol = children.slice(1);
    return context[symbol] || null;
  }
  return <InlineCode>{children}</InlineCode>;
};

const Markdown: React.FC<PropTypes> = ({
  children,
  url,
  source,
  context = {},
  plugins = [],
}) => {
  const [markdown, setMarkdown] = useState<string>(source || '');

  useEffect(() => {
    if (url) axios.get(url).then(response => setMarkdown(response.data));
  }, [url]);

  useEffect(() => {
    if (source) setMarkdown(source);
  }, [source]);

  useEffect(() => {
    if (children && typeof children === 'string') setMarkdown(children);
  }, [children]);

  const baseUrl = url?.slice(0, url.lastIndexOf('/')) || '';
  const sanitized = resolveUrls(markdown, baseUrl);

  const renderers = {
    heading: Heading,
    code: CodeBlock,
    link: Link,
    image: Image,
    inlineCode: WrappedInlineCode(context),
  };

  return (
    <Typography>
      <ReactMarkdown
        source={sanitized}
        renderers={renderers}
        plugins={[emoji, ...plugins]}
        allowDangerousHtml
      />
    </Typography>
  );
};


export default Markdown;

