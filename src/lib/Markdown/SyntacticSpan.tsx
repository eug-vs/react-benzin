import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

import { lib as emojiLib } from 'emojilib';

interface PropTypes {
  span: string;
}

interface RegexPair {
  global: RegExp;
  local: RegExp;
}

interface Emoji {
  name: string;
  char: string;
}

const enclosureRegex = (e: string): RegexPair => ({
  local: new RegExp(`${e}([^${e}]+)${e}`),
  global: new RegExp(`(${e}[^${e}]+${e})`)
});

const regex: Record<string, RegexPair> = {
  conceal: {
    global: /(!?\[.+?\]\(.+?\))/g,
    local: /!?\[(.+?)\]\((.+?)\)/
  },
  rawLink: {
    global: /((?:(?:[A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)(?:(?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/,
    local: /&^/
  },
  emoji: enclosureRegex(':'),
  bold: enclosureRegex('\\*\\*'),
  italic: enclosureRegex('\\*'),
  code: enclosureRegex('`'),
  strikeThrough: enclosureRegex('~~'),
}

const splitter = new RegExp(Object.values(regex).map(pair => pair.global.source).join('|'));

const emojiList: Emoji[] = [];
Object.keys(emojiLib).forEach(name => emojiList.push({ name, char: emojiLib[name].char }));
console.log({emojiList})

const useStyles = makeStyles(theme => ({
  code: {
    background: theme.palette.background.default,
    borderRadius: theme.spacing(.5),
    padding: theme.spacing(.5),
    fontFamily: 'Monospace',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
}));

const SyntacticSpan: React.FC<PropTypes> = ({ span }) => {
  const classes = useStyles();
  if (!span) return null;

  const matchConceal = regex.conceal.local.exec(span);
  if (matchConceal) {
    if (span[0] === '!') return <img src={matchConceal[2]} alt={matchConceal[1]} className={classes.image} />;
    return <Link href={matchConceal[2]}>{matchConceal[1]}</Link>;
  }

  const matchEmoji = span.match(regex.emoji.local);
  if (matchEmoji) {
    const emoji = emojiList.find(emoji => emoji.name === matchEmoji[1]);
    return <span>{emoji ? emoji.char : span}</span>;
  }

  const matchCode = span.match(regex.code.local);
  if (matchCode) return <span className={classes.code}>{matchCode[1]}</span>;

  const matchBold = span.match(regex.bold.local);
  if (matchBold) return <b>{matchBold[1]}</b>;

  const matchItalic = span.match(regex.italic.local);
  if (matchItalic) return <i>{matchItalic[1]}</i>;

  const matchStrikeThrough = span.match(regex.strikeThrough.local);
  if (matchStrikeThrough) return <span style={{textDecoration: 'line-through' }}>{matchStrikeThrough[1]}</span>;

  if (span.match(regex.rawLink.global)) return <Link href={span}>{span}</Link>;

  return <>{span}</>;
}


export { splitter };
export default SyntacticSpan;

