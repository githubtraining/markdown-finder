const finder = require('../lib')

describe('MarkdownFinder', () => {
  describe('images', () => {
    it('returns an array of images', () => {
      const md = 'This is an image ![img](example.com/image.png) and so is this ![img](example.com/photo.png)'
      const images = finder(md).images()
      expect(Array.isArray(images)).toBe(true)
      expect(images).toMatchSnapshot()
    })

    it('returns false if it does not exist', () => {
      const md = 'No images here'
      expect(finder(md).images()).toEqual([])
    })
  })

  describe('links', () => {
    it('returns an array of links', () => {
      const md = 'This is a link [link](example.com) and so is [this](this.com)'
      expect(finder(md).links()).toMatchSnapshot()
    })

    it('returns an empty array if the markdown does not contain any links', () => {
      const md = 'This is not an link'
      expect(finder(md).links()).toEqual([])
    })

    it('returns an array of links but not images', () => {
      const md = 'This is a link [link](example.com) and this is an image ![this](this.com)'
      expect(finder(md).links().length).toBe(1)
    })
  })

  describe('bolds', () => {
    it('returns an array of bold text', () => {
      const md = '**this is some bold** and so is **this**'
      expect(finder(md).bolds()).toMatchSnapshot()
    })

    it('returns an empty array if the markdown does not contain any bold text', () => {
      const md = 'This is has no bold text'
      expect(finder(md).bolds()).toEqual([])
    })
  })

  describe('italics', () => {
    it('returns an array of italic text', () => {
      const md = '*this is some italic* and so is *this*'
      expect(finder(md).italics()).toMatchSnapshot()
    })

    it('returns an empty array if the markdown does not contain any italic text', () => {
      const md = 'This is has no italic text'
      expect(finder(md).italics()).toEqual([])
    })
  })
})
