import React from 'react';
import { ParserPropTypes } from './types';

const CodeBlock: React.FC<ParserPropTypes> = ({ rawLines }) => {
  return (
    <p style={{background: 'rgba(255, 255, 255, .1)', padding: '8px' }}>
      {rawLines.map(line => <> {line} <br/> </>)}
    </p>
  );
}

export default CodeBlock;

