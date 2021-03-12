let nock = require('nock');

module.exports.hash = "1ef7a3fbcad2440fbfac59516895b7be";

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
  'qPLGi3uG/kyIMtmm+bceLw.0',
  'X-Processing-Time',
  '13ms',
  'X-Azure-Ref',
  '02sZLYAAAAAB3UorIF6zoR4tBYk6DirfVWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:02 GMT'
]);
