let nock = require('nock');

module.exports.hash = "440d30ea80ae00bd4f9657be7d16ccbc";

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
  'ec58e243-8e3e-4d60-ba01-6b06d9c72100',
  'x-ms-ests-server',
  '2.1.11774.11 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AjT_ZlrmusVHpouhTNAYs-O81LWYBQAAAIt2P9gOAAAA; expires=Thu, 24-Jun-2021 22:52:05 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 25 May 2021 22:52:04 GMT',
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
  'Tue, 25 May 2021 22:52:05 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '00-13da6a94677311118632a3252e3c66ab-0000000000000000-00',
  'x-ms-maa-service-version',
  '1.10.01598.0001'
]);
