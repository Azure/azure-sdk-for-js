let nock = require('nock');

module.exports.hash = "025a6529e78fc34152b097fad8ae5137";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+1425555012345","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false,"tag":"SMS_LIVE_TEST"}})
  .query(false)
  .reply(400, {"From":["Invalid from phone number format."]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dd4B/XBNPU2mvdI9pyH8Ww.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'X-Processing-Time',
  '16ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uS9QYgAAAADQf0KcXfq3To8tfZbQUxlnV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:04 GMT'
]);
