let nock = require('nock');

module.exports.hash = "1b4d74b8fdcbd80f10e063f085f851c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AgvPepH6z0bOj4oLiJq-gvbngWVzPjckTqelwtURS5gY1%40thread.v2/readReceipts', {"chatMessageId":"1643741855269"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'jXGyhO0SI0m/UWqJapUS1w.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2021-03-07, 2021-04-05-preview6, 2021-09-07, 2021-10-01-preview7',
  'X-Processing-Time',
  '219ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0n4L5YQAAAAAlgpnoE6tJS5nQg2Y4cno2UERYMzFFREdFMDIxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 01 Feb 2022 18:57:35 GMT',
  'Content-Length',
  '0'
]);
