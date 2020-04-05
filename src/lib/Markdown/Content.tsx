import React from 'react';

import CodeBlock from './CodeBlock';
import Text from './Text';
import InlineSyntax from './InlineSyntax';
import { ParserPropTypes } from './types';


const denotesCodeBlock = (line: string): boolean => {
  return line.match(/^```.*$/) !== null;
}

const denotesDottedList = (line: string): boolean => {
  return line.match(/^ ?- .*$/) !== null;
}

const denotesOpenHtml= (line: string): string => {
  const regex = /<([^/\s]*)[^<]*[^/]>/g;
  const match = regex.exec(line);
  return match ? match[1] : '';
}

const denotesClosingHtml= (line: string, tag: string): boolean => {
  const regex = new RegExp(`</${tag}[^<]*>`);
  return line.match(regex) !== null;
}

const denotesSelfClosingHtml = (line: string): any => {
  const regex = /(<[^/\s]*[^<]*\/>)/g;
  return line.match(regex);
}

const Content: React.FC<ParserPropTypes> = ({ rawLines }) => {
  if (!rawLines.length) return null;

  const line = rawLines.splice(0, 1)[0];

  let buffer;
  if (denotesCodeBlock(line)) {
    const closeIndex = rawLines.findIndex(line => denotesCodeBlock(line));
    const codeBlockLines = rawLines.splice(0, closeIndex + 1).slice(0, closeIndex);
    buffer = <CodeBlock rawLines={codeBlockLines} />
  } else if (denotesDottedList(line)) {
    const closeIndex = rawLines.findIndex(line => !denotesDottedList(line));
    const dottedListLines = rawLines.splice(0, closeIndex).slice(0, closeIndex);
    dottedListLines.unshift(line);
    buffer = <ul>{dottedListLines.map(li => <li><InlineSyntax line={li} /></li>)}</ul>;
  } else if (denotesOpenHtml(line)) {
    const tag = denotesOpenHtml(line);
    const closeIndex = rawLines.findIndex(line => denotesClosingHtml(line, tag));
    const htmlLines = rawLines.splice(0, closeIndex + 1).slice(0, closeIndex);
    htmlLines.unshift(line);
    buffer = <div dangerouslySetInnerHTML={{ __html: htmlLines.join('\n') }}></div>;
  } else if (denotesSelfClosingHtml(line) !== null) {
    const match = denotesSelfClosingHtml(line)[0];
    const [before, after] = line.split(match);
    console.log({ line, match, before, after});
    buffer = (
      <>
        <Text line={before} />
        <div dangerouslySetInnerHTML={{ __html: match }}></div>
        <Text line={after} />
      </>
    );
  } else {
    buffer = <p><Text line={line} /></p>
  }

  return (
    <>
      { buffer }
      <Content rawLines={rawLines} />
    </>
  );
}

export default Content;

