const regexes = require('./regexes')
const noop = f => f

class MarkdownFinder {
  constructor (markdown) {
    this.markdown = markdown
  }

  get has () {
    return {
      image: (cb) => Boolean(this.image(cb)),
      link: (cb) => Boolean(this.link(cb))
    }
  }

  get get () {
    return {
      image: (cb) => this.image(cb),
      link: (cb) => this.link(cb)
    }
  }

  image (cb = noop) {
    const img = regexes.inline.image.exec(this.markdown)
    return cb(img)
  }

  link (cb = noop) {
    const link = regexes.inline.link.exec(this.markdown)
    if (link && link[0].startsWith('!')) return false
    return cb(link)
  }
}

module.exports = (...args) => new MarkdownFinder(...args)
