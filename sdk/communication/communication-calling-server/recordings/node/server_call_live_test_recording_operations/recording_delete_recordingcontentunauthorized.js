let nock = require('nock');

module.exports.hash = "94b3ecfdd2bf33aea78ac6e44b87df9a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-00000000000000000000000000000000')
  .reply(401, "", [
  'Date',
  'Wed, 02 Feb 2022 08:36:13 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'MS-CV',
  '1SkumYtcU0SaE7XO+e18Vg.0',
  'Strict-Transport-Security',
  'max-age=2592000; includeSubDomains'
]);
