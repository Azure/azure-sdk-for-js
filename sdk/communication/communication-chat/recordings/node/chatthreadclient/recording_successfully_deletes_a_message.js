let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A539d1d3fbe9f4cf3a352a34888944794%40thread.v2/messages/1615234854931')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'x+NFVuz7yEWx3Qraa4UGBQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '262ms',
  'X-Azure-Ref',
  '0KIdGYAAAAACmuUIOzWzESq+Q9N0o5dz8V1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Mon, 08 Mar 2021 20:20:56 GMT'
]);
