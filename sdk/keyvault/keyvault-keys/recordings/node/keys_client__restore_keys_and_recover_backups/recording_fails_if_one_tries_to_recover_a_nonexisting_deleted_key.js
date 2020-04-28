let nock = require('nock');

module.exports.hash = "98863677f516a353bb355aa216341f20";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/')
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
  '8a4ee7da-b788-47e3-844b-6d43095d5f88',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 01:46:37 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
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
  'ed6c1d15-fd9d-421b-a81b-6925d4d67200',
  'x-ms-ests-server',
  '2.1.10433.14 - SCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=Ap7NP8Ypk9RCt8NuPIRothc_aSJHAQAAAP6BOdYOAAAA; expires=Thu, 28-May-2020 01:46:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Tue, 28 Apr 2020 01:46:39 GMT',
  'Content-Length',
  '1315'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a931f9b8-a231-4033-bbf4-0ae90bb45102',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 01:46:38 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedkeys/recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-/recover')
  .query(true)
  .reply(404, {"error":{"code":"KeyNotFound","message":"Key not found: recoverKeyName-failsifonetriestorecoveranon-existingdeletedkey-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  '1c2e6e36-c5fd-40e5-a80e-b49b14c22fda',
  'x-ms-keyvault-service-version',
  '1.1.0.898',
  'x-ms-keyvault-network-info',
  'addr=52.247.203.156;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Tue, 28 Apr 2020 01:46:38 GMT'
]);
