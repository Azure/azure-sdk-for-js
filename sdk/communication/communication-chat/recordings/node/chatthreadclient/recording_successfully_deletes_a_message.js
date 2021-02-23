let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/messages/1613524939985')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '812P/O2lg0iotkRruW1mnA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '390ms',
  'X-Azure-Ref',
  '0zW8sYAAAAACutNRz6WspRYIF5nGCC7b+U0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:21 GMT'
]);
