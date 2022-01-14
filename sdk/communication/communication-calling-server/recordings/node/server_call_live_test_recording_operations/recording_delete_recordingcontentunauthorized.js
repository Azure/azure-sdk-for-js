let nock = require('nock');

module.exports.hash = "43e6f95a50c4892f451f78041fb226e5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-00000000000000000000000000000000')
  .reply(401, "", [
  'Date',
  'Fri, 14 Jan 2022 12:50:09 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains'
]);
