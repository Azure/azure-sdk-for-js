let nock = require('nock');

module.exports.hash = "33d8e6bf8697a18bf09f6892ba52451b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/typing')
  .query(true)
  .reply(200, "", [
  'MS-CV',
  'tJGs1/bLXESdXPNpYnkaLg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '113ms',
  'X-Azure-Ref',
  '0zG8sYAAAAADTF9stohu7Spjb10ifXnuTU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:20 GMT',
  'Content-Length',
  '0'
]);
