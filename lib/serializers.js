module.exports = {
  image: match => ({
    match: match[0],
    text: match[1],
    url: match[2]
  }),
  link: match => ({
    match: match[0],
    text: match[1],
    url: match[2]
  }),
  bold: match => ({
    match: match[0],
    text: match[1] || match[2]
  }),
  italic: match => ({
    match: match[0],
    text: match[1] || match[2]
  }),
  code: match => ({
    match: match[0],
    text: match[3]
  }),
  codeBlock: match => ({
    match: match[0],
    language: match[2],
    text: match[3]
  })
}
