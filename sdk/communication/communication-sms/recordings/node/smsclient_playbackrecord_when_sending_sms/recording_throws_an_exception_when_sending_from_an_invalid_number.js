let nock = require('nock');

module.exports.hash = "0f44c45f53b39f5aebfb4c66c70612f4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+1425555012345","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'g/N9vJTle023yb1gvP5WJA.0',
  'X-Processing-Time',
  '19ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0kofKYAAAAADVOnL0rqwUSrOJvAb2oTyPWVZSMzBFREdFMDMxMAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 16 Jun 2021 23:21:53 GMT'
]);
