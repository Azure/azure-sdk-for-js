let nock = require('nock');

module.exports.hash = "78b4655cee5eceecacb22b27da181d79";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"98b8ae65-ab52-41a7-b0b4-7a752390955a","repeatabilityFirstSent":"Tue, 23 Feb 2021 21:49:29 GMT"},{"to":"+18332321226444","repeatabilityRequestId":"74b369e9-4a7a-4fd2-974e-9c42819187dc","repeatabilityFirstSent":"Tue, 23 Feb 2021 21:49:29 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true},{"to":"+18332321226444","messageId":null,"httpStatusCode":400,"errorMessage":"Invalid To phone number format.","repeatabilityResult":"notavailable","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'hv0qeCU4Gk2QlUkkPIsq4Q.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '1097ms',
  'X-Azure-Ref',
  '0aXg1YAAAAAC4Ze69gJP+RrRYaoEhD/awWVZSMzBFREdFMDMxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 21:49:30 GMT'
]);
