let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A51bab43452ce41ecbf7591071812b514%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'AQtF3mHriEqZ2WaWVMnEvw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '187ms',
  'X-Azure-Ref',
  '0As1GYAAAAADAvUCoh5kRQIFyoDci5h0TV1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:18:57 GMT'
]);
