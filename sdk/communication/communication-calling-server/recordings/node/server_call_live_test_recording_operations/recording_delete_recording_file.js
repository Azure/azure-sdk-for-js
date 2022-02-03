let nock = require('nock');

module.exports.hash = "18e7cc7a926b562edeafcd8fa34f10f6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/v1/objects/0-wus-d10-00000000000000000000000000000000')
  .reply(200, "", [
  'Date',
  'Wed, 02 Feb 2022 13:03:39 GMT',
  'Server',
  'Kestrel',
  'Content-Length',
  '0',
  'MS-CV',
  'Gsj8j+gYJkiO27Asr0GoOw.0',
  'Strict-Transport-Security',
  'max-age=2592000; includeSubDomains'
]);
