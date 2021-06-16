let nock = require('nock');

module.exports.hash = "34dc278878c495ad28a5df7bc5e36281";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(401, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'bSQYGTls8E28LCHhgVz5fA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '420ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kYfKYAAAAAAW4oUE5AQdRoBLIGSQ0afqWVZSMzBFREdFMDQxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:21:53 GMT',
  'Content-Length',
  '0'
]);
