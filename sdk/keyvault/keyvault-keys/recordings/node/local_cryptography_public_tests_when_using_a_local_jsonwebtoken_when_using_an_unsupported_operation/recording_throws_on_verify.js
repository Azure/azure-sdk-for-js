let nock = require('nock');

module.exports.hash = "5784f1f5e3ac8860546bc0271048a2fd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create')
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
  'd5976599-a5ef-4ab5-8036-7488b95a4a60',
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
  'Tue, 02 Mar 2021 23:56:37 GMT'
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
  'ec2bc0e7-8cb7-4e1e-b9ec-bea3b5e6b900',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AnGx_VPDN0NCrnC7r0eIv50sYtMRBgAAALHH0NcOAAAA; expires=Thu, 01-Apr-2021 23:56:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 23:56:36 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-beforeeachhook-/bd59df2d425a42bbb358d9285f50e7bc","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"p2PNcpOn0kGopHawE_gZsnRo-frb9Y_Pcfks0-ZDoQ2OhTHOXyXU6FbBVSY78X_gMwz_AmyqE2BwFQbeHpRZEvYQ4gV27v7PeH8fYmIw2S9ghZTzfhKuWHoKPVujr7c722BQjrR08qr3JnYIyR9fiDqWAHwVgeWJ4Zl6qia4XnL_mf6goLme346uhMArt_YwBdzuc1mHviKCm7B9eLDg0gO6yqv5m0AjUxH_W9SjoFETahSBVzQH90luTVx2YoZym7YfAIYITyJtDde8METo_JlUKbW0GrIMUY_-6SeQ6LAU57w1ZtKm1bx3FmTAANfRXKE1CuG2jr6Etg0BTKi6CQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614729397,"updated":1614729397,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '61eaab7c-7286-4f50-882d-3168783ccaec',
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
  'Tue, 02 Mar 2021 23:56:37 GMT',
  'Content-Length',
  '724'
]);
