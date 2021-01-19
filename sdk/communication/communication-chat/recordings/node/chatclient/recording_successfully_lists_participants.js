let nock = require('nock');

module.exports.hash = "b56d623d661b55248a369b405cdd5d00";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-7290-0e04-343a0d0011fe","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-8307-0e04-343a0d001200","shareHistoryTime":"2020-05-26T18:06:06Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'JVw68mNIgUeFbwiyWAl27g.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '84ms',
  'X-Azure-Ref',
  '0ulX+XwAAAAB0IVbim84FS446Ako5oHWxV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:50 GMT'
]);
