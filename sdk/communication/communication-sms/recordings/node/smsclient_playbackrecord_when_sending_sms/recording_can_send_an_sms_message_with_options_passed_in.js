let nock = require('nock');

module.exports.hash = "94a53f2b724b1d07990177d0612de57d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false,"tag":"SMS_LIVE_TEST"}})
  .query(false)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_20220408125103487140b9-7af5-4ad8-b3c4-1d0a8a01c829_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  'dNrjuXfCSEe9BlDX4plKYg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '511ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ti9QYgAAAACQRYgMWK9wQoo/bKPYolR/V1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:02 GMT'
]);
