import React from 'react';

interface PropTypes {
  data: string;
}

type RuleName = 'bold' | 'italic' | 'inlineCode' | 'strikeThrough';

interface RuleProperties {
  enclosure: string;
  style: React.CSSProperties;
  pattern?: RegExp;
}

const rules: Record<RuleName, RuleProperties>= {  // Order matters - lowest property has highest priority
  strikeThrough: {
    enclosure: '~~',
    style: { textDecoration: 'line-through' },
  },
  inlineCode: {
    enclosure: '`',
    style: { background: '#444444', padding: '4px' },
  },
  italic: {
    enclosure: '\\*',
    style: { fontStyle: 'italic' },
  },
  bold: {
    enclosure: '\\*\\*',
    style: { fontWeight: 'bold' },
  },
};

const ruleNames = Object.keys(rules) as RuleName[];

const capture = (enclosure: string): RegExp => {
  return new RegExp(enclosure + '([^' + enclosure + ']+)' + enclosure);
}
const captureSplit = (enclosure: string): string => {
  return '(' + enclosure + '[^' + enclosure + ']+' + enclosure + ')';
}

const ruleSplitPatterns: string[] = [];
ruleNames.forEach(name => {
  rules[name].pattern = capture(rules[name].enclosure);
  ruleSplitPatterns.push(captureSplit(rules[name].enclosure));
});

const splitter = new RegExp(ruleSplitPatterns.join('|'));

const SyntaxSpan: React.FC<PropTypes> = ({ data }) => {
  if (!data) return null;
  let span = <>{data}</>;
  ruleNames.forEach(name => {
    const rule = rules[name];
    const match = data.match(rule.pattern || '');
    if (match) span = <span style={rule.style}>{match[1]}</span>;
  });
  return span;
}

const Paragraph: React.FC<PropTypes> = ({ data }) => {
  const result = data.split(splitter).map(span => <SyntaxSpan data={span} />);
  return <p> {result} </p>;
}

export default Paragraph;

