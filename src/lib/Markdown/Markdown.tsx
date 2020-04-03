import React, { useState } from 'react';
import axios from 'axios';

import ContentSection from '../ContentSection/ContentSection';


interface PropTypes {
  data?: string;
  url?: string;
}

interface RawLinesPropType {
  rawLines: string[];
  level?: number;
}

const header = (level: number): string => {
  return `^#{${level}} .*$`;
}

const Content: React.FC<RawLinesPropType> = ({ rawLines }) => {
  const plainText = rawLines.map(line => <p> {line} </p>);
  return <p> {plainText} </p>;
}

const Level: React.FC<RawLinesPropType> = ({ rawLines, level = 0 }) => {
  const name = rawLines[0].slice(level);
  const contentSize = rawLines.findIndex(line => line.match(header(level + 1)));

  const rawContent = (contentSize > 0) ? rawLines.slice(1, contentSize) : rawLines.slice(1);
  const rawChildren = rawLines.slice(contentSize);

  const childrenLineGroups = rawChildren.reduce((acc: string[][], cur: string) => {
    if (cur.match(header(level + 1))) acc.push([]);
    if (acc.length) acc[acc.length - 1].push(cur);
    return acc;
  }, []);
  const children = childrenLineGroups.map(lineGroup => <Level rawLines={lineGroup} level={level + 1}/>)

  return level ? (
    <ContentSection sectionName={name}>
      <Content rawLines={rawContent} />
      {children}
    </ContentSection>
  ) : (
    <>
      {children}
    </>
  );
}

const Markdown: React.FC<PropTypes> = ({ data, url }) => {
  const [markdown, setMarkdown] = useState<string>(data || '');
  if (url) axios.get(url).then(response => setMarkdown(response.data));
  return <Level rawLines={markdown.split('\n')} />
};


export default Markdown;

