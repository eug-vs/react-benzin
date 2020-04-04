import React from 'react';
import ContentSection from '../ContentSection/ContentSection';
import Content from './Content';
import { ParserPropTypes } from './types';

interface PropTypes extends ParserPropTypes {
  level?: number;
}

const matchHeaderLevel = (line: string, level: number): boolean => {
  return line.match(`^#{${level}} .*$`) !== null;
}

const Section: React.FC<PropTypes> = ({ rawLines, level = 0 }) => {
  const sectionName = rawLines.splice(0, 1)[0].slice(level).trim();
  const contentSize = rawLines.findIndex(line => matchHeaderLevel(line, level + 1));
  const rawContent = rawLines.splice(0, (contentSize < 0) ? rawLines.length : contentSize);

  const childrenSectionLines = rawLines.reduce((sections: string[][], line: string) => {
    if (matchHeaderLevel(line, level + 1)) sections.push([]);
    if (sections.length) sections[sections.length - 1].push(line);
    return sections;
  }, []);
  const children = childrenSectionLines.map(sectionLines => <Section rawLines={sectionLines} level={level + 1}/>)

  return level ? (
    <ContentSection sectionName={sectionName}>
      <Content rawLines={rawContent} />
      {children}
    </ContentSection>
  ) : (
    <>
      {children}
    </>
  );
}

export default Section;

