let nock = require('nock');

<<<<<<< HEAD:sdk/communication/communication-sms/recordings/node/smsclient_playbacklive/recording_can_send_a_sms_message_to_multiple_recipients.js
module.exports.hash = "218f3be229db528f353f790cc2eeeb0d";
=======
module.exports.hash = "d46cf12f17627d5319f11ba44edc3d4b";
>>>>>>> a2683af96 (update recordings):sdk/communication/communication-sms/recordings/node/smsclient_playbacklive/recording_can_send_an_sms_message_to_multiple_recipients.js

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+1425555012345","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"sanitized","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true},{"to":"+1425555012345","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  '2Py3Qdv3L0iC1codIBFwUw.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '431ms',
  'X-Azure-Ref',
  '02cZLYAAAAAAT2ZRdWmYvSZDumTkdE6IuWVZSMzBFREdFMDMxNAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Fri, 12 Mar 2021 19:54:02 GMT'
]);
