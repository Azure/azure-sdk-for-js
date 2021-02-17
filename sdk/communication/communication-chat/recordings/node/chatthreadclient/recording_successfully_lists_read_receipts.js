let nock = require('nock');

module.exports.hash = "68f698ad1cd68fb5d2031b79d0a1fd0f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/readReceipts')
  .query(true)
  .reply(200, {"value":[{"senderId":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8","chatMessageId":"1613524939985","readOn":"2021-02-17T01:22:20Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'T2NUGQBAM0i9aBJpfK3z+g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '366ms',
  'X-Azure-Ref',
  '0zm8sYAAAAAAmPSL9AMXFRZQLEjDxJXF6U0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:22 GMT'
]);
