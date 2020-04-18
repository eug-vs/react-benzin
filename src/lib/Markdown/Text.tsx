import React from 'react';
import SyntacticSpan, { splitter } from './SyntacticSpan';

interface PropTypes {
  line: string;
}

const Text: React.FC<PropTypes> = ({ line }) => {
  return <>{line.split(splitter).map(span => <SyntacticSpan span={span} />)}</>;
};

export default Text;

