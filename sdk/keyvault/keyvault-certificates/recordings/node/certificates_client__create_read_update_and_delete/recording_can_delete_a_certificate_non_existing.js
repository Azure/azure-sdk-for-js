let nock = require('nock');

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-candeleteacertificateNonExisting-')
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
  'fb006bf8-4db2-4840-b8ff-6c92d9f5e669',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.157.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Nov 2019 21:45:27 GMT'
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
  '90487b28-eff9-4682-a401-7f8471f67400',
  'x-ms-ests-server',
  '2.1.9677.8 - EUS ProdSlices',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'Set-Cookie',
  'fpc=AuOFD7n9RS5Kor-2voHPedY_aSJHAQAAAPgHZdUOAAAA; expires=Wed, 18-Dec-2019 21:45:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; SameSite=None; secure; HttpOnly',
  'Date',
  'Mon, 18 Nov 2019 21:45:28 GMT',
  'Content-Length',
  '1231'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/certificates/recoverCertificateName-candeleteacertificateNonExisting-')
  .query(true)
  .reply(404, {"error":{"code":"CertificateNotFound","message":"Certificate not found: recoverCertificateName-candeleteacertificateNonExisting-"}}, [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '148',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Server',
  'Microsoft-IIS/10.0',
  'x-ms-keyvault-region',
  'westus',
  'x-ms-request-id',
  'ff88fad9-432d-4c51-a7fd-7a5e331e558c',
  'x-ms-keyvault-service-version',
  '1.1.0.882',
  'x-ms-keyvault-network-info',
  'addr=13.66.157.165;act_addr_fam=InterNetwork;',
  'X-AspNet-Version',
  '4.0.30319',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Mon, 18 Nov 2019 21:45:28 GMT'
]);
