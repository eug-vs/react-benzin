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

const CodeBlock: React.FC<{ rawLines: String[]}> = ({ rawLines }) => {
  return (
    <p style={{background: '#444444'}}>
      {rawLines.map(line => <> {line} <br/> </>)}
    </p>
  );
}


const Content: React.FC<RawLinesPropType> = ({ rawLines }) => {
  if (!rawLines.length) return <></>;
  const line = rawLines[0];
  const otherLines = rawLines.slice(1);
  if (line.slice(0, 3) === '```') {
    const closeIndex = otherLines.findIndex(line => line.slice(0, 3) === '```');
    console.log({ line, otherLines, closeIndex });
    return (
      <>
        <CodeBlock rawLines={otherLines.slice(0, closeIndex)} />
        <Content rawLines={otherLines.slice(closeIndex + 1)} />
      </>
    )
  }
  return (
    <>
      <p> {line} </p>
      <Content rawLines={rawLines.slice(1)} />
    </>
  )
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

