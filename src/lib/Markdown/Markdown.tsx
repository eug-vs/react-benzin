import React, { useState } from 'react';
import axios from 'axios';

import Section from './Section';

interface PropTypes {
  data?: string;
  url?: string;
}

const Markdown: React.FC<PropTypes> = ({ data, url }) => {
  const [markdown, setMarkdown] = useState<string>(data || '');
  if (url) axios.get(url).then(response => setMarkdown(response.data));
  return <Section rawLines={markdown.split('\n')} />
};


export default Markdown;

