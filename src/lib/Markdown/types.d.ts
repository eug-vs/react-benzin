declare module 'remark-gemoji';
declare module '*.md' {
  // eslint-disable-next-line import/no-mutable-exports
  let Markdown: string;
  export default Markdown;
}

