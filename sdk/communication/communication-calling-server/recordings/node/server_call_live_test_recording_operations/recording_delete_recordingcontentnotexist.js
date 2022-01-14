let nock = require('nock');

module.exports.hash = "8dbf2301607cb9731e5f29e8f862beec";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-00000000000000000000000000000000')
  .reply(404, "", [
  'Date',
  'Fri, 14 Jan 2022 12:50:09 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
