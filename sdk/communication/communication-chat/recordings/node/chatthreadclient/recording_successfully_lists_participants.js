let nock = require('nock');

module.exports.hash = "4a2ab59171ab558fb7953081378f2baf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3AxJokSX16Y2F85VvvE_ahCQKJkFIc2Oy4FTcjP9Mjww41%40thread.v2/participants')
  .query(true)
  .reply(200, {"value":[{"communicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2ac3-99c6-593a0d006b77"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-2bfd-99c6-593a0d006b78"}},"shareHistoryTime":"1970-01-01T00:00:00Z"},{"communicationIdentifier":{"rawId":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-352e-99c6-593a0d006b79","communicationUser":{"id":"8:acs:d2a829bc-8523-4404-b727-022345e48ca6_00000008-a4fb-352e-99c6-593a0d006b79"}},"shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'sKR2DeCHKUe1oI1AfZb/bg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-11-01-preview3, 2021-01-27-preview4, 2021-03-01-preview5',
  'X-Processing-Time',
  '101ms',
  'X-Azure-Ref',
  '0cddCYAAAAAAlRFBXFvKjRIayWj5BPcJZWVZSMzBFREdFMDQwOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 06 Mar 2021 01:14:25 GMT'
]);
