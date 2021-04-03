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
  'a4c30d27-4786-4ae2-b6a6-a439ebd94233',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 02:04:49 GMT'
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
  '8eab39a2-89e9-4113-83a1-3c4516560900',
  'x-ms-ests-server',
  '2.1.11530.17 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AlU307WCW0NBjA_doLoV1p4sYtMRDQAAAMiH09cOAAAA; expires=Sun, 04-Apr-2021 02:04:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 05 Mar 2021 02:04:48 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/30ed73b06df64cd39f787b122588550e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"qHAvGipqh8td15UoWYa5O5c5cDRv9v6ujKVvRQNN-ss0v3uNbt35CNsG1SarF8pMun-v7dV6Q0reGdAh80ZI51fec0Ix5CS5SKZ8eWFdqeUjmlVihpchYS7NRbRsrK6HOVPRXGdIp5U60MZj9hLtGTu0BlhGtj9RmqTOgaoVSDSGrmCCNHDjoefloa1T8Y2AolVLGBXf70UDle5sKviACNJcqtJumQf3dQH4g7ThMF_-jF-DZeXWPeuiwy0U8K77d3FzsbZ3yYiRgpfyOkDgDXWjpOyv7klTs9EjxqOrvKfF44qPNZdU7tdE1yeXsuuvCXa951yKPpg9VrtixCDtjQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614909889,"updated":1614909889,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '782eaeaf-42a8-4823-bb0b-1f5f655f7477',
  'x-ms-keyvault-service-version',
  '1.2.191.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 05 Mar 2021 02:04:49 GMT',
  'Content-Length',
  '717'
]);
