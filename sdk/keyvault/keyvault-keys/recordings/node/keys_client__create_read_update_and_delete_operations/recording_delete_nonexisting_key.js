let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
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
  'bb35b0fb-4441-4749-aeac-66e99d7c4aeb',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=13.66.244.203;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Jan 2020 02:54:58 GMT'
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
  'f20ed85c-2266-4404-8885-393bd2e80701',
  'x-ms-ests-server',
  '2.1.9898.10 - WST ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Aks7Xngx7PBPqDkPkjtJrUE_aSJHAQAAAIMkr9UOAAAA; expires=Thu, 13-Feb-2020 02:54:59 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=prod; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=ests; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 14 Jan 2020 02:54:59 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-deletenonexistingkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-deletenonexistingkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '112',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '3a863127-0f7a-4a9a-9f03-9bf4be315b3e',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=13.66.244.203;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 14 Jan 2020 02:54:58 GMT'
]);
