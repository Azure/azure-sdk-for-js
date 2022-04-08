let nock = require('nock');

module.exports.hash = "ddf1e270fd770f2610ccf69742b2c3d7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":false})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+1425555012345","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(false)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_20220408125105bd3371ca-ff15-4858-89ad-204b1d9f82f5_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":false},{"to":"+1425555012345","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'MS-CV',
  '1pzm+9k42EqOgeDksoOQGg.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '496ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0uC9QYgAAAAAfGVsGj6Z6SpHMAAFUuxD1V1NURURHRTA4MTAAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Fri, 08 Apr 2022 12:51:04 GMT'
]);
