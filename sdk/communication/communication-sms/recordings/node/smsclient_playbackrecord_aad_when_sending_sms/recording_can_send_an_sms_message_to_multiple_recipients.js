let nock = require('nock');

module.exports.hash = "c9d3b30b09556d605a1814b7cc66c2ba";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"sanitized"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1327',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '0a4a2a1f-bded-4014-be5e-01695eb4c700',
  'x-ms-ests-server',
  '2.1.11622.22 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AsZBMvdV-e5EuFb5Bt9qQ6aMQo4QBAAAAI8-CNgOAAAA; expires=Fri, 14-May-2021 01:38:25 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 14 Apr 2021 01:38:25 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+14255550123","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"},{"to":"+1425555012345","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":false}})
  .query(true)
  .reply(202, {"value":[{"to":"+14255550123","messageId":"Outgoing_202104140138264ce29e59-5c41-41e1-aede-98385ed1f10b_noam","httpStatusCode":202,"repeatabilityResult":"accepted","successful":true},{"to":"+1425555012345","httpStatusCode":400,"errorMessage":"Invalid To phone number format.","successful":false}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'WPng/2mIn0WG/LJ17Fd20g.0',
  'api-supported-versions',
  '2020-07-20-preview1, 2020-08-20-preview, 2021-03-07',
  'X-Processing-Time',
  '420ms',
  'X-Azure-Ref',
  '0kkd2YAAAAABR6V0yVBFYS6KwN4O1sefkWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 14 Apr 2021 01:38:25 GMT'
]);
