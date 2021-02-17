let nock = require('nock');

module.exports.hash = "fac03bc2291695d3a2d13747ec814837";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3Ad0faaa3907264686b859c3b0cca68dcb%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-52e0-e3c7-593a0d0002d8","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5349-e3c7-593a0d0002da","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000008-4d76-5eb4-e3c7-593a0d0002dd","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'vmjejPmodUW4ZivtLi8IEA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '73ms',
  'X-Azure-Ref',
  '0zW8sYAAAAABP5eBt1cXkSa1+LkYw3XCoU0pDRURHRTA1MTIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 17 Feb 2021 01:22:21 GMT'
]);
