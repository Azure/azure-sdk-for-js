var assert = require('assert');
var voidElements = require('../');
assert(voidElements.indexOf('span') === -1, '<span> is not a void element');
assert(voidElements.indexOf('img') !== -1, '<img> is a void element');
console.log('tests passed');
