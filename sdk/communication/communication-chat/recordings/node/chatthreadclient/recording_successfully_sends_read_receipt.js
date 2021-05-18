let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A-SU2gzDrzE720bWocJYfAkee6As1QmtdJW3bcNJWyEw1%40thread.v2/readReceipts', {"chatMessageId":"1620757462303"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'LybLfplat0C/y/m+9mD9Hw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '582ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '018uaYAAAAADZ1a65U1XgS7/c0f7waRzwV1NURURHRTA4MTkANzA1NDM5NWUtY2UxZC00NTVlLWFlNWQtMjMzY2E4MzkwNTU0',
  'Date',
  'Tue, 11 May 2021 18:24:23 GMT',
  'Content-Length',
  '0'
]);
