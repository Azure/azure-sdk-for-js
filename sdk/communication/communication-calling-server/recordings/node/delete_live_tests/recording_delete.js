let nock = require('nock');

module.exports.hash = "2dcd167c5ea8a47267ececbcead4c08b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d8-9c3c0c769f74d4bb8f8c6af86257dec2')
  .reply(200, "", [
  'Date',
  'Wed, 02 Feb 2022 14:02:00 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'MS-CV',
  'ecVp5qiWIkiot+j505D5yg.0',
  'Strict-Transport-Security',
  'max-age=2592000; includeSubDomains'
]);
