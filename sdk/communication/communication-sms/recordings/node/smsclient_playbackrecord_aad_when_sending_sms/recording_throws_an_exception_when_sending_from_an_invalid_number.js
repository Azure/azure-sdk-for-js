let nock = require('nock');

module.exports.hash = "e40572f5ed6d1f0cd7c4a5809ef38226";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/SomeTenantId/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=SomeClientId&client_secret=SomeClientSecret&scope=https%3A%2F%2Fcommunication.azure.com%2F%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"sanitized"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
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
  '3ff76588-e2fb-49b6-b8e4-3450ae2ac800',
  'x-ms-ests-server',
  '2.1.11622.22 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AsZBMvdV-e5EuFb5Bt9qQ6aMQo4QBgAAAI8-CNgOAAAA; expires=Fri, 14-May-2021 01:38:27 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 14 Apr 2021 01:38:26 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/sms', {"from":"+1425555012345","smsRecipients":[{"to":"+14255550123","repeatabilityRequestId":"sanitized","repeatabilityFirstSent":"Thu, 01 Jan 1970 00:00:00 GMT"}],"message":"test message","smsSendOptions":{"enableDeliveryReport":true,"tag":"SMS_LIVE_TEST"}})
  .query(true)
  .reply(400, {"From":["Invalid From phone number format"]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Request-Context',
  'appId=',
  'MS-CV',
  'CGR5GuOBa0af8TVlDoru+g.0',
  'X-Processing-Time',
  '12ms',
  'X-Azure-Ref',
  '0k0d2YAAAAACT42XVvIzjTKQ6W+yXZgqkWVZSMzBFREdFMDQwNgA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Wed, 14 Apr 2021 01:38:26 GMT'
]);
