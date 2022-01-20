let nock = require('nock');

module.exports.hash = "21d1f94fa3a1187aa6d76d2110751a11";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-00000000000000000000000000000000')
  .reply(404, "", [
  'Date',
  'Mon, 17 Jan 2022 09:31:36 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
