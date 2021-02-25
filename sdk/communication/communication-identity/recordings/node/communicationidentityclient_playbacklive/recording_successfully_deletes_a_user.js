let nock = require('nock');

module.exports.hash = "5f3b4220446ac81ca7796c4e29d977c5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/identities/sanitized')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'h73fh5+28UqyC85kTlvIdA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '434ms',
  'X-Azure-Ref',
  '0S2ksYAAAAABwOd4WWSqFQ5ziy6b+OEQRWVZSMzBFREdFMDMwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 17 Feb 2021 00:54:35 GMT'
]);
