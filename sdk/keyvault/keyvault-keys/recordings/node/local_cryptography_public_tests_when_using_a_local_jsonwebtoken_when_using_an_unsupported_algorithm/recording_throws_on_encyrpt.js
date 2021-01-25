let nock = require('nock');

module.exports.hash = "f40cf164c9069fccaf85b1f93d8ca23a";

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
  '44d56923-6c43-48c6-99ca-f87ab3d5dcc9',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:12 GMT'
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
  '361252c4-1f57-4416-9f00-1f6bfbcf1700',
  'x-ms-ests-server',
  '2.1.11419.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am26iPGssf9Pl7gwXMSdRFCsQTTcEwAAAIEYoNcOAAAA; expires=Wed, 24-Feb-2021 01:41:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 01:41:12 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-/eb565c2c56ff4226b7939c613b8fefe1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"xxgWUdH4MxqlwqbHt4rOTIqxDLXTDOE4XrFUnAdBUbwS-NrteEP3obdLYoWUzQWgaMfxHGbwcnOgWs_jqLrTR-ChnZWYPJRJwBcS4oRPqM448_F3xRt-mCIdRQNpqmXyF-2ah-OkFJhLYOr08mU9kBFGIqDAm7I_vvFLTwGVP4MwSm2tLkAuURT_gBUlmAQrSDJRVMW7Z_u8DHhxQHn3XdkZVm3glcbNPFbyL0kqCMyMYgdN7Hy4dUwh7fv3otSNmdtuaS8e9avNDr0TSCWEqlRuOj-JcA9IAARt2gSpm6ocsIqUI1i59F5Akq1mNWhoVSo36mdIOpn-BXIlC78ZmQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611538873,"updated":1611538873,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'f5954930-0087-446d-bddd-b2eb7087ee4e',
  'x-ms-keyvault-service-version',
  '1.2.139.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 25 Jan 2021 01:41:12 GMT',
  'Content-Length',
  '724'
]);
