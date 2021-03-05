let nock = require('nock');

module.exports.hash = "cf8b468d221de05cd3880e4f48eec43c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A-uGMBR3Jd8mEbYt9auigWiLSJvDfDaMIaHHX8PKxPyg1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ddzUh/+hbEyr0kK8rqJqHA.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '168ms',
  'X-Azure-Ref',
  '0RqlCYAAAAABRVffKOtBSRrp4xcHaDcEVV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 05 Mar 2021 21:57:26 GMT'
]);
