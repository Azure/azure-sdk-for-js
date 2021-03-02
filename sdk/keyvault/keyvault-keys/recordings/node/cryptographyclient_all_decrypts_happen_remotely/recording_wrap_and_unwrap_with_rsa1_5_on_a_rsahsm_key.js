let nock = require('nock');

module.exports.hash = "be4546abb4d1bb15d2a5ac86e665e2d1";

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
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  '4e4942fd-98f9-4e4d-96e6-dbb0c64cffb7',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:22:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '524a429b-9f95-4936-92e3-8f07ae19b600',
  'x-ms-ests-server',
  '2.1.11513.17 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRCwAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:22:17 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:22:17 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/2a329607cedd4232930628d49a8208b2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"7xUQIfS1nAu3_vycjiD9XEVTtP5h77sPE15z8h8JUmJdHFpUR6WdBLOOgZojv9VMJNIaH0Ua91-sTIGeIf_nPZVjwUvupiE4zk4YippaNO92__s7h_ilsFP3QFQcFz7Th8B-LQmR2PsnzQ9NYbgMK_H4La39-uPX6aauZ0D13PvNiBuZzz25tbT95EeKf9GemAGVmPUqHnbHaCbBAzGJqqNU4KfpgFM1tdLzHkBMJegE8Iya_EIqhV9_lcTrypPLPMo6V_TiG9FSHVZw2T6nBTiQvQAyTg-DMAqnsRHQFi9SBXhRr_bBvnj5VApAxsyOSccgaEQN8FBcSGDeE3kTjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723737,"updated":1614723737,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'westus2',
  'x-ms-request-id',
  'a56ddb2e-a4fa-4974-8973-bdd0a88df7e6',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=72.68.182.20;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 02 Mar 2021 22:22:17 GMT',
  'Content-Length',
  '716'
]);
