let nock = require('nock');

module.exports.hash = "c5cc9f670ffa0ef726f646c57f7dfc25";

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
  '3fe14229-91cd-4b62-8c2b-df095e528ed6',
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
  'Mon, 25 Jan 2021 01:41:14 GMT'
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
  'ecbd5b8e-8478-411b-b09e-811bd22af500',
  'x-ms-ests-server',
  '2.1.11419.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Am26iPGssf9Pl7gwXMSdRFCsQTTcFAAAAIEYoNcOAAAA; expires=Wed, 24-Feb-2021 01:41:14 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 25 Jan 2021 01:41:14 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.netkeys/localCryptoKeyName-beforeeachhook-/517836998f194d46a57a2eff003b0aa7","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"0U8PuNEDxfpXsU6D1YFdDzETmBAU6-4zYfHcAsFWYcZBCk4xQWT7H97AwkK4TYXGKgrO2s80WQG2ZxqY-bN58048qxquWzptEMoUUSkul69z50lHUhIQY0XVNdv4NCLdIuQnsDFcmyLpPOnGWdSUueZL6b4w0S1jJYYRYdHTeXIVPTDPeyq8eEwDJ_f9HbI4-IqfpNxfDbYWWNxT-r_ix9j00-D5t-VI-Q5_YZIZxuO7fsnrIbo1QJWEAX1TlLXEW6toyV46neFHw2PKLdDI_ChbGlG9uvOekSQae38PuT-MnyOYn9LJbHqGRJMEd8ghHLtIm1oPWzCmkugKT4T5aQ","e":"AQAB"},"attributes":{"enabled":true,"created":1611538874,"updated":1611538874,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '854dcaa4-fd21-4f48-a7aa-95a121655b92',
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
  'Mon, 25 Jan 2021 01:41:13 GMT',
  'Content-Length',
  '725'
]);
