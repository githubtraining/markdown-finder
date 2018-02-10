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
    if (!img) return false

    const obj = {
      match: img[0],
      text: img[1],
      url: img[2]
    }

    return cb(obj)
  }

  link (cb = noop) {
    const link = regexes.inline.link.exec(this.markdown)

    if (!link || link[0].startsWith('!')) return false

    const obj = {
      match: link[0],
      text: link[1],
      url: link[2]
    }

    return cb(obj)
  }
}

module.exports = (...args) => new MarkdownFinder(...args)
