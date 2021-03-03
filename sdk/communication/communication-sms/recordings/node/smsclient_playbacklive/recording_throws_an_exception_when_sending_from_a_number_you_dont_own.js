let nock = require('nock');

module.exports.hash = "036dbd7fc51d7796489fcae997673618";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+15552143356","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'LAe6VHLNXU2zg7v8VTOH6g.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '0BAtAYAAAAABAIBu3rcbcSZ8mk9itQ/huWVZSMzBFREdFMDMxOQA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 03 Mar 2021 22:17:39 GMT'
]);
