let nock = require('nock');

module.exports.hash = "f90471839435538701fd9d22e4dda831";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
  .query(true)
  .reply(401, {"error":{"code":"Unauthorized","message":"Request is missing a Bearer or PoP token."}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '87',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'acfa00a9-1e2a-49d2-bf9c-e155a569dae3',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 01:14:16 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  '150e1025-d04b-4c4f-96a7-568d7a3c7f00',
  'x-ms-ests-server',
  '2.1.10433.14 - WUS2 ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Arm_b_E_t1VErphejlVuN2k_aSJHAQAAAGh6OdYOAAAA; expires=Thu, 28-May-2020 01:14:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 28 Apr 2020 01:14:16 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/683327906fe94cebbf456416bad182a6","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xKRRE0P98ggy8J2ns4MxeJfjo7BKrQiGKldpQPhsKMxx5DWOgIkQ-1exKWgjptqcBTs5lbmwhFewtAGeVbj6Ilcj34AS3v5Kzaa6sVhSqCa8MizWK_UM9vxSPc42rFdf1YAlwVLW9JbH__EUrmaS-hxQGoZ05IT-Y3dyzV71pEL3l5fpNOcgzdX9h8mEepA84gN02SbMu7FCog8AeDWm2X0SKuSznlXvJbGCiMd3Cbvb9UbnNNh8Hrn1YlLRtVRNzLWx8NhYyQyuH3QA14Zg3ovEGTSrXfyB9y3cP_nuhWBhzCzNF0xiRDVtTvQ2aElfRVLOJBQD3ERU2fdOW1KKTQ","e":"AQAB"},"attributes":{"enabled":true,"created":1588036457,"updated":1588036457,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'b38496a1-17b9-404f-becc-1e9541ffdce5',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 01:14:16 GMT',
  'Content-Length',
  '714'
]);
