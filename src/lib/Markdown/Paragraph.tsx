import React from 'react';
import { InlineParserPropTypes } from './types';
import InlineSyntax, { splitter } from './InlineSyntax';

const Paragraph: React.FC<InlineParserPropTypes> = ({ line }) => {
  const result = line.split(splitter).map(span => <InlineSyntax line={span} />);
  return <p> {result} </p>;
}

export default Paragraph;


