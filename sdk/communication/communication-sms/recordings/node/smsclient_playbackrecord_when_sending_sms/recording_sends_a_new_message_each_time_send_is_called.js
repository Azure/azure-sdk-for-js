let nock = require('nock');

module.exports.hash = "9a17617be8b47b129ee4b7eda55945c8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false,"tag":"SMS_LIVE_TEST"}})
  .query(false)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_20220408125103677036d2-c2c1-49e6-84e2-d701e17ffa64_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'CqFLy9PB60uxYqcXOf0wgQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '516ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ty9QYgAAAABrt1fqTozNSaWdlUbC6oWJV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:03 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false,"tag":"SMS_LIVE_TEST"}})
  .query(false)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_202204081251045a6dbc77-463c-4ab1-ba7a-6042562fcb3f_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'l0h5QLBDx0+ulECfRMChFg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '540ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uC9QYgAAAADv8CjTw4qXQIqtP1VoVB9FV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:03 GMT'
]);
