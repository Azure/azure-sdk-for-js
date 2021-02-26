let nock = require('nock');

module.exports.hash = "21c631066e99f347fa689e7ebd82576d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18331234567","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '4lHXfORRTkuP0ZgpErNHHQ.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '01lo5YAAAAADxUViyy6zsTJKGrSOcj8IRWVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 26 Feb 2021 20:32:21 GMT'
]);
