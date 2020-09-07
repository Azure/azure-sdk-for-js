let nock = require('nock');

module.exports.hash = "1167da4f946cc24cc8b0d665d1944c91";

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
  'eastus',
  'x-ms-request-id',
  '08c4bae7-7188-460b-85a8-ef75eddda5cf',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:30 GMT'
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
  '010d840e-e5a1-4917-bd02-0eb6c2d41d00',
  'x-ms-ests-server',
  '2.1.10963.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AkJLNVTjLuZFtLJGA2c7F24_aSJHAQAAAPo-0tYOAAAA; expires=Sun, 20-Sep-2020 22:17:31 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 21 Aug 2020 22:17:30 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/9d733727f4484c248ef29a328a26971e","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"rWEllQDX9DzxXRGV_lxCofkMqU90UOylmwgH0DAYiw4V2GOx_At3yYF0dVsB-qZv_JAHAvMyYneHDDy7JRApImDjtQGgMvSJf2EcWQO9FOqYJpZ7qzog8kQuF3hr6fHO5AfulZ0vqld8p1ClJhtS2yi8xnPwv-SbZDZHV70MMczmiURG_3boKo-JdVYynif06hYVnwX6qbtCk8xC4nhE3aSFLhYgcAJH98RNnkn8AZcsqHvZeFiQrt_eM1JK9xRoAx5PZh3bEtb91X8oFQE-7IhDbU_Win_zasHbd-JMQJwaw_NmDhten_rGZKUK6rFrQ_6tzn6a8QJ_BDEv3G0DVw","e":"AQAB"},"attributes":{"enabled":true,"created":1598048251,"updated":1598048251,"recoveryLevel":"Recoverable+Purgeable","recoverableDays":90}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'x-ms-keyvault-region',
  'eastus',
  'x-ms-request-id',
  'ff323d13-6a41-43d8-895d-89ef46443505',
  'x-ms-keyvault-service-version',
  '1.1.44.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=13.66.222.112;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 21 Aug 2020 22:17:30 GMT',
  'Content-Length',
  '717'
]);
