import React from 'react';
import { ParserPropTypes } from './types';

const CodeBlock: React.FC<ParserPropTypes> = ({ rawLines }) => {
  return (
    <p style={{background: '#444444'}}>
      {rawLines.map(line => <> {line} <br/> </>)}
    </p>
  );
}

export default CodeBlock;

