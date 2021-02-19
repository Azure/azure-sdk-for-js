let nock = require('nock');

module.exports.hash = "c904ddd7b634e135c67b04459bb11dd8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"294f45a5-3db2-4f95-a071-e235983d1c0e","repeatabilityFirstSent":"Fri, 19 Feb 2021 03:13:47 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'dRKdm5XcvkuhxpIaNfCwVA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '398ms',
  'X-Azure-Ref',
  '06ywvYAAAAAAzpiT7j2CZQalnxTR0saPcWVZSMzBFREdFMDQxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 19 Feb 2021 03:13:47 GMT'
]);
