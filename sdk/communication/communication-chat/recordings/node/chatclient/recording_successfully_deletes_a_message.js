let nock = require('nock');

module.exports.hash = "6f90ac401c7903dfc7bd077bcdb108f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A883ce5bf892c47d6a7da73da6df31c7e%40thread.v2/messages/1610503608398')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'aWcpud2WmUS33RkLY1DxCg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '112ms',
  'X-Azure-Ref',
  '0uVX+XwAAAAAxiq9/T5ZISJPMVyrzd5YwV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 13 Jan 2021 02:06:49 GMT'
]);
