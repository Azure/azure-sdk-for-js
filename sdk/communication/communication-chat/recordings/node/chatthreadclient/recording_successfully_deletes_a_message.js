let nock = require('nock');

module.exports.hash = "6f90ac401c7903dfc7bd077bcdb108f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3AScCnaKuTp6GyZdIAuuv9RAobRLrkYvNn6kdQMJUJVaY1%40thread.v2/messages/1619048916697')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'dQZzZJDbd0CvbLmlXskUUg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07, 2021-04-05-preview6',
  'X-Processing-Time',
  '341ms',
  'X-Azure-Ref',
  '01rmAYAAAAAAigQQ0EHg3QqCC45mJxxg0V1NURURHRTA4MDYAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 21 Apr 2021 23:48:37 GMT'
]);
