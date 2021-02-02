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
  '174ce19e-5acf-11eb-a0b8-0242ac12000a',
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
  '3c3b4bb2-8864-40f5-b1b0-96452c721001',
  'x-ms-ests-server',
  '2.1.11397.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AruM6-s0o4dGuoROwfwoa4NdWxHLBwAAAFGZmdcOAAAA; expires=Fri, 19-Feb-2021 03:25:06 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 03:25:06 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"bad_token"},"folderToRestore":"bad_folder"})
  .query(true)
  .reply(202, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"a7c6b58306814014a6b41574f4fe5693","startTime":1611113107,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 03:25:07 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netrestore/a7c6b58306814014a6b41574f4fe5693/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  '1775ccee-5acf-11eb-a0b8-0242ac12000a',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1507',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/a7c6b58306814014a6b41574f4fe5693/pending')
  .query(true)
  .reply(200, {"endTime":1611113108,"error":{"code":null,"innererror":null,"message":null},"jobId":"a7c6b58306814014a6b41574f4fe5693","startTime":1611113107,"status":"Failed","statusDetails":"Invalid backup provided"}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 03:25:09 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  '1874264a-5acf-11eb-a0b8-0242ac12000a',
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
  '1601',
  'content-security-policy',
  "default-src 'self'"
]);
