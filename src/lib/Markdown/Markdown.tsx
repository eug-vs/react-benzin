import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Section from './Section';

interface PropTypes {
  data?: string;
  url?: string;
}

const resolveUrls = (line: string, baseUrl: string): string => {
  return line.replace(/src="(?!http)(.*)"[\s>]/, (match, url, offset, string) => `src="${baseUrl}/${url}?sanitize=true"`)
             .replace(/\[(.*\]?.*)\]\((?!http)(.+?)\)/, (match, text, url, offset, string) => `[${text}](${baseUrl}/${url})`);
}

const Markdown: React.FC<PropTypes> = ({ data, url }) => {
  const [markdown, setMarkdown] = useState<string>(data || '');

  if (url) axios.get(url).then(response => setMarkdown(response.data));

  useEffect(() => {
    if (!url) setMarkdown(data || '');
  }, [data, url]);

  const baseUrl = url?.slice(0, url.lastIndexOf('/')) || '';
  const lines = markdown.split(/\r?\n/).map(line => resolveUrls(line, baseUrl));
  return <Section rawLines={lines} />
};


export default Markdown;

