let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3A95b53ec9905344ae89865d3a90726fb0%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  '7XfW2Ygvh02vPfTbZR2yUw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '151ms',
  'X-Azure-Ref',
  '0C89GYAAAAACrSDwZpLgZQrqJF8uaS5kXV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:39 GMT',
  'Content-Length',
  '0'
]);
