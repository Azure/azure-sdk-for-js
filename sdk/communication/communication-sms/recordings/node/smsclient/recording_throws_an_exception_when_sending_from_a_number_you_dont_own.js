let nock = require('nock');

module.exports.hash = "69daddbeee9ad5816537f013fb3696fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18332143356","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(401, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'n7Abnl/k6kmDepSpcEJKpg.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '428ms',
  'X-Azure-Ref',
  '0lE09YAAAAAD3ztPDC5qbS5ILih2kSpf+WVZSMzBFREdFMDMwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Mon, 01 Mar 2021 20:24:52 GMT',
  'Content-Length',
  '0'
]);
