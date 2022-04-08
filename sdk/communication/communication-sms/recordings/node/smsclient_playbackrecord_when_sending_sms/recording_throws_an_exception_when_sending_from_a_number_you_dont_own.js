let nock = require('nock');

module.exports.hash = "fcd97290e112ccfacfa0fdb8ed965072";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false,"tag":"SMS_LIVE_TEST"}})
  .query(false)
  .reply(401, {"error":{"code":"Unauthorized","message":""}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'MS-CV',
  'r8czj9liUEyWjd52bOX3Jw.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '469ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uS9QYgAAAAD6iQn/IAPhTrJUbW5X0rGyV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:04 GMT'
]);
