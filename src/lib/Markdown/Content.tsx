import React from 'react';

import CodeBlock from './CodeBlock';
import { ParserPropTypes } from './types';


const denotesCodeBlock = (line: string): boolean => {
  return line.slice(0, 3) === '```';
}

const Content: React.FC<ParserPropTypes> = ({ rawLines }) => {
  if (!rawLines.length) return null;

  const line = rawLines.splice(0, 1)[0];

  let result;
  if (denotesCodeBlock(line)) {
    const closeIndex = rawLines.findIndex(line => denotesCodeBlock(line));
    const codeBlockLines = rawLines.splice(0, closeIndex);
    result = <CodeBlock rawLines={codeBlockLines} />
  } else {
    result = <p> {line} </p>
  }

  return (
    <>
      { result }
      <Content rawLines={rawLines} />
    </>
  )
}

export default Content;

