let nock = require('nock');

module.exports.hash = "57fa9a7867a88c90ae151080f0f90f77";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-supportstracing-/create')
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
  '54c29a21-c599-4059-8b08-d8131a0c3eca',
  'x-ms-request-id',
  '6056250c-6071-4eec-8f18-f3c371ddae64',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:14:53 GMT'
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
  '544ae8f1-a34a-4e78-aa06-28284f78d900',
  'x-ms-ests-server',
  '2.1.11654.16 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag5OTBXETh1GlDgraBprTcaS9HQSAQAAAK62F9gOAAAA; expires=Tue, 25-May-2021 19:14:54 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sun, 25 Apr 2021 19:14:54 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-supportstracing-/create', {"kty":"RSA","attributes":{}})
  .query(true)
  .reply(200, {"key":{"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-supportstracing-/11ad089183654ac082c074fb140b1625","kty":"RSA","key_ops":["encrypt","decrypt","sign","verify","wrapKey","unwrapKey"],"n":"6YtAdkwXU1LVqsd3kUZf2ly5Z5XWoO-sDCqHCNpGdOMCT335kbn8njuYViiG-lA-J9AGsKYXzr8D-vOxoYkwm08-PtoaDhIIrymeg-8eK-wJbzhsNFeECZY5Zqy9TG_oG3wPR6XHSyvQrZMy4K4xmLyGUxWX-vxnj49oOaOCuOFOytcmZcHTWB2edDdtoNJQi88wxF6xq0cpmcSLi2AI8zSz7UbSkqU8ALClwcZM9wAjEQqTCCwPWruMkrgVnDI0DuUPFmk8r-bQB6yPP26Qt-WhXwYn_CpRpqggubLHD8wjzq4cv255szG5dHbAL7VQMHd7KcQo56qb2pZO5H5ybQ","e":"AQAB"},"attributes":{"enabled":true,"created":1619378094,"updated":1619378094,"recoveryLevel":"CustomizedRecoverable+Purgeable","recoverableDays":7}}, [
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
  '54c29a21-c599-4059-8b08-d8131a0c3eca',
  'x-ms-request-id',
  '82ed28ed-b58f-4b08-9208-77a4abf8cbd1',
  'x-ms-keyvault-service-version',
  '1.2.236.0',
  'x-ms-keyvault-network-info',
  'conn_type=Ipv4;addr=96.57.209.90;act_addr_fam=InterNetwork;',
  'X-Powered-By',
  'ASP.NET',
  'Strict-Transport-Security',
  'max-age=31536000;includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Sun, 25 Apr 2021 19:14:55 GMT',
  'Content-Length',
  '718'
]);
