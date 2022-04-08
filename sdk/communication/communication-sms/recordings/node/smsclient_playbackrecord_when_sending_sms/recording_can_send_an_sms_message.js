let nock = require('nock');

module.exports.hash = "83d058dc072c9d4f54912651d15b4836";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(false)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_20220408125102f1a233ab-ccc6-4dd9-9b45-c40699f77526_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'UatUYe+iRE+mMA26nTtEAQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '703ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ti9QYgAAAACEkyZs0E5hRoYslXqtv16EV1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:02 GMT'
]);
