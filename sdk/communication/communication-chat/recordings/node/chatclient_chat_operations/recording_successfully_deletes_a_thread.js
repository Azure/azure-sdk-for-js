let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A45c2a818b4fe40cb8e8631592a49cad0%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  '+xHVk23mPEmrWfnkudIbVw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '192ms',
  'X-Azure-Ref',
  '0B89GYAAAAAA8xywuxgISTLZ5tBTVuJ9xV1NURURHRTA4MjAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 09 Mar 2021 01:27:35 GMT'
]);
