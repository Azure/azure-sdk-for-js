let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A78448d7234104d49a790bd99614da6e6%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'iZx20QsAA0S6Xxaa3AsWKQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '203ms',
  'X-Azure-Ref',
  '0MmU5YAAAAADO4D4zh+3QS5JEXlJNhBiKWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:33 GMT',
  'Content-Length',
  '0'
]);
