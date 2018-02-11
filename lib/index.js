const regexes = require('./regexes')
const serializers = require('./serializers')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  finder (reg, serializer, matches) {
    let match
    while ((match = reg.exec(this.markdown)) != null) {
      matches.push(serializer(match))
    }
  }

  images (cb = noop) {
    const matches = []
    this.finder(regexes.inline.image, serializers.image, matches)

    return cb(matches)
  }

  links (cb = noop) {
    const matches = []
    this.finder(regexes.inline.link, serializers.link, matches)
    const filtered = matches.filter(f => !f.match.startsWith('!'))

    return cb(filtered)
  }
}

module.exports = (...args) => new MarkdownFinder(...args)
