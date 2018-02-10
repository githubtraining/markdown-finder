/* eslint-disable func-call-spacing, no-unexpected-multiline, no-useless-escape */

const replace = require('./regex-replace')

// Largely copied from https://github.com/chjj/marked/blob/master/lib/marked.js

const block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/
}

block._label = /(?:\\[\[\]]|[^\[\]])+/
block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/
block.def = replace(block.def)
  ('label', block._label)
  ('title', block._title)
  ()

block.bullet = /(?:[*+-]|\d+\.)/
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/
block.item = replace(block.item, 'gm')
  (/bull/g, block.bullet)
  ()

block.list = replace(block.list)
  (/bull/g, block.bullet)
  ('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  ('def', '\\n+(?=' + block.def.source + ')')
  ()

block._tag = '(?!(?:' +
  'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' +
  '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' +
  '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'

block.html = replace(block.html)
  ('comment', /<!--[\s\S]*?-->/)
  ('closed', /<(tag)[\s\S]+?<\/\1>/)
  ('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>]*)*?\/?>/)
  (/tag/g, block._tag)
  ()

block.paragraph = replace(block.paragraph)
  ('hr', block.hr)
  ('heading', block.heading)
  ('lheading', block.lheading)
  ('tag', '<' + block._tag)
  ()

block.blockquote = replace(block.blockquote)
  ('paragraph', block.paragraph)
()

const inline = {
  escape: /\\([\\`*{}\[\]()#+\-.!_>])/,
  tag: /<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/]*)*?\/?>/,
  link: /!?\[(inside)\]\(href\)/,
  image: /!\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)(\s*)([\s\S]*?[^`]?)\2\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
}

inline._inside = /(?:\[[^\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/

inline.link = replace(inline.link)
  ('inside', inline._inside)
  ('href', inline._href)
()

inline.image = replace(inline.image)
  ('inside', inline._inside)
  ('href', inline._href)
()

console.log(inline.link)

module.exports = { block, inline }
