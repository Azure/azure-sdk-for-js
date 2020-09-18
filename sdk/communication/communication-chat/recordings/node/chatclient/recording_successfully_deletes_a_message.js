let nock = require('nock');

module.exports.hash = "6f90ac401c7903dfc7bd077bcdb108f1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A069d3bbafc4840df836c5fe8e232a17f%40thread.v2/messages/1600132531629')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'jbMnCUR1eUOSc8J8O7Sm4A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-09-21-preview2',
  'X-Processing-Time',
  '167ms',
  'X-Azure-Ref',
  '0tBVgXwAAAAAMj4vuKXxzQ6zbG44cHE0gV1NURURHRTA4MDcAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Tue, 15 Sep 2020 01:15:32 GMT'
]);
