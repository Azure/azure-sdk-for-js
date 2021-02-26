let nock = require('nock');

module.exports.hash = "e51bac69f00a983af97a432032dbf341";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .delete('/chat/threads/19%3A5d51112eb39b4a86a6ee971d76891ec5%40thread.v2')
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'wq7ysBF5mk6yYH70wDq5uQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4',
  'X-Processing-Time',
  '259ms',
  'X-Azure-Ref',
  '0LmU5YAAAAACbfucfdA1nR7wnw0QpFLDlWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 21:16:30 GMT'
]);
