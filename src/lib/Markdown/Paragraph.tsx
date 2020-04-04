import React from 'react';

interface PropTypes {
  data: string;
}

interface Closures {
  [key: string]: string;
}

interface Patterns {
  [key: string]: RegExp;
}

interface Styles {
  [key: string]: React.CSSProperties;
}


const captureInside = (closure: string): any => {
  return new RegExp(closure + '([^' + closure + ']+)' + closure);
}
const capture = (closure: string): any => {
  return new RegExp('(' + closure + '[^' + closure + ']+' + closure + ')');
}

const closures: Closures = {
  inlineCode: '`',
  bold: '\\*\\*',
};

const styles: Styles = {
  inlineCode: { background: '#444444', padding: '4px' },
  bold: { fontWeight: 'bold' },
};
const patterns: Patterns = {};


Object.keys(closures).forEach((key: string): void => {
  patterns[key] = capture(closures[key]);
});

const matcher = new RegExp(Object.values(patterns).map(regex => regex.source).join('|'));

Object.keys(closures).forEach((key: string): void => {
  patterns[key] = captureInside(closures[key]);
});


const SyntaxSpan: React.FC<PropTypes> = ({ data }) => {
  if (!data) return null;
  for (let key in styles) {
    const match = data.match(patterns[key]);
    if (match) return <span style={styles[key]}>{match[1]}</span>;
  };
  return <>{data}</>;
}

const Paragraph: React.FC<PropTypes> = ({ data }) => {
  let result;
  result = data.split(matcher);
  result = result.map(span => <SyntaxSpan data={span} />);
  return <p> {result} </p>;
}

export default Paragraph;

