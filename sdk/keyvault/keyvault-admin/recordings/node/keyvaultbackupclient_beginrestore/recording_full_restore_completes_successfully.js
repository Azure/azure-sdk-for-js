let nock = require('nock');

module.exports.hash = "1468cff46b8db5cc7994e5475c6f4b80";

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
  'd439c1b0-5ab5-11eb-88fb-0242ac120006',
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
  '845c95e3-d17d-4f14-9da2-ce3d793c5600',
  'x-ms-ests-server',
  '2.1.11397.13 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=At3qUWaQVUBJmj5Gv0S-0ildWxHLCAAAABJvmdcOAAAA; expires=Fri, 19-Feb-2021 00:24:16 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 20 Jan 2021 00:24:15 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":{"code":null,"message":null,"innererror":null},"startTime":1611102257,"endTime":null,"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","azureStorageBlobContainerUri":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 00:24:17 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netbackup/092b00f50d2842ecb20ddaa22ba5c1e4/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  'd465d48a-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1388',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/092b00f50d2842ecb20ddaa22ba5c1e4/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","startTime":1611102257,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:18 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'd55236ea-5ab5-11eb-88fb-0242ac120006',
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
  '1177',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/092b00f50d2842ecb20ddaa22ba5c1e4/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","startTime":1611102257,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:19 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'd61f60a2-5ab5-11eb-88fb-0242ac120006',
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
  '1165',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/092b00f50d2842ecb20ddaa22ba5c1e4/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","startTime":1611102257,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:23 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'd81b7896-5ab5-11eb-88fb-0242ac120006',
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
  '1173',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/092b00f50d2842ecb20ddaa22ba5c1e4/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","startTime":1611102257,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:31 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'da2072ea-5ab5-11eb-88fb-0242ac120006',
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
  '5238',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/092b00f50d2842ecb20ddaa22ba5c1e4/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-azure_managedhsm-2021012000241762","endTime":1611102273,"error":null,"jobId":"092b00f50d2842ecb20ddaa22ba5c1e4","startTime":1611102257,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:34 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'de8c60f0-5ab5-11eb-88fb-0242ac120006',
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
  '1255',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"},"folderToRestore":"mhsm-azure_managedhsm-2021012000241762"})
  .query(true)
  .reply(202, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'date',
  'Wed, 20 Jan 2021 00:24:36 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netrestore/5c78ecbe2fb64374bbadb60460897e79/pending',
  'x-ms-keyvault-region',
  'westeurope',
  'retry-after',
  '10',
  'x-ms-request-id',
  'df6520ac-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1957',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:37 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e0a94b96-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1297',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:39 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e187c556-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1135',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:42 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e381323e-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1192',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:45 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e58143c6-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1226',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:49 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e786f47c-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1199',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:52 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'e989bf2a-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1172',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:24:56 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'eb88c7f8-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '2102',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:25:00 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'ee15ac52-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1185',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:25:03 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'f016b406-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1161',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/5c78ecbe2fb64374bbadb60460897e79/pending')
  .query(true)
  .reply(200, {"endTime":1611102304,"error":null,"jobId":"5c78ecbe2fb64374bbadb60460897e79","startTime":1611102276,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210112-1-4fbf61ac-develop',
  'date',
  'Wed, 20 Jan 2021 00:25:07 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'westeurope',
  'x-ms-request-id',
  'f21315c4-5ab5-11eb-88fb-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '143',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1690',
  'content-security-policy',
  "default-src 'self'"
]);
