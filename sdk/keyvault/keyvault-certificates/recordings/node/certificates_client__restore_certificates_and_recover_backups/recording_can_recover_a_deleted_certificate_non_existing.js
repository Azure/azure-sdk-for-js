let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canrecoveradeletedcertificatenonexisting-/')
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
  '60ec10f1-99ef-41c8-b1f5-2e6c1ab62949',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=52.137.64.184;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:33:41 GMT'
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
  '5676fd9f-669d-474b-852d-88e7de2a0600',
  'x-ms-ests-server',
  '2.1.9987.9 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=At5s1YyQHw5Ppjz-XPaIVb8_aSJHAQAAABV4xtUOAAAA; expires=Sun, 01-Mar-2020 19:33:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 31 Jan 2020 19:33:41 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/certificates/recoverCertificateName-canrecoveradeletedcertificatenonexisting-/')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Certificate not found: recoverCertificateName-canrecoveradeletedcertificatenonexisting-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'a12b0154-a3c4-440d-977e-bb4978700a77',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=52.137.64.184;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:33:41 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatenonexisting-/recover')
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
  '1478b7e6-e793-4437-8ef6-58d13b5c4952',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=52.137.64.184;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:33:41 GMT'
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
  '6f14ce95-f05b-4901-9a56-aaaaf0260300',
  'x-ms-ests-server',
  '2.1.9987.9 - NCUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=At5s1YyQHw5Ppjz-XPaIVb8_aSJHAgAAABV4xtUOAAAA; expires=Sun, 01-Mar-2020 19:33:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Fri, 31 Jan 2020 19:33:41 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/deletedcertificates/recoverCertificateName-canrecoveradeletedcertificatenonexisting-/recover')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Certificate not found: recoverCertificateName-canrecoveradeletedcertificatenonexisting-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '157',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'd57df479-3b64-40a1-8b7a-98fb846bab45',
  'x-ms-keyvault-service-version',
  '1.1.0.891',
  'x-ms-keyvault-network-info',
  'addr=52.137.64.184;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Fri, 31 Jan 2020 19:33:42 GMT'
]);
