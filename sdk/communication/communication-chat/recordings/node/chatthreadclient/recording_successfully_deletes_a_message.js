let nock = require('nock');

module.exports.hash = "99dab1eee1f2015b9c781625ce8891cd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A7ad51f55bb564644b7b38aa4bd94e338%40thread.v2/messages/1615252741058')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'ipkjZVHnv0q9R/UBm3+gxQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '280ms',
  'X-Azure-Ref',
  '0Bc1GYAAAAABkAYELjDs6TrPsG9fRtA50V1NURURHRTA4MTYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:19:01 GMT'
]);
