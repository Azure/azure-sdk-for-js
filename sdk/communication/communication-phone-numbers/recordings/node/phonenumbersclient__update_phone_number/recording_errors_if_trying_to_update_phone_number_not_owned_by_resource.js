let nock = require('nock');

module.exports.hash = "7d4697b3ca2f27301e8fd98e8e13ad06";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .patch('/phoneNumbers/%2B14155550100', {"callbackUri":"https://endpoint"})
  .query(true)
  .reply(404, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  '3IwGeVP+jE6RPuNy/gjKjQ.0',
  'X-Processing-Time',
  '409ms',
  'X-Azure-Ref',
  '0LP4aYAAAAAAeWjjX1pjXSb4x1BK5d3sdWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 03 Feb 2021 19:49:00 GMT',
  'Content-Length',
  '0'
]);
