let nock = require('nock');

module.exports.hash = "a9a829ced36190d70895357987b03330";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/CRUDSecretName-supportstracing-')
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
  'x-ms-client-request-id',
  '49e5577a-746a-482b-9c06-cc0fc552a7e7',
  'x-ms-request-id',
  'f2361ad7-f594-4ca5-baa0-eab92890dd00',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 24 Mar 2021 22:58:44 GMT'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fvault.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1315',
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
  '6d2b4c7c-faba-4919-b34e-f8d7cf952e01',
  'x-ms-ests-server',
  '2.1.11562.10 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AqBBdEySkIVNmbK0TH9K4cOXyNCaAQAAACS77dcOAAAA; expires=Fri, 23-Apr-2021 22:58:45 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 24 Mar 2021 22:58:44 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .put('/secrets/CRUDSecretName-supportstracing-', {"value":"SECRET_VALUE","attributes":{}})
  .query(true)
  .reply(200, {"value":"SECRET_VALUE","id":"https://keyvault_name.vault.azure.net/secrets/CRUDSecretName-supportstracing-/694ece78f56a4b5294b6de910ea08aa7","attributes":{"enabled":true,"created":1616626725,"updated":1616626725,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  'x-ms-client-request-id',
  '49e5577a-746a-482b-9c06-cc0fc552a7e7',
  'x-ms-request-id',
  '48c10629-ba0e-4a47-b4d0-f666837d1e97',
  'x-ms-keyvault-service-version',
  '1.2.205.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=50.35.231.105;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 24 Mar 2021 22:58:44 GMT',
  'Content-Length',
  '295'
]);
