let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3ANwlgB-5YRrqAXkbD3xoOMwUpif42PMt4qlUiJALerCM1%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'yl3O1MsxsEO1bXiwD/x1bQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '187ms',
  'X-Azure-Ref',
  '0bddCYAAAAAC/D6wqP2U7R7c7Em02lGARWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:21 GMT'
]);
