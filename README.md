# [WIP] markdown-finder

This library can be used to validate markdown against custom functions.

### Very basic example

```js
const finder = require('markdown-finder')

// Does the markdown string have at least one link?
const links = finder(myMarkdown).links()
if (links.length > 0) {
  console.log('I found a link!')
}

// Is there a link to GitHub?
const links = finder(myMarkdown).links(links => links.filter(link => link.url === 'https://github.com'))
if (links.length > 0) {
  console.log('I found a link to GitHub!')
}
```

In this basic example, if you needed to actually get the link itself, you could do:

```js
const finder = require('markdown-finder')

const links = finder(myMarkdown).links()
// links: [{ match, text, url }]
console.log(`I found a link! It goes to ${links[0].url}!`)
```

## API

| Method | Description | Get returns |
| ------ | ----------- | ------- |
| `images` | Returns an array of images | `[{ match, text, url }]` |
| `links` | Returns an array of links | `[{ match, text, url }]` |

### Using callback validators

Each method takes a callback argument. This is where you can run your own validation against whatever was matched. The callback will get an array of objects argument for the matches; the shape of those objects depends on the type of thing being matched. For example, a `link` will look like:

```js
const markdown = 'Check out [my website](https://my-website.com)!'
const links = finder(markdown).links()
// links: [{ match: '[my website](https://my-website.com)', text: 'my website', url: 'https://my-website.com' }]
```
