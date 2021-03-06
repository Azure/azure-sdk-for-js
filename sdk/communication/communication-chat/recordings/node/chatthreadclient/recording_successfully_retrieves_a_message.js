let nock = require('nock');

module.exports.hash = "351e07a6e84a7c1868189a472027db0c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/messages/1614993263622')
  .query(true)
  .reply(200, {"id":"1614993263622","type":"text","sequenceId":"4","version":"1614993263622","content":{"message":"content"},"senderDisplayName":"","createdOn":"2021-03-06T01:14:23Z","senderCommunicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'XtUfF3RAiE2Kpeujq6lHJg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '95ms',
  'X-Azure-Ref',
  '0cNdCYAAAAACTQA4w71drRbJsJ5yaMY1NWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:24 GMT'
]);
