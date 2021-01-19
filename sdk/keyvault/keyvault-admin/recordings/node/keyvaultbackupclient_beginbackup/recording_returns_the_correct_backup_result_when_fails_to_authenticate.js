let nock = require('nock');

module.exports.hash = "59df27cf27f762c59c5de4ea92e3d83b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup')
  .query(true)
  .reply(401, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '0',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '0',
  'x-ms-request-id',
  'cf84dd12-5ab5-11eb-88fb-0242ac120006',
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
  '824d0f65-6ab7-4e8d-acfb-0adde6950001',
  'x-ms-ests-server',
  '2.1.11397.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=At3qUWaQVUBJmj5Gv0S-0ildWxHLBwAAABJvmdcOAAAA; expires=Fri, 19-Feb-2021 00:24:08 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:24:07 GMT'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"invalid_sas_token"})
  .query(true)
  .reply(202, {"status":"Failed","statusDetails":"ResourceNotFound","error":{"code":null,"message":null,"innererror":null},"startTime":1611102249,"endTime":1611102250,"jobId":"828b4ff3f190489888b3a9dc281f690f","azureStorageBlobContainerUri":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 00:24:15 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netbackup/828b4ff3f190489888b3a9dc281f690f/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  'cfb02fa8-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '7446',
  'content-length',
  '232',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);
