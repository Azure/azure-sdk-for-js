let nock = require('nock');

module.exports.hash = "5e9f43959e3e5d10ae8c894f5eccd9bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup')
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
  'c7a8c180-5ab5-11eb-88fb-0242ac120006',
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
  '0e092507-9348-4ed1-8f77-0847879e0a01',
  'x-ms-ests-server',
  '2.1.11397.13 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=At3qUWaQVUBJmj5Gv0S-0ildWxHLBgAAABJvmdcOAAAA; expires=Fri, 19-Feb-2021 00:23:55 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:23:54 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":{"code":null,"message":null,"innererror":null},"startTime":1611102236,"endTime":null,"jobId":"e1732baafa0846fa84d1f0fa148c8714","azureStorageBlobContainerUri":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 00:23:56 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netbackup/e1732baafa0846fa84d1f0fa148c8714/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  'c7db7d1e-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1363',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/e1732baafa0846fa84d1f0fa148c8714/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"e1732baafa0846fa84d1f0fa148c8714","startTime":1611102236,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:23:57 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'c8c41ccc-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1180',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/e1732baafa0846fa84d1f0fa148c8714/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"e1732baafa0846fa84d1f0fa148c8714","startTime":1611102236,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:23:59 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'c990a940-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1693',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/e1732baafa0846fa84d1f0fa148c8714/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"e1732baafa0846fa84d1f0fa148c8714","startTime":1611102236,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:04 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'cbdd8f42-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '2588',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/e1732baafa0846fa84d1f0fa148c8714/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-azure_managedhsm-2021012000235657","endTime":1611102247,"error":null,"jobId":"e1732baafa0846fa84d1f0fa148c8714","startTime":1611102236,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:07 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'ceb2e302-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '268',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1197',
  'content-security-policy',
  "default-src 'self'"
]);
