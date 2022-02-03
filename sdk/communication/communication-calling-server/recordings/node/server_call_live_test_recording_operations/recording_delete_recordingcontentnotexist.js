let nock = require('nock');

module.exports.hash = "915ac519de7d0a33a1248654b08f4d6a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-11111111111111111111111111111')
  .reply(400, "", [
  'Date',
  'Wed, 02 Feb 2022 08:34:15 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'MS-CV',
  '7dL5c3b+tkyH9ePfurPPMA.0',
  'Strict-Transport-Security',
  'max-age=2592000; includeSubDomains'
]);
