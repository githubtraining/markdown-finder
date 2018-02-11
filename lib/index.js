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
}

module.exports = (...args) => new MarkdownFinder(...args)
