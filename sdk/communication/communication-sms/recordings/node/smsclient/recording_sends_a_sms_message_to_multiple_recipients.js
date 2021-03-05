let nock = require('nock');

module.exports.hash = "eb425630f735bbce67615281fa2ca98c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+18005551234567","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"sanitized","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true},{"to":"+18005551234567","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'FoBrpyP0lUqgn5tmqChWjA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '608ms',
  'X-Azure-Ref',
  '0DcU+YAAAAACqqUJJvfyZRpmIG5WY8xmUWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 02 Mar 2021 23:06:54 GMT'
]);
