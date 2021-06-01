let nock = require('nock');

module.exports.hash = "8126d442c16ed9c8bbf329910b4681d5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fattest.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'cfa3d653-4926-404e-930f-e14032662600',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AiWs8x1H8-VOg1AFk9msOO681LWYBQAAAMOGP9gOAAAA; expires=Fri, 25-Jun-2021 00:01:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 26 May 2021 00:01:16 GMT',
  'Content-Length',
  '1317'
]);

nock('https://aad_attestation_url', {"encodedQueryParams":true})
  .post('/attest/Tpm', {"data":"eyJwYXlsb2FkIjp7InR5cGUiOiJhaWtjZXJ0In19"})
  .query(true)
  .reply(400, {"error":{"code":"Bad request","message":"A VBS attestation policy has not been set on the attestation provider."}}, [
  'Connection',
  'close',
  'Date',
  'Wed, 26 May 2021 00:01:17 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '00-4d2d91754040b0b307015ff9f9dc1d40-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
