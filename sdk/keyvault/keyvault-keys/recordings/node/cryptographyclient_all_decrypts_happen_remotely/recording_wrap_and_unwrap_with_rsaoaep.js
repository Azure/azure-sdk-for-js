let nock = require('nock');

module.exports.hash = "09400aba4cac9e8c010514e8c0fd2cdc";

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
  'Server',
  'Microsoft-IIS/10.0',
  'WWW-Authenticate',
  'Bearer authorization="https://login.windows.net/azure_tenant_id", resource="https://vault.azure.net"',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a72bf2e2-20a6-467e-9d6a-4455c3342f0c',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=52.250.6.200;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Mar 2020 22:29:17 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":3599,"ext_expires_in":3599,"access_token":"access_token"}, [
  'Cache-Control',
  'no-cache, no-store',
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
  'x-ms-request-id',
  'ca48c8db-dbd7-488b-9c11-79f285e81600',
  'x-ms-ests-server',
  '2.1.10155.16 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AvXj-ceITsxJu3JBWB1l4lU_aSJHAQAAAL3F9NUOAAAA; expires=Sun, 05-Apr-2020 22:29:18 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 06 Mar 2020 22:29:17 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/6bf17d37b9334d71809f4aa7a1cc42f8","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"wQneb2qWZaP5ZfSYkQR_mEY_hCyttbBSEQ9Lc4Zw3inoTKm3N5ZYvkMEoyhgvjOl0mMGFUmkFtobgnKzJ36KV7zCghMTuHSRbVsMXJQJzS9us7lGnOqhVd8ZEXTKUkFm9wvEDKI4c12y22Vt7tTollcvhric53gyqvbQUTu6P_m-PzD_4cQXPjveek3VYC8OdxD0b4ncZbC4z9h4RUui1_5ecNaXr_tR7PEz4Gs08zS2InZDyKvYMxLxyVvSVSgRvB4DIADDfTvHCevS3REJBVTwnEEwJtvoBQKd5UGwbNhzCKxdz32S6ZYBdvr7hd5iPTHxorzTRZf4IICP_fJ2Nw","e":"AQAB"},"attributes":{"enabled":true,"created":1583533758,"updated":1583533758,"recoveryLevel":"Recoverable+Purgeable"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'af5ffcfe-3c16-4883-9de8-0ee95f43c1dc',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=52.250.6.200;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 06 Mar 2020 22:29:17 GMT',
  'Content-Length',
  '693'
]);
