let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/readReceipts', {"chatMessageId":"1614374194140"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'EnpZmf6akEGOqW33gkaiBA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '181ms',
  'X-Azure-Ref',
  '0MmU5YAAAAAC4nDFXEA/DQ49tmGogBW2WWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:34 GMT',
  'Content-Length',
  '0'
]);
