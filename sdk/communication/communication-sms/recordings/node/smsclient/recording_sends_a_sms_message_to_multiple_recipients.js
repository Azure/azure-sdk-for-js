let nock = require('nock');

module.exports.hash = "5bccc5c5e5655dcd84557c2b782467d8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"fa34513a-29da-4360-90a5-0ce3d6810e52","repeatabilityFirstSent":"Wed, 24 Feb 2021 19:50:48 GMT"},{"to":"+18332321226444","repeatabilityRequestId":"2fda8a8b-e129-4612-86d3-a31257eb5263","repeatabilityFirstSent":"Wed, 24 Feb 2021 19:50:48 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true},{"to":"+18332321226444","messageId":null,"httpStatusCode":400,"errorMessage":"Invalid To phone number format.","repeatabilityResult":"notavailable","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'LaZHORE/vkKU5hI6kU+LJA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '768ms',
  'X-Azure-Ref',
  '0GK42YAAAAACn0afZq3gnS7/+7a1LH1s7WVZSMzBFREdFMDQxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 24 Feb 2021 19:50:49 GMT'
]);
