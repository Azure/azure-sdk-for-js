let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Aa57caa80215748b484a26279925e5a92%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'tIUbmOI7P0GO6mjEC7Y9qw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '114ms',
  'X-Azure-Ref',
  '0v8ERYAAAAACGDbLrYCMXRav8254/mb8wWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 27 Jan 2021 19:40:47 GMT',
  'Content-Length',
  '0'
]);
