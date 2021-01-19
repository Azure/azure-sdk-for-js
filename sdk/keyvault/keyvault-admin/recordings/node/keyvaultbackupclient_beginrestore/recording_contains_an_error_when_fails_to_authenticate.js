let nock = require('nock');

module.exports.hash = "8f03666434696689066e257d15d6d98f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/restore')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '1',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  'f62bde66-5ab5-11eb-88fb-0242ac120006',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache'
]);

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagedhsm.azure.net%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1322',
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
  'f4ecc6dd-fe44-4456-a48b-918b83ab0701',
  'x-ms-ests-server',
  '2.1.11397.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=At3qUWaQVUBJmj5Gv0S-0ildWxHLCAAAABJvmdcOAAAA; expires=Fri, 19-Feb-2021 00:25:13 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:25:12 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"bad_token"},"folderToRestore":"bad_folder"})
  .query(true)
  .reply(202, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4445b9473d94405c8b4d6dee8d4cca85","startTime":1611102314,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 00:25:13 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netrestore/4445b9473d94405c8b4d6dee8d4cca85/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  'f6581094-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1419',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4445b9473d94405c8b4d6dee8d4cca85/pending')
  .query(true)
  .reply(200, {"endTime":1611102315,"error":{"code":null,"innererror":null,"message":null},"jobId":"4445b9473d94405c8b4d6dee8d4cca85","startTime":1611102314,"status":"Failed","statusDetails":"Invalid backup provided"}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:25:15 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'f7499b26-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '203',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1189',
  'content-security-policy',
  "default-src 'self'"
]);
