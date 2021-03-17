let nock = require('nock');

module.exports.hash = "01529033885c4ce7e435eb55034930ac";

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
  '790c3ed7-0e94-4857-89fc-9d740beec7e2',
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
  'Tue, 02 Mar 2021 23:59:31 GMT'
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
  '161e5a43-14e9-428c-bb52-74d11b3fa300',
  'x-ms-ests-server',
  '2.1.11513.17 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ar3DRDps_cJMp4216vgVnnEsYtMRBAAAAGLI0NcOAAAA; expires=Thu, 01-Apr-2021 23:59:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Mar 2021 23:59:31 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/localCryptoKeyName-beforeeachhook-/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/localCryptoKeyName-beforeeachhook-/d3aea46327bf49eca88b69db2b7120df","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"vRu7qggnDKe07WLvWJHTygSWLAyR0xa__cDtqPABPxaCyw1k8VSd6g91yYTXtvukbJz7qGqT-PhVWj8rPNPXWv_40NKZLMv8OtjudHgR2Dsdkygq3wi-kQbX5LGUmLnnsaw4bD6ubhbUSSQV_rkJDHM1PRMbGwINvhA8xEJgzYWbh1aYtLmrhs0T26HdUipCOzdB7S-UucwnSEOPm8ZMOrh6Z4jdc3kezeh2SxQYSO2yUqnMopkguAMJMXBu9tADrLZJodnZBudxK3x4EqN13yIccDQkUQSZMYX-Kc23CdwWXhDgrquBeyA6ztof_TQ9u4QI-8G9Qw7NKxg5eh0dUQ","e":"AQAB"},"attributes":{"enabled":true,"created":1614729572,"updated":1614729572,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'bc35d890-1edd-4b39-b22b-5a6c4e2c64ff',
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
  'Tue, 02 Mar 2021 23:59:32 GMT',
  'Content-Length',
  '726'
]);
