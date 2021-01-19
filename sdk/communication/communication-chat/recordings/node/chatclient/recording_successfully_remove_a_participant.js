let nock = require('nock');

module.exports.hash = "10e23f822ab435387529ce641b780900";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/participants/8%3Aacs%3A8d0de54a-ca74-4b37-89ea-75a8ab565166_00000007-9960-74aa-1000-343a0d0023c1')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'hVgF/ll+vE67EZI67TURLQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3',
  'X-Processing-Time',
  '148ms',
  'X-Azure-Ref',
  '0ulX+XwAAAAAYpn+J7nXmSppi8oJKlvZsV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:50 GMT'
]);
