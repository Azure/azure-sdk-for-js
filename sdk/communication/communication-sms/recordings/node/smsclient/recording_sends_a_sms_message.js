let nock = require('nock');

module.exports.hash = "e9ca3e20f65ddb447cc01a00b7a442a1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","to":["+18005551234"],"message":"test message","sendSmsOptions":{}})
  .query(true)
  .reply(200, {"messageId":"Sanitized"}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2B9ZCFn6/kORNE4MbNBudg.0',
  'X-Processing-Time',
  '291ms',
  'X-Azure-Ref',
  '0+cgFYAAAAADaKpbFTwNsQ5cLYh0vWoKJRVdSMzBFREdFMDYxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 18 Jan 2021 17:44:25 GMT'
]);
