let nock = require('nock');

module.exports.hash = "68d35b535d2b6e35a566474736ffcd0d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_202106162321494d8cb0f3-e8ba-4f0e-aff1-9d23ed607965_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'msYkn/nDk0SRzti3YYFZLg.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '864ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0jYfKYAAAAACPpWOqbTQ2QYoOSJcKT9n4WVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:21:49 GMT'
]);
