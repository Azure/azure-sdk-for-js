let nock = require('nock');

module.exports.hash = "dbe5b264c11dbef1d4f15779defd44e9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'x4eQcWq4G0WDIPsdXlhPuA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '218ms',
  'X-Azure-Ref',
  '01LmAYAAAAAAaBss5XA7gQYbV4VcgK/3IV1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:36 GMT',
  'Content-Length',
  '0'
]);
