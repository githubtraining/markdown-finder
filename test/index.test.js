const finder = require('../lib')

describe('MarkdownFinder', () => {
  describe('has', () => {
    describe('image', () => {
      it('returns true if the markdown contains an image', () => {
        const md = 'This is an image ![img](example.com/image.png)'
        expect(finder(md).has.image()).toBe(true)
      })

      it('returns false if the markdown does not contain an image', () => {
        const md = 'This is not an image'
        expect(finder(md).has.image()).toBe(false)
      })

      it('does not match non-image links', () => {
        const md = 'This is a link [link](url)'
        expect(finder(md).has.image()).toBe(false)
      })
    })

    describe('link', () => {
      it('returns true if the markdown contains an link', () => {
        const md = 'This is a link [link](example.com)'
        expect(finder(md).has.link()).toBe(true)
      })

      it('returns false if the markdown does not contain a link', () => {
        const md = 'This is not an link'
        expect(finder(md).has.link()).toBe(false)
      })

      it('does not match image links', () => {
        const md = 'This is an image ![img](url)'
        expect(finder(md).has.link()).toBe(false)
      })
    })
  })

  describe('get', () => {
    describe('image', () => {
      it('returns the image if it exists', () => {
        const md = 'This is an image ![img](example.com/image.png)'
        expect(finder(md).get.image()).toMatchSnapshot()
      })

      it('returns false if it does not exist', () => {
        const md = 'This is not an image'
        expect(finder(md).get.image()).toBe(false)
      })
    })

    describe('link', () => {
      it('returns true if the markdown contains an link', () => {
        const md = 'This is a link [link](example.com)'
        expect(finder(md).get.link()).toMatchSnapshot()
      })

      it('returns false if the markdown does not contain a link', () => {
        const md = 'This is not an link'
        expect(finder(md).get.link()).toBe(false)
      })
    })
  })
})
