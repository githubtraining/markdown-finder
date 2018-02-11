const regexes = require('./regexes')
const serializers = require('./serializers')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  get has () {
    return {
      images: (cb) => Boolean(this.images(cb)) && this.images(cb).length > 0,
      links: (cb) => Boolean(this.links(cb)) && this.links(cb).length > 0
    }
  }

  get get () {
    return {
      images: (cb) => this.images(cb),
      links: (cb) => this.links(cb)
    }
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
