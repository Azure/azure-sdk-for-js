let nock = require('nock');

module.exports.hash = "c9d3b30b09556d605a1814b7cc66c2ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+1425555012345","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_202104130221277bd6cefb-8dba-481f-8574-9fa13560adf4_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true},{"to":"+1425555012345","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'SSarwo8jCEaUWlpwXf3WOw.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '639ms',
  'X-Azure-Ref',
  '0JgB1YAAAAACJfcl8joi7R6CU7GDr6jQrWVZSMzBFREdFMDQxMQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 13 Apr 2021 02:21:27 GMT'
]);
