let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A7190b8f01425417281a9998f4e6f8899%40thread.v2/messages/1614300005782')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'BIWzQBjJ/k+22//G/qtDUw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '311ms',
  'X-Azure-Ref',
  '0ZkM4YAAAAAB7glg+t/06SbqX+GVgMGFCV1NURURHRTA4MDgAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 26 Feb 2021 00:40:06 GMT'
]);
