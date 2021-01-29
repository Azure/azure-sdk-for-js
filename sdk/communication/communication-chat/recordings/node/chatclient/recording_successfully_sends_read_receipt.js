let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/readreceipts', {"chatMessageId":"1611776447102"})
  .query(true)
  .reply(201, "", [
  'MS-CV',
  '8dUL0FYAg0e/281rhzANqA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '163ms',
  'X-Azure-Ref',
  '0v8ERYAAAAACEDB0ELMb/SIXq9G21mxDiWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT',
  'Content-Length',
  '0'
]);
