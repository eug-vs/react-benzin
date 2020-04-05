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

const Content: React.FC<ParserPropTypes> = ({ rawLines }) => {
  if (!rawLines.length) return null;

  const line = rawLines.splice(0, 1)[0];

  let result;
  if (denotesCodeBlock(line)) {
    const closeIndex = rawLines.findIndex(line => denotesCodeBlock(line));
    const codeBlockLines = rawLines.splice(0, closeIndex + 1).slice(0, closeIndex);
    result = <CodeBlock rawLines={codeBlockLines} />
  } else if (denotesDottedList(line)) {
    const closeIndex = rawLines.findIndex(line => !denotesDottedList(line));
    const dottedListLines = rawLines.splice(0, closeIndex).slice(0, closeIndex);
    dottedListLines.unshift(line);
    result = <ul>{dottedListLines.map(li => <li><InlineSyntax line={li} /></li>)}</ul>;
  } else {
    result = <Paragraph line={line} />
  }

  return (
    <>
      { result }
      <Content rawLines={rawLines} />
    </>
  );
}

export default Content;

