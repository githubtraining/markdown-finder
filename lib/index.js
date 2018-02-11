const regexes = require('./regexes')
const serializers = require('./serializers')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  images (cb = noop) {
    const matches = []

    let match
    while ((match = regexes.inline.image.exec(this.markdown)) != null) {
      matches.push(serializers.image(match))
    }

    return cb(matches)
  }

  links (cb = noop) {
    const matches = []

    let match
    while ((match = regexes.inline.link.exec(this.markdown)) != null) {
      if (!match[0].startsWith('!')) {
        matches.push(serializers.link(match))
      }
    }

    return cb(matches)
  }
}

module.exports = (...args) => new MarkdownFinder(...args)
