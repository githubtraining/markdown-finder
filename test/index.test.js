const finder = require('../lib')

describe('MarkdownFinder', () => {
  describe('has', () => {
    describe('images', () => {
      it('returns true if there are multiple images', () => {
        const md = 'This is an image ![img](example.com/image.png) and so is this ![img](example.com/photo.png)'
        expect(finder(md).has.images()).toBe(true)
      })

      it('returns false if it does not exist', () => {
        const md = 'No images here'
        expect(finder(md).has.images()).toBe(false)
      })
    })

    describe('links', () => {
      it('returns an array of links', () => {
        const md = 'This is a link [link](example.com) and so is [this](this.com)'
        expect(finder(md).has.links()).toBe(true)
      })

      it('returns an empty array if the markdown does not contain any links', () => {
        const md = 'This is not an link'
        expect(finder(md).has.links()).toBe(false)
      })
    })
  })

  describe('get', () => {
    describe('images', () => {
      it('returns an array of images', () => {
        const md = 'This is an image ![img](example.com/image.png) and so is this ![img](example.com/photo.png)'
        const images = finder(md).get.images()
        expect(Array.isArray(images)).toBe(true)
        expect(images).toMatchSnapshot()
      })

      it('returns false if it does not exist', () => {
        const md = 'No images here'
        expect(finder(md).get.images()).toEqual([])
      })
    })

    describe('links', () => {
      it('returns an array of links', () => {
        const md = 'This is a link [link](example.com) and so is [this](this.com)'
        expect(finder(md).get.links()).toMatchSnapshot()
      })

      it('returns an empty array if the markdown does not contain any links', () => {
        const md = 'This is not an link'
        expect(finder(md).get.links()).toEqual([])
      })

      it('returns an array of links but not images', () => {
        const md = 'This is a link [link](example.com) and this is an image ![this](this.com)'
        expect(finder(md).get.links().length).toBe(1)
      })
    })
  })
})
