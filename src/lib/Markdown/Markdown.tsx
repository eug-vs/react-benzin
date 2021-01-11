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
  data?: string;
  url?: string;
  context?: any;
}

const resolveUrls = (line: string, baseUrl: string): string => line.replace(
  /src="(?!http)(.*)"[\s>]/,
  (match, url) => `src="${baseUrl}/${url}?sanitize=true"`,
).replace(
  /\[(.*\]?.*)\]\((?!http)(.+?)\)/g,
  (match, text, url) => `[${text}](${baseUrl}/${url})`,
);


const Markdown: React.FC<PropTypes> = ({ data, url, context = {} }) => {
  const [markdown, setMarkdown] = useState<string>(data || '');

  if (url) axios.get(url).then(response => setMarkdown(response.data));

  useEffect(() => {
    if (!url) setMarkdown(data || '');
  }, [data, url]);

  const baseUrl = url?.slice(0, url.lastIndexOf('/')) || '';

  const sanitized = resolveUrls(markdown, baseUrl);

  const renderers = {
    heading: Heading,
    inlineCode: InlineCode,
    link: Link,
    image: Image,
    code: ({ language, value }: any) => {
      if (language === 'react') return context[value] || null;
      return CodeBlock({ value });
    },
  };


  return (
    <Typography>
      <ReactMarkdown
        source={sanitized}
        renderers={renderers}
        plugins={[emoji]}
        allowDangerousHtml
      />
    </Typography>
  );
};


export default Markdown;

