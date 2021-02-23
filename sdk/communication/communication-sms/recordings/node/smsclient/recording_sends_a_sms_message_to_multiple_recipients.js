let nock = require('nock');

module.exports.hash = "78b4655cee5eceecacb22b27da181d79";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+18005551234","smsRecipients":[{"to":"+18005551234","repeatabilityRequestId":"28410933-2c4f-492a-a8da-273e665a4af7","repeatabilityFirstSent":"Tue, 23 Feb 2021 19:43:04 GMT"},{"to":"+18332321226444","repeatabilityRequestId":"33f35723-c396-4d39-ac12-64b1d2ee35c6","repeatabilityFirstSent":"Tue, 23 Feb 2021 19:43:04 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(202, {"value":[{"to":"+18005551234","messageId":"Sanitized","httpStatusCode":202,"errorMessage":null,"repeatabilityResult":"accepted","successful":true},{"to":"+18332321226444","messageId":null,"httpStatusCode":400,"errorMessage":"Invalid To phone number format.","repeatabilityResult":"notavailable","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'Zgy/EKBbw0GsHq1unnROVQ.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '742ms',
  'X-Azure-Ref',
  '0yFo1YAAAAACpkduyo1YYQLt0ObCyIMZiWVZSMzBFREdFMDQwOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 23 Feb 2021 19:43:05 GMT'
]);
