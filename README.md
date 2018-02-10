# [WIP] markdown-finder

This library can be used to validate markdown against custom functions.

### Very basic example

```js
const finder = require('markdown-finder')

// Does the markdown string have at least one link?
if (finder(myMarkdown).has.link()) {
  console.log('I found a link!')
}

// Is there a link to GitHub?
if (finder(myMarkdown).has.link(link => link.includes('github.com'))) {
  console.log('I found a link to GitHub!')
}
```

In this basic example, if you needed to actually get the link itself, you could do:

```js
const finder = require('markdown-finder')

// Does the markdown string have at least one link?
const link = finder(myMarkdown).get.link()
// { match, text, url }
console.log(`I found a link! It goes to ${link.url}!`)
```

## API

There are two tracks: `finder().has` and `finder().get`. The former will always return a boolean, and the latter will always return the matched string(s) if they exist (or null if they do not). The two have the same methods, so there is only one set of methods.

| Method | Description | Get returns |
| ------ | ----------- | ------- |
| `image` | Matches markdown images | `{ match, text, url }`
| `link` | Matches markdown links. **Note**: it will not match images. | `{ match, text, url }` |
| `images` | Returns an array of images | `[{ match, text, url }]` |
| `links` | Returns an array of links | `[{ match, text, url }]` |

### Using callback validators

Each method takes a callback argument. This is where you can run your own validation against whatever was matched. The callback will get a RegEx match argument, whose shape depends on type of thing being matched. For example, a `link` will look like:

```js
const markdown = 'Check out [my website](https://my-website.com)!'
const link = finder(markdown)
// link: { match: '[my website](https://my-website.com)', text: 'my website', url: 'https://my-website.com' }
```
