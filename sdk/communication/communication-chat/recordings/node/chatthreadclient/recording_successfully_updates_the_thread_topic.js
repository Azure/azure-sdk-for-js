let nock = require('nock');

module.exports.hash = "b2e3c085aa73b0d20ac7b91f39172d2b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2', {"topic":"new topic"})
  .query(true)
  .reply(204, "", [
  'MS-CV',
  'wi56jyfCiEWuDx0hhUibkw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '239ms',
  'X-Azure-Ref',
  '0b9dCYAAAAADBKBDLQDuTRJeuqGLkqyAjWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:23 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:xJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41@thread.v2","topic":"new topic","createdOn":"2021-03-06T01:14:22Z","createdByCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'ZtbJ0UTXVEyC65JZpyF/kQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '91ms',
  'X-Azure-Ref',
  '0b9dCYAAAAAAYdlA3SdMySKg9/SxcQ+rKWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:23 GMT'
]);
