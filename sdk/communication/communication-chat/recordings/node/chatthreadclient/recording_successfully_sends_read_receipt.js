let nock = require('nock');

module.exports.hash = "d4d886db28d5a84c886e4fb6e8961f29";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/readReceipts', {"chatMessageId":"1615253258990"})
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '3mIYIKCYKU6y35UBR1KdsA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '195ms',
  'X-Azure-Ref',
  '0C89GYAAAAAD/OBdrUDnmSa7wDrvyK6M7V1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:39 GMT',
  'Content-Length',
  '0'
]);
