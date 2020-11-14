import React from 'react';
import { Typography } from '@material-ui/core';
import ContentSection from '../ContentSection/ContentSection';
import Content from './Content';
import { ParserPropTypes } from './types';

interface PropTypes extends ParserPropTypes {
  level?: number;
}

interface MapperPropTypes extends PropTypes {
  SectionComponent: React.FC<PropTypes>;
}

const getHeaderLevel = (header: string): number => {
  if (!header) return 0;
  let level = 0;
  while (header[level] === '#') level += 1;
  return level;
};

const SectionMapper: React.FC<MapperPropTypes> = ({ rawLines, level = 0, SectionComponent }) => {
  const children = rawLines
    .reduce((sections: string[][], line: string) => {
      if (line) {
        if (getHeaderLevel(line) === level) sections.push([]);
        if (sections.length) sections[sections.length - 1].push(line);
      }
      return sections;
    }, [])
    .map(sectionLines => <SectionComponent rawLines={sectionLines} level={level} />);

  return <>{children}</>;
};


const Section: React.FC<PropTypes> = ({ rawLines, level = 0 }) => {
  const deeperLevelIndex = rawLines.findIndex(line => line.match(`^#{${level + 1},} .*$`));
  const rawContent = rawLines.splice(0, (deeperLevelIndex < 0) ? rawLines.length : deeperLevelIndex);

  if (!level) {
    return (
      <>
        <Typography><Content rawLines={rawContent} /></Typography>
        <SectionMapper rawLines={rawLines} level={getHeaderLevel(rawLines[0])} SectionComponent={Section} />
      </>
    );
  }

  const sectionName = rawContent.splice(0, 1)[0].slice(level).trim();
  const deeperLevel = getHeaderLevel(rawLines[0]);
  return (
    <ContentSection sectionName={sectionName} level={level}>
      <Content rawLines={rawContent} />
      <SectionMapper rawLines={rawLines} level={deeperLevel} SectionComponent={Section} />
    </ContentSection>
  );
};

export default Section;

