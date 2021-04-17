let nock = require('nock');

module.exports.hash = "d3c3fece7ed46bd93cf0b9b76cccf9f2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100/capabilities', {"calling":"none","sms":"outbound"})
  .query(true)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  '63aAEHw3eUKJx/Yifbn6fQ.0',
  'api-supported-versions',
  '2021-03-07',
  'X-Processing-Time',
  '386ms',
  'X-Azure-Ref',
  '0vD16YAAAAAB6nhlvt+GDT7wUEfjgbkKIWVZSMzBFREdFMDQxNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Sat, 17 Apr 2021 01:45:32 GMT',
  'Content-Length',
  '0'
]);
