import React from 'react';
import { InlineParserPropTypes } from './types';
import InlineSyntax, { splitter } from './InlineSyntax';

const Text: React.FC<InlineParserPropTypes> = ({ line }) => {
  return <>{line.split(splitter).map(span => <InlineSyntax line={span} />)}</>;
}

export default Text;

