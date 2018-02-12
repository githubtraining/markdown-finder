const regexes = require('./regexes')
const serializers = require('./serializers')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  finder (reg, serializer) {
    const matches = []

    let match
    while ((match = reg.exec(this.markdown)) != null) {
      console.log(match)
      matches.push(serializer(match))
    }

    return matches
  }

  images (cb = noop) {
    const matches = this.finder(regexes.inline.image, serializers.image)
    return cb(matches)
  }

  links (cb = noop) {
    const matches = this.finder(regexes.inline.link, serializers.link)
    const filtered = matches.filter(f => !f.match.startsWith('!'))
    return cb(filtered)
  }

  bolds (cb = noop) {
    const matches = this.finder(regexes.inline.strong, serializers.bold)
    return cb(matches)
  }

  italics (cb = noop) {
    const matches = this.finder(regexes.inline.em, serializers.italic)
    return cb(matches)
  }

  code (cb = noop) {
    const matches = this.finder(regexes.inline.code, serializers.code)
    return cb(matches)
  }

  codeBlock (cb = noop) {
    const matches = this.finder(regexes.block.code, serializers.codeBlock)
    return cb(matches)
  }
}

module.exports = (...args) => new MarkdownFinder(...args)
