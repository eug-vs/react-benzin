import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

// @ts-ignore-next-line;
import { lib as emojiLib } from 'emojilib';
import { InlineParserPropTypes } from './types';

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

const InlineSyntax: React.FC<InlineParserPropTypes> = ({ line }) => {
  const classes = useStyles();
  if (!line) return null;

  const matchConceal = regex.conceal.local.exec(line);
  if (matchConceal) {
    if (line[0] === '!') return <img src={matchConceal[2]} alt={matchConceal[1]} className={classes.image} />;
    return <Link href={matchConceal[2]}>{matchConceal[1]}</Link>;
  }

  const matchEmoji = line.match(regex.emoji.local);
  if (matchEmoji) {
    const emoji = emojiList.find(emoji => emoji.name === matchEmoji[1]);
    return <span>{emoji ? emoji.char : line}</span>;
  }

  const matchCode = line.match(regex.code.local);
  if (matchCode) return <span className={classes.code}>{matchCode[1]}</span>;

  const matchBold = line.match(regex.bold.local);
  if (matchBold) return <b>{matchBold[1]}</b>;

  const matchItalic = line.match(regex.italic.local);
  if (matchItalic) return <i>{matchItalic[1]}</i>;

  const matchStrikeThrough = line.match(regex.strikeThrough.local);
  if (matchStrikeThrough) return <span style={{textDecoration: 'line-through' }}>{matchStrikeThrough[1]}</span>;

  if (line.match(regex.rawLink.global)) return <Link href={line}>{line}</Link>;

  return <>{line}</>;
}


export { splitter };
export default InlineSyntax;

