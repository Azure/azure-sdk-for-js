let nock = require('nock');

module.exports.hash = "6cda6264044544fecd64eeb5a8abc414";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+180055512349","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'tneMGt6WM06QDDWXQQi5Ag.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '0JUw9YAAAAABFIvciMz5ZR4yoP+Qq+2oHWVZSMzBFREdFMDMwNwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 01 Mar 2021 20:18:45 GMT'
]);
