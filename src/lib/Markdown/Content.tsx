import React from 'react';

import CodeBlock from './CodeBlock';
import Text from './Text';
import { ParserPropTypes } from './types';


const denotesCodeBlock = (line: string): boolean => {
  return line.match(/^\s*```.*$/) !== null;
};

const denotesDottedList = (line: string): boolean => {
  return line.match(/^ ?[-*] .*$/) !== null;
};

const denotesOpenHtml = (line: string): string => {
  const regex = /<([^/\s]*)[^<]*[^/]>/g;
  const match = regex.exec(line);
  return match ? match[1] : '';
};

const denotesClosingHtml = (line: string, tag: string): boolean => {
  const regex = new RegExp(`</${tag}[^<]*>`);
  return line.match(regex) !== null;
};

const denotesSelfClosingHtml = (line: string): string[] | null => {
  const regex = /(<[^/\s]*[^<]*\/>)/g;
  return line.match(regex);
};

const declaresNoLineBreak = (line: string): boolean => {
  return line.match(/\\\|$/) !== null;
};

const Content: React.FC<ParserPropTypes> = ({ rawLines }) => {
  if (!rawLines.length) return null;

  const line = rawLines.splice(0, 1)[0];

  let buffer;
  if (denotesCodeBlock(line)) {
    const closeIndex = rawLines.findIndex(rawLine => denotesCodeBlock(rawLine));
    const codeBlockLines = rawLines.splice(0, closeIndex + 1).slice(0, closeIndex);
    buffer = <CodeBlock rawLines={codeBlockLines} />;
  } else if (denotesDottedList(line)) {
    const closeIndex = rawLines.findIndex(rawLine => !denotesDottedList(rawLine));
    const dottedListLines = rawLines.splice(0, closeIndex).slice(0, closeIndex);
    dottedListLines.unshift(line);
    buffer = <ul>{dottedListLines.map(li => <li><Text line={li.slice(2)} /></li>)}</ul>;
  } else if ((buffer = denotesOpenHtml(line))) {
    const tag = buffer;
    const closeIndex = denotesClosingHtml(line, tag) ? -1 : rawLines.findIndex(
      rawLine => denotesClosingHtml(rawLine, tag),
    );
    const htmlLines = rawLines.splice(0, closeIndex + 1);
    htmlLines.unshift(line);
    buffer = <div dangerouslySetInnerHTML={{ __html: htmlLines.join('\n') }} />;
  } else if ((buffer = denotesSelfClosingHtml(line)) !== null) {
    const match = buffer[0];
    const [before, after] = line.split(match);
    buffer = (
      <>
        <Text line={before} />
        <div dangerouslySetInnerHTML={{ __html: match }} />
        <Text line={after} />
      </>
    );
  } else if (declaresNoLineBreak(line)) {
    const closeIndex = rawLines.findIndex(rawLine => !declaresNoLineBreak(rawLine));
    const lineBreakLines = rawLines.splice(0, closeIndex).map(rawLine => rawLine.slice(0, -2));
    lineBreakLines.unshift(line.slice(0, -2));
    lineBreakLines.push(rawLines.splice(0, 1)[0]);
    buffer = <p>{lineBreakLines.map(lineBreakLine => <Text line={lineBreakLine} />)}</p>;
  } else if (denotesClosingHtml(line, '')) {
    buffer = null;
  } else {
    buffer = <p><Text line={line} /></p>;
  }

  return (
    <>
      { buffer }
      <Content rawLines={rawLines} />
    </>
  );
};

export default Content;

