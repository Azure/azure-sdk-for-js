let nock = require('nock');

module.exports.hash = "8b6f7978509c8b2271e1593655e1a41d";

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
  '3a7268a2-1cba-40e8-b211-56c132e84894',
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
  'Tue, 02 Mar 2021 23:56:38 GMT'
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
  'd9344de1-369e-47e8-8b2b-26c2edecc300',
  'x-ms-ests-server',
  '2.1.11513.17 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AnGx_VPDN0NCrnC7r0eIv50sYtMRCAAAALHH0NcOAAAA; expires=Thu, 01-Apr-2021 23:56:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 23:56:37 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-beforeeachhook-/3bcec6b7b55c4b9b898e8cd0567e13cb","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"zrriMYdIc3uSMonBcT62foQgIfmRb01dDvY0x9BoY26Z2rz1gQnPef93gmp4mgL_lOc7tldXBVTy3GpRsUtfuHfJCXJxnipf7lTkrRqBpH9YBooNPkMbGzu9N4_sAt2biySj5KZBuGDNPrGSjo5Zaws6DKRbUt49vRW0gcwGPujY8A7gixg-ZIagQsrXNcMdgtO_03en9qOI0OFF7gJ_lwbAxvyDpQu66kqhexR7QYu_bxNlVr2ZfHBkdzHX9Gy-cb8BSmqvgFkXU4SGNVzWGSte1NFFo6mPyTZRRIeR-TadWnH-1dz9IW1HtSHy1L85C_7wPzaVQpCcHOpj4C-K2Q","e":"AQAB"},"attributes":{"enabled":true,"created":1614729398,"updated":1614729398,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '359ce112-c5b8-4c98-ad3b-cd5589351eb3',
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
  'Tue, 02 Mar 2021 23:56:38 GMT',
  'Content-Length',
  '726'
]);
