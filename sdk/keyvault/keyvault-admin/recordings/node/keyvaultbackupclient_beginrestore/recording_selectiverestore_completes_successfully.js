let nock = require('nock');

module.exports.hash = "6390ce7feffa9a9764f7ea4156069c4f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create')
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
  '043d45cc-668b-11eb-bb19-0242ac120005',
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
  '1369ebaa-3ede-488c-9207-1ec4da3d4501',
  'x-ms-ests-server',
  '2.1.11444.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Agqdmzf8S-NFvouenl7mJb0nFH8eAQAAAFFJrdcOAAAA; expires=Sat, 06-Mar-2021 01:48:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Feb 2021 01:48:01 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/rsa1/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"attributes":{"created":1612403282,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612403282},"key":{"e":"AQAB","key_ops":["wrapKey","decrypt","encrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.netkeys/rsa1/f20c9b4cfe6840989e414244015d00ed","kty":"RSA-HSM","n":"q4jxMx-Y8YsGT6teXCxFUHnrFfL4eQ0vQGew1qGo94UhRgNZiv9d4FoWgAKlHoIjzckgsNpuSaCwgplp2Ild9WCtydh2XEseOZ6uWw4iY-i1r98ewPbreMZ9hIBz79LiC2BBRFY_nyp6J78hKwC2zggskSip1Urpr-2PW4k1sKWLzk9vr1lRsvS_WCyNqdXC78EjUXY9J-ocJl-bTRUF0_YFPrD-fteSQDFMKAIBy1-cg1sKzZIAZ881pYYyujUJcsitC6QHIBL3cztnFGmK-Dj273hOxvnTTH-2yqjGOd_s0ZenzUOcGa7mM9cF3sZd4xe-1_IeJ89xr894zslAsw"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '700',
  'x-ms-request-id',
  '046836d8-668b-11eb-bb19-0242ac120005',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '443',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

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
  '04b962f6-668b-11eb-bb19-0242ac120005',
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
  '313b7cb9-b420-4dc4-8122-88a37bf23801',
  'x-ms-ests-server',
  '2.1.11444.12 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Agqdmzf8S-NFvouenl7mJb0nFH8eAgAAAFFJrdcOAAAA; expires=Sat, 06-Mar-2021 01:48:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 04 Feb 2021 01:48:02 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/backup', {"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"})
  .query(true)
  .reply(202, {"status":"InProgress","statusDetails":null,"error":{"code":null,"message":null,"innererror":null},"startTime":1612403288,"endTime":null,"jobId":"415e8a86a2004dee98a1e23d04819395","azureStorageBlobContainerUri":null}, [
  'server',
  'Kestrel',
  'date',
  'Thu, 04 Feb 2021 01:48:07 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netbackup/415e8a86a2004dee98a1e23d04819395/pending',
  'x-ms-keyvault-region',
  'eastus2',
  'retry-after',
  '10',
  'x-ms-request-id',
  '04e030fc-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '5024',
  'content-length',
  '216',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/415e8a86a2004dee98a1e23d04819395/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"415e8a86a2004dee98a1e23d04819395","startTime":1612403288,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:10 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '07eda5ae-668b-11eb-bb19-0242ac120005',
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
  '1942',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/415e8a86a2004dee98a1e23d04819395/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":null,"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"415e8a86a2004dee98a1e23d04819395","startTime":1612403288,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:13 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '0a56f336-668b-11eb-bb19-0242ac120005',
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
  '1848',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/backup/415e8a86a2004dee98a1e23d04819395/pending')
  .query(true)
  .reply(200, {"azureStorageBlobContainerUri":"https://uri.blob.core.windows.net/uri/mhsm-malegekv5hsm-2021020401480813","endTime":1612403297,"error":null,"jobId":"415e8a86a2004dee98a1e23d04819395","startTime":1612403288,"status":"Succeeded","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:17 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '0cb1e794-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '266',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1830',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1612403282,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612403282},"deletedDate":1612403298,"key":{"e":"AQAB","key_ops":["wrapKey","encrypt","decrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.netkeys/rsa1/f20c9b4cfe6840989e414244015d00ed","kty":"RSA-HSM","n":"q4jxMx-Y8YsGT6teXCxFUHnrFfL4eQ0vQGew1qGo94UhRgNZiv9d4FoWgAKlHoIjzckgsNpuSaCwgplp2Ild9WCtydh2XEseOZ6uWw4iY-i1r98ewPbreMZ9hIBz79LiC2BBRFY_nyp6J78hKwC2zggskSip1Urpr-2PW4k1sKWLzk9vr1lRsvS_WCyNqdXC78EjUXY9J-ocJl-bTRUF0_YFPrD-fteSQDFMKAIBy1-cg1sKzZIAZ881pYYyujUJcsitC6QHIBL3cztnFGmK-Dj273hOxvnTTH-2yqjGOd_s0ZenzUOcGa7mM9cF3sZd4xe-1_IeJ89xr894zslAsw"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.netdeletedkeys/rsa1","scheduledPurgeDate":1620179298}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '831',
  'x-ms-request-id',
  '0dd8c408-668b-11eb-bb19-0242ac120005',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '145',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/rsa1')
  .query(true)
  .reply(200, {"attributes":{"created":1612403282,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612403282},"deletedDate":1612403298,"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","encrypt","decrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.netkeys/rsa1/f20c9b4cfe6840989e414244015d00ed","kty":"RSA-HSM","n":"q4jxMx-Y8YsGT6teXCxFUHnrFfL4eQ0vQGew1qGo94UhRgNZiv9d4FoWgAKlHoIjzckgsNpuSaCwgplp2Ild9WCtydh2XEseOZ6uWw4iY-i1r98ewPbreMZ9hIBz79LiC2BBRFY_nyp6J78hKwC2zggskSip1Urpr-2PW4k1sKWLzk9vr1lRsvS_WCyNqdXC78EjUXY9J-ocJl-bTRUF0_YFPrD-fteSQDFMKAIBy1-cg1sKzZIAZ881pYYyujUJcsitC6QHIBL3cztnFGmK-Dj273hOxvnTTH-2yqjGOd_s0ZenzUOcGa7mM9cF3sZd4xe-1_IeJ89xr894zslAsw"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.netdeletedkeys/rsa1","scheduledPurgeDate":1620179298}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '0dfd9ce2-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'eastus2',
  'content-length',
  '831',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '39'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/rsa1')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '0e12e1d8-668b-11eb-bb19-0242ac120005',
  'x-ms-keyvault-region',
  'eastus2',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '125',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/rsa1/restore', {"sasTokenParameters":{"storageResourceUri":"https://uri.blob.core.windows.net/uri","token":"blob_storage_sas_token"},"folder":"mhsm-malegekv5hsm-2021020401480813"})
  .query(true)
  .reply(202, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'date',
  'Thu, 04 Feb 2021 01:48:23 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'azure-asyncoperation',
  'https://azure_managedhsm.managedhsm.azure.netrestore/4e7bf831d9744952a760227ebe3334a4/pending',
  'x-ms-keyvault-region',
  'eastus2',
  'retry-after',
  '10',
  'x-ms-request-id',
  '0e3550e2-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '4828',
  'content-length',
  '180',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4e7bf831d9744952a760227ebe3334a4/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:25 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '112316b8-668b-11eb-bb19-0242ac120005',
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
  '1958',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4e7bf831d9744952a760227ebe3334a4/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:29 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '138cc6ce-668b-11eb-bb19-0242ac120005',
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
  '1821',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4e7bf831d9744952a760227ebe3334a4/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:35 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '15e3ba7c-668b-11eb-bb19-0242ac120005',
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
  '3580',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4e7bf831d9744952a760227ebe3334a4/pending')
  .query(true)
  .reply(200, {"endTime":null,"error":{"code":null,"innererror":null,"message":null},"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"InProgress","statusDetails":null}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:38 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '19456990-668b-11eb-bb19-0242ac120005',
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
  '1911',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/restore/4e7bf831d9744952a760227ebe3334a4/pending')
  .query(true)
  .reply(200, {"endTime":1612403320,"error":null,"jobId":"4e7bf831d9744952a760227ebe3334a4","startTime":1612403300,"status":"Succeeded","statusDetails":"Number of successful key versions restored: 2, Number of key versions could not overwrite: 0"}, [
  'server',
  'Kestrel',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'date',
  'Thu, 04 Feb 2021 01:48:43 GMT',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-keyvault-region',
  'eastus2',
  'x-ms-request-id',
  '1ba99760-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '233',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '2573',
  'content-security-policy',
  "default-src 'self'"
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/rsa1/')
  .query(true)
  .reply(200, {"attributes":{"created":1612403282,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612403282},"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","decrypt","encrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.netkeys/rsa1/f20c9b4cfe6840989e414244015d00ed","kty":"RSA-HSM","n":"q4jxMx-Y8YsGT6teXCxFUHnrFfL4eQ0vQGew1qGo94UhRgNZiv9d4FoWgAKlHoIjzckgsNpuSaCwgplp2Ild9WCtydh2XEseOZ6uWw4iY-i1r98ewPbreMZ9hIBz79LiC2BBRFY_nyp6J78hKwC2zggskSip1Urpr-2PW4k1sKWLzk9vr1lRsvS_WCyNqdXC78EjUXY9J-ocJl-bTRUF0_YFPrD-fteSQDFMKAIBy1-cg1sKzZIAZ881pYYyujUJcsitC6QHIBL3cztnFGmK-Dj273hOxvnTTH-2yqjGOd_s0ZenzUOcGa7mM9cF3sZd4xe-1_IeJ89xr894zslAsw"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '1d411576-668b-11eb-bb19-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'eastus2',
  'content-length',
  '700',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210128-1-4c3070d1-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '15'
]);
