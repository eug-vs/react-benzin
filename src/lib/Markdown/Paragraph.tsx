import React from 'react';
import { Link } from '@material-ui/core';

interface PropTypes {
  data: string;
}

type InlineRuleName = 'bold' | 'italic' | 'code' | 'strikeThrough';

interface InlineRuleProperties {
  enclosure: string;
  style: React.CSSProperties;
  pattern?: RegExp;
}

const inlineRules: Record<InlineRuleName, InlineRuleProperties>= {
  // Order matters - lowest property has highest priority
  strikeThrough: {
    enclosure: '~~',
    style: { textDecoration: 'line-through' },
  },
  code: {
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

const inlineRuleNames = Object.keys(inlineRules) as InlineRuleName[];

const captureInline = (enclosure: string): RegExp => {
  return new RegExp(enclosure + '([^' + enclosure + ']+)' + enclosure);
}
const captureInlineSplit = (enclosure: string): string => {
  return '(' + enclosure + '[^' + enclosure + ']+' + enclosure + ')';
}
const concealRegex = /!?\[(.+?)\]\((.+?)\)/;
const concealRegexSplit = /(!?\[.+?\]\(.+?\))/g;
const rawLinkRegex = /((?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

const ruleSplitPatterns: string[] = [concealRegexSplit.source, rawLinkRegex.source];
inlineRuleNames.forEach(name => {
  const enclosure = inlineRules[name].enclosure;
  inlineRules[name].pattern = captureInline(enclosure);
  ruleSplitPatterns.push(captureInlineSplit(enclosure));
});

const splitter = new RegExp(ruleSplitPatterns.join('|'));

const SyntaxSpan: React.FC<PropTypes> = ({ data }) => {
  if (!data) return null;

  const conceal = concealRegex.exec(data);
  if (conceal) {
    if (data[0] === '!') return <img src={conceal[2]} alt={conceal[1]} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
    return <Link href={conceal[2]}>{conceal[1]}</Link>;
  }

  if (data.match(rawLinkRegex)) return <Link href={data}>{data}</Link>;

  let span = <>{data}</>;
  inlineRuleNames.forEach(name => {
    const rule = inlineRules[name];
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


