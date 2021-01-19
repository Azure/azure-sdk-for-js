let nock = require('nock');

module.exports.hash = "8db0eb71c03703518bd23a9dcba553ae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:revokeAccessTokens')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'BDmqFwnU5UmOAoBsT0LI8A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-03-07',
  'X-Processing-Time',
  '632ms',
  'X-Azure-Ref',
  '0I/0GYAAAAADDnNxkfh1dQaYFa7LciAdqWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 19 Jan 2021 15:39:15 GMT'
]);
