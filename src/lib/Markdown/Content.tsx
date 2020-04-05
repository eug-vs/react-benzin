import React from 'react';

import CodeBlock from './CodeBlock';
import Paragraph from './Paragraph';
import InlineSyntax from './InlineSyntax';
import { ParserPropTypes } from './types';


const denotesCodeBlock = (line: string): boolean => {
  return line.match(/^```.*$/) !== null;
}

const denotesDottedList = (line: string): boolean => {
  return line.match(/^ ?- .*$/) !== null;
}

const denotesOpenHtmlTag = (line: string): string => {
  const regex = /<([^/\s]*)[^<]*[^/]>/g;
  const match = regex.exec(line);
  return match ? match[1] : '';
}

const denotesClosingHtmlTag = (line: string, tag: string): boolean => {
  const regex = new RegExp(`</${tag}[^<]*>`);
  return line.match(regex) !== null;
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
  } else if (denotesOpenHtmlTag(line)) {
    const tag = denotesOpenHtmlTag(line);
    const closeIndex = rawLines.findIndex(line => denotesClosingHtmlTag(line, tag));
    const htmlLines = rawLines.splice(0, closeIndex + 1).slice(0, closeIndex);
    htmlLines.unshift(line);
    buffer = <div dangerouslySetInnerHTML={{ __html: htmlLines.join('\n') }}></div>;
  } else {
    buffer = <Paragraph line={line} />
  }

  return (
    <>
      { buffer }
      <Content rawLines={rawLines} />
    </>
  );
}

export default Content;

