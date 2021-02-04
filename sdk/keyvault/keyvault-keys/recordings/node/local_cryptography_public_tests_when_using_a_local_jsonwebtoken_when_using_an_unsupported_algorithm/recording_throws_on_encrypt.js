let nock = require('nock');

module.exports.hash = "8f6b99a34c18eb08370617c36f27d70b";

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
  'c5e6a175-3911-4df8-96e1-0855ad393800',
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
  'Tue, 26 Jan 2021 21:18:19 GMT'
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
  '5a8ac577-7fe0-438b-bb1e-722394980800',
  'x-ms-ests-server',
  '2.1.11444.8 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Aoug80040iJPm8cftBUUFresQTTcAQAAABt-otcOAAAA; expires=Thu, 25-Feb-2021 21:18:20 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 26 Jan 2021 21:18:19 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-beforeeachhook-/41fb4b5459264361880ebe9dd32e95f4","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vkl19WM1q6vxhHcR-GsnnFmQxYVX_P0KGTaSAaViBBFBNUU-3lZwQzuVqWjQVnEMUtA2Qy7HNzdlchwTU8XmH4OCpKlu4UGdfkzr9vh6koVQWSWcGv4eaadq2o3ZTXqFRtgivww8khaMu3jilKfsKZSGRE6ACJ_cFCVp8X8Ds8IFdvbVEZUD6R7rUI5OmbLtpBoR7cRSrYJl6-mgwJ76mVca10GA3aXG1c51KxQ_9f7KyPfdqybRIuFOlfRZyRDDoSuUJJZ5n4N24F0_26R50MfNPC4BJae7VEmgyvo_w2RD7Muja52DI8xmEig9b73fpTpg3K77SdfXS96kPUmqiQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611695900,"updated":1611695900,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '9275cd9b-368c-4a48-8771-31b275b99cb0',
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
  'Tue, 26 Jan 2021 21:18:19 GMT',
  'Content-Length',
  '725'
]);
