/**
 * Replaces strings in Regular Expressions with nested expressions.
 * Used for writing clearer, more transparent expressions. Taken from:
 * https://github.com/chjj/marked/blob/d96db058e1b0cb013a53aeeeb6b3f6b219dc1b64/lib/marked.js#L1172-L1182
 *
 * @param {RegExp} regex
 * @param {string} opt
 * @returns {RegExp}
 */
module.exports = function ({ source: regex }, opt = '') {
  return function self (name, val) {
    if (!name) return new RegExp(regex, opt)
    val = val.source || val
    val = val.replace(/(^|[^[])\^/g, '$1')
    regex = regex.replace(name, val)
    return self
  }
}
