let nock = require('nock');

module.exports.hash = "4c98a9f5ec62a0dd8db7cf60afdac286";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2')
  .query(true)
  .reply(200, {"id":"19:14724b43dee94c22a938d44457110b8a@thread.v2","topic":"test topic","createdOn":"2021-01-25T20:26:30Z","createdBy":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0","members":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'r9c1nQHX/0WVzbDt8XemBw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2, 2020-11-01-preview3',
  'X-Processing-Time',
  '75ms',
  'X-Azure-Ref',
  '0dykPYAAAAACVcVj4PswvT4lS0OlKZDQFWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:31 GMT'
]);
