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

const ChildrenSections: React.FC<PropTypes> = ({ rawLines, level = 1 }) => {
  const childrenSectionLines = rawLines.reduce((sections: string[][], line: string) => {
    if (matchHeaderLevel(line, level)) sections.push([]);
    if (sections.length) sections[sections.length - 1].push(line);
    return sections;
  }, []);
  const children = childrenSectionLines.map(sectionLines => <Section rawLines={sectionLines} level={level}/>);
  return <> {children} </>;
}

const Section: React.FC<PropTypes> = ({ rawLines, level = 0 }) => {
  if (!level) {
    const beforeMarkdown = rawLines.splice(0, rawLines.findIndex(line => line.match(/^#.+$/g)));
    console.log(`This content was found in original .md file but will not be shown: ${beforeMarkdown.join()}`);
    while(rawLines[0][level + 1] === '#') level++;
    return <ChildrenSections rawLines={rawLines} level={level + 1}/>;
  }

  const sectionName = rawLines.splice(0, 1)[0].slice(level).trim();
  const contentSize = rawLines.findIndex(line => matchHeaderLevel(line, level + 1));
  const rawContent = rawLines.splice(0, (contentSize < 0) ? rawLines.length : contentSize);

  return (
    <ContentSection sectionName={sectionName} level={level}>
      <Content rawLines={rawContent} />
      <ChildrenSections rawLines={rawLines} level={level + 1} />
    </ContentSection>
  );
}

export default Section;

