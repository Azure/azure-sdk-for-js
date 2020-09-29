let nock = require('nock');

module.exports.hash = "25b03c3f9a319034849992383086fb91";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/members')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6169-1000-343a0d00002e","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-62cc-6a0b-343a0d00003b","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000005-2f36-6ea0-6a0b-343a0d00003c","shareHistoryTime":"2020-09-15T01:15:33Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'eAIcSUyb/Eq+l44y79/wsg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '69ms',
  'X-Azure-Ref',
  '0tRVgXwAAAAAbqHdNstfSTY9AphrVC6woV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:33 GMT'
]);
