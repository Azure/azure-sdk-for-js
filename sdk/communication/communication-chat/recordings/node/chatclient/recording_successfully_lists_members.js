let nock = require('nock');

module.exports.hash = "22d750de7546d2dcc5887deec259aedb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/chat/threads/19%3A14724b43dee94c22a938d44457110b8a%40thread.v2/members')
  .query(true)
  .reply(200, {"value":[{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-9433-6032-3b3a0d0048e0","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-99e7-6032-3b3a0d0048e1","shareHistoryTime":"1970-01-01T00:00:00Z"},{"id":"8:acs:ec403bbc-89a0-4037-a140-7ed471abd0e5_00000007-db1b-b5ce-6032-3b3a0d0048e4","shareHistoryTime":"1970-01-01T00:00:00Z"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '27Y17ctXIUS+2W+plZXp+Q.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-09-21-preview2',
  'X-Processing-Time',
  '69ms',
  'X-Azure-Ref',
  '0fikPYAAAAAB9qjtp/V9TRZHpvPwdewPfWVZSMzBFREdFMDQxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 25 Jan 2021 20:26:38 GMT'
]);
