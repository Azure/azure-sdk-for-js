let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3Aq3wKFPlzMawkNc6oMnE775ANXd463AmgdzUQmk4RnXA1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'gQxmQtajTk2wGS3d7v6ZSg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5, 2021-03-07',
  'X-Processing-Time',
  '128ms',
  'X-Azure-Ref',
  '00T5aYAAAAADwYps0yvfjTr79+Elun1ZLV1NURURHRTA4MjIAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 23 Mar 2021 19:17:37 GMT'
]);
