let nock = require('nock');

module.exports.hash = "a6c12f3543c87d97c76327fc0961ce7c";

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
  'acbebb60-576b-4fb8-8a8f-0bc48079aa68',
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
  '7ea7130f-e89b-442a-be8b-f591f1aefd00',
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
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-/0cba210e6fbf4c13b2445870c65e4ca1","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"sgZeh32Kw5waAByKcA6zHxNp_pV6-JjyN_ZPz5vHLBNy6ydMowGcvZ6vG4rbb-4ICR2U1qdCpHjMUwOKQghLEm8CBv1p33mrhcoRDDWgxVrleIpkoVfYcJt3rqcGvM9oUeKFCDXREDyQv4-41KoL4nDG3kfUKyrS1wRM3wzp_XfRb8enrWMMggPK2n1-axsLiAbibjfjQZ9otUe37gOzhGUl7MA7GoMUKiCv3FNRAyteU2ZgI5e86fBeLvXe7OEstPxDQvhF-t7xP4zJfFqgpBPfOkSNoAJHTq2TXTnH4wmXbsqDHZUVGjejlhT6P58q7To85pnPxlE_0dok0KRrJQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611538873,"updated":1611538873,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '0a9cfa9b-280c-42f6-b454-4e051b622466',
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
  '725'
]);
