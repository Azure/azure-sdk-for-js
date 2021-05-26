let nock = require('nock');

module.exports.hash = "7465087e95cd3fd96ca28d7c4ccaca4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('M365AADAuthority:443', {"encodedQueryParams":true})
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
  'sanitized',
  'x-ms-ests-server',
  '2.1.11774.11 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AjeJ4_HVdWdPl6pSscEas6VWyo4SBAAAAKi9QNgOAAAA; expires=Fri, 25-Jun-2021 22:07:46 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 22:07:46 GMT',
  'Content-Length',
  '1327'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/teamsUser/:exchangeAccessToken', {"token":"sanitized"})
  .query(true)
  .reply(401, "", [
  'Request-Context',
  'appId=',
  'MS-CV',
  'pWzpnKlr5UWNsXaUbiiaYQ.0',
  'Strict-Transport-Security',
  'max-age=2592000',
  'x-ms-client-request-id',
  'sanitized',
  'X-Processing-Time',
  '4ms',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0ssauYAAAAABAXcCXRIoVSLUfhPPWgT8nV1NURURHRTA4MjEAOWZjN2I1MTktYThjYy00Zjg5LTkzNWUtYzkxNDhhZTA5ZTgx',
  'Date',
  'Wed, 26 May 2021 22:07:46 GMT',
  'Content-Length',
  '0'
]);
