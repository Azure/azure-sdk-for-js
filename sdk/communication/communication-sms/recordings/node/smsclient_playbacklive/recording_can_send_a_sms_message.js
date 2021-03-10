let nock = require('nock');

module.exports.hash = "3fafff5ac1537df2532c74861f9f21dd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"sanitized","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CGSgftFBkU+ucxVW9EyyUA.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '978ms',
  'X-Azure-Ref',
  '011hBYAAAAAB3GpbS0XIAQ7OJSKlC6KWyWVZSMzBFREdFMDMxMgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 04 Mar 2021 22:02:00 GMT'
]);
