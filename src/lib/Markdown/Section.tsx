import React from 'react';
import { Typography } from '@material-ui/core';
import ContentSection from '../ContentSection/ContentSection';
import Content from './Content';
import { ParserPropTypes } from './types';

interface PropTypes extends ParserPropTypes {
  level?: number;
}

const getHeaderLevel = (header: string): number => {
  if (!header) return 0;
  let level = 0;
  while (header[level] === '#') level++;
  return level;
};

const ChildrenSections: React.FC<PropTypes> = ({ rawLines, level = 0 }) => {
  const childrenSectionLines = rawLines.reduce((sections: string[][], line: string) => {
    if (line) {
      if (getHeaderLevel(line) === level) sections.push([]);
      if (sections.length) sections[sections.length - 1].push(line);
    }
    return sections;
  }, []);
  const children = childrenSectionLines.map(sectionLines => <Section rawLines={sectionLines} level={level} />);
  return <>{children}</>;
};

const Section: React.FC<PropTypes> = ({ rawLines, level = 0 }) => {
  const deeperLevelIndex = rawLines.findIndex(line => line.match(`^#{${level + 1},} .*$`));
  const rawContent = rawLines.splice(0, (deeperLevelIndex < 0) ? rawLines.length : deeperLevelIndex);

  if (!level) {
    return (
      <>
        <Typography><Content rawLines={rawContent} /></Typography>
        <ChildrenSections rawLines={rawLines} level={getHeaderLevel(rawLines[0])} />
      </>
    );
  }

  const sectionName = rawContent.splice(0, 1)[0].slice(level).trim();
  const deeperLevel = getHeaderLevel(rawLines[0]);
  return (
    <ContentSection sectionName={sectionName} level={level}>
      <Content rawLines={rawContent} />
      <ChildrenSections rawLines={rawLines} level={deeperLevel} />
    </ContentSection>
  );
};

export default Section;

