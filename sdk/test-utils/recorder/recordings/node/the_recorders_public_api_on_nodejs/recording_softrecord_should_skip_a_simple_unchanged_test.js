let nock = require('nock');

module.exports.hash = "11e537d0ca3f2ede6f3847dcbce1df9c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('http://127.0.0.1:1337', {"encodedQueryParams":true})
  .get('/')
  .reply(200, "Hello World!", [
  'Date',
  'DATE',
  'Connection',
  'close',
  'Transfer-Encoding',
  'chunked'
]);
