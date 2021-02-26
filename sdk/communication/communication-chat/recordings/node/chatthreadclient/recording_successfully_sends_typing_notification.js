let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'jYavx6teoUKBlrL5wJH8Xg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '194ms',
  'X-Azure-Ref',
  '0ZUM4YAAAAAAHA+yXzYVHQbSTNXE5Zy4sV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 26 Feb 2021 00:40:05 GMT',
  'Content-Length',
  '0'
]);
