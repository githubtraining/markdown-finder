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
  })
}
