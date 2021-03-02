let nock = require('nock');

module.exports.hash = "120eafe17537481c198648aee124633a";

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
  'f2d642e5-bb96-4f99-b24b-371dea13c230',
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
  'Tue, 02 Mar 2021 22:22:16 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
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
  '57cab7e0-1114-436f-8572-a9908b4cad00',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AuCUwaH-pAJPoo1uGPxWnrssYtMRCwAAAIGw0NcOAAAA; expires=Thu, 01-Apr-2021 22:22:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 22:22:16 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/d234340c0f4a44fbaed01e6623d9443b","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vneXY2OPG2aoWhB9r97nJjNM9oMb5PQu-7PXRvuV6bbJrA_SYG08ui_CAMZNlTzdj-KkUzrn0N7SixZgAdphrcoAE2qBfPu0hr7USC3eFPhMKRgQJshuVfkQ5DRja6P8khK3_lADRWX6XP5ZMejufaz_KrB2Xb-OcGQ1QbBokEFt5OpqwO3PJrf_7TTAIIqs7xLVg5BPUV6-uaPeD0omwgMsu_lS00Vcxn22USg7rSB9SeIZocZYo7NFaJElXWNP7U6jKonBNlB7MeJjzXYdTHoOA-jevczn2QXYD5LeSOUe4qEkJ_t-Ro6K24QPlKjRyGeOyAdxSF5TR_qEMEYexQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614723736,"updated":1614723736,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '7f0b11a2-4aee-4012-84be-a6f622943226',
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
  '715'
]);
