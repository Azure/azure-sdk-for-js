let nock = require('nock');

module.exports.hash = "a496ce8caf83c86e2258f451b9b697c8";

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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11654.16 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AtukqS9A26NAs3Tev94xdauMQo4QBwAAAOIvENgOAAAA; expires=Thu, 20-May-2021 02:14:00 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 20 Apr 2021 02:13:59 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/identities/sanitized/:issueAccessToken', {"scopes":["chat","voip"]})
  .query(true)
  .reply(401, {"error":{"code":"IdentityNotOwned","message":"Provided identity doesn't belong to the resource."}}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json',
  'Request-Context',
  'appId=',
  'MS-CV',
  'eShTDcc9LkCYsvqQeHha/A.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'api-supported-versions',
  '2020-07-20-preview2, 2021-02-22-preview1, 2021-03-07',
  'X-Processing-Time',
  '10ms',
  'X-Azure-Ref',
  '06Dh+YAAAAAAPcnVR2FKXRovETgaNX2QxWVZSMzBFREdFMDMxMwA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Tue, 20 Apr 2021 02:13:59 GMT'
]);
