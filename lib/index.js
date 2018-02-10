const regexes = require('./regexes')
const serializers = require('./serializers')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  get has () {
    return {
      image: (cb) => Boolean(this.image(cb)),
      images: (cb) => Boolean(this.images(cb)) && this.images(cb).length > 0,
      link: (cb) => Boolean(this.link(cb)),
      links: (cb) => Boolean(this.links(cb)) && this.links(cb).length > 0
    }
  }

  get get () {
    return {
      image: (cb) => this.image(cb),
      images: (cb) => this.images(cb),
      link: (cb) => this.link(cb),
      links: (cb) => this.links(cb)
    }
  }

  image (cb = noop) {
    const img = regexes.inline.image.exec(this.markdown)
    if (!img) return false
    return cb(serializers.image(img))
  }

  images (cb = noop) {
    const matches = []
    let match

    while ((match = regexes.inline.image.exec(this.markdown)) != null) {
      matches.push(serializers.image(match))
    }

    return matches
  }

  link (cb = noop) {
    const link = regexes.inline.link.exec(this.markdown)
    if (!link || link[0].startsWith('!')) return false
    return cb(serializers.link(link))
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
