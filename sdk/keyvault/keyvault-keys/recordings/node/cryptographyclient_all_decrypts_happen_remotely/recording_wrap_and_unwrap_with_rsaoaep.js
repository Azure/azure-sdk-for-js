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
  '4e4c4c1b-fc40-4940-92ea-70ba66abcb91',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=13.66.212.194;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 02 Mar 2020 17:17:41 GMT'
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
  '9c40a3e8-97e4-4358-91f8-0de96f091200',
  'x-ms-ests-server',
  '2.1.10104.13 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ao77XziFoFBFowHbnDBoXA8_aSJHAQAAALU279UOAAAA; expires=Wed, 01-Apr-2020 17:17:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Mon, 02 Mar 2020 17:17:41 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/cryptography-client-test/a6c16de255b3486698262d66537053f2","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"r3jFMyTMZoNrXR3Wjp4WAeDdh0bwDyXw1hsEo380JrFSokpp6eYFdtQ2I6D3ZN5yqUfSRstz_QLkeR9JBUHwHueJntVD2uTVgEe9wBDQjyJXPOVib3INqWyGgK1HoW2d3KuOpqxGupEOijQlGZurbbytUFMDVR63oONnGRGH2gH-F3YTKcU0sc_BZysFxatv-FLJTJLuf92UjqdY5xvfdlbB-3abqZSc4Up8C2ROCCE1e95fbRdMsLY-8suqy0peqXpykaq1zcrteb8UGvhAPO2ENeGejY6X0A_PNsGVLP_tCVjMNG8fNX7C-Xae6__HVuBxg7r5_Z7B0eV296pNZQ","e":"AQAB"},"attributes":{"enabled":true,"created":1583169462,"updated":1583169462,"recoveryLevel":"Recoverable+Purgeable"}}, [
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
  'bc221316-9800-4cdb-8530-2d17461ae56b',
  'x-ms-keyvault-service-version',
  '1.1.0.897',
  'x-ms-keyvault-network-info',
  'addr=13.66.212.194;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 02 Mar 2020 17:17:41 GMT',
  'Content-Length',
  '693'
]);
