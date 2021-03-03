let nock = require('nock');

module.exports.hash = "25c68781dc5da9115817790a731bd7c9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+18005551234567","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Outgoing_2021030322174089e8cd7c-3fc6-464f-8806-dc3b6646e65c_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true},{"to":"+18005551234567","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'LkJGW4U13k2bUtKR7xZ0AA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '627ms',
  'X-Azure-Ref',
  '0AwtAYAAAAADJNPJq5uTISbBNQJre9VWtWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 03 Mar 2021 22:17:39 GMT'
]);
