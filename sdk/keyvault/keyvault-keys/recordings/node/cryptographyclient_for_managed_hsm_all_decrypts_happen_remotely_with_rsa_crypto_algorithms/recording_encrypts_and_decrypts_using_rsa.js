let nock = require('nock');

module.exports.hash = "87113d81ecbf973bef1da935110db6f9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  '46638d10-72f9-11eb-9617-0242ac120006',
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
  '5e6d3b55-0a7c-4d69-8888-dcd7978a0100',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmZKm4Y4MO9NuVLbCyqKd3f8QxJoAwAAAD4kwtcOAAAA; expires=Sun, 21-Mar-2021 21:27:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Feb 2021 21:27:31 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"RSA"})
  .query(true)
  .reply(200, {"attributes":{"created":1613770052,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613770052},"key":{"e":"AQAB","key_ops":["wrapKey","decrypt","encrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe","kty":"RSA-HSM","n":"qUWERKm5LqLVY355ZHrjgsl9HYVS8atcIPtXy18-j_CItxHlcwaEXsGX-FBDbQiQPmy0ORGM9vFOY9AELmVBHhls00LsytobzNCzmv20zb86QYqMvTMaM5py9BeNiLhIq3Q3OWmQ41igY9HC7Teq5D-719D075C6JIuKeHTljXyQt5VTJV0hWJH2oo5e1sOAdNepD-80uBbjlFXzpbf4MvD3r4mqNuNqyJMGeKV-OepYxxqwWVR3LRAOtdLz3JkN2B__KJChIC9VrF0Hk2WUaCE5CjU06tmgYoMvb0yLS5K9kV6Bj7ZhDnEcn1gN4A5vlupGcRhmI3VY2B2qT6DLiw"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '737',
  'x-ms-request-id',
  '46948ab4-72f9-11eb-9617-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '263',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe')
  .query(true)
  .reply(401, "OK", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'www-authenticate',
  'Bearer authorization="https://login.microsoftonline.com/azure_tenant_id", resource="https://managedhsm.azure.net"',
  'x-frame-options',
  'SAMEORIGIN',
  'content-length',
  '2',
  'x-ms-request-id',
  '46d537d0-72f9-11eb-9617-0242ac120006',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-build-version',
  '1.0.20210204-1-c9f88df4-develop',
  'cache-control',
  'no-cache',
  'x-ms-server-latency',
  '0'
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
  '5e6d3b55-0a7c-4d69-8888-dcd7bc8a0100',
  'x-ms-ests-server',
  '2.1.11513.13 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AmZKm4Y4MO9NuVLbCyqKd3f8QxJoAwAAAD4kwtcOAAAA; expires=Sun, 21-Mar-2021 21:27:32 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Feb 2021 21:27:32 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe')
  .query(true)
  .reply(200, {"attributes":{"created":1613770052,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613770052},"key":{"e":"AQAB","key_ops":["wrapKey","verify","sign","unwrapKey","encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe","kty":"RSA-HSM","n":"qUWERKm5LqLVY355ZHrjgsl9HYVS8atcIPtXy18-j_CItxHlcwaEXsGX-FBDbQiQPmy0ORGM9vFOY9AELmVBHhls00LsytobzNCzmv20zb86QYqMvTMaM5py9BeNiLhIq3Q3OWmQ41igY9HC7Teq5D-719D075C6JIuKeHTljXyQt5VTJV0hWJH2oo5e1sOAdNepD-80uBbjlFXzpbf4MvD3r4mqNuNqyJMGeKV-OepYxxqwWVR3LRAOtdLz3JkN2B__KJChIC9VrF0Hk2WUaCE5CjU06tmgYoMvb0yLS5K9kV6Bj7ZhDnEcn1gN4A5vlupGcRhmI3VY2B2qT6DLiw"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '46fe9ca6-72f9-11eb-9617-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '737',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210204-1-c9f88df4-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '158'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe/decrypt', {"alg":"RSA1_5","value":"alRI4bCAI4EaPr_UtDvrgQvE8f5wZ-NeMPKGgLKiNIKMe-p3xWgzfecAzeSandP4l5iCsYo53rD_eexfZ4b6jkMXFREbonvX9DzLf66LezWs8NSgBoK4K96Yvf4S49xodWEoYbZP0oIZ-bUJ1u61XMuLUvA_35DJ9Mz2dkThCnX94bsgmk6CtPn4UIhVL_FsTPcfpyxQKpyUwkfTViHdjuAvGTkK5AEXYPYrS07RmJpe9KnOK1YOSbE7BRIqZk3I5mkeAwupfCCKMKsheKSk_pV3vTvnp1JmFsmcYS7wqKoQoDEpWEEQ5HF5963NDuPXB7L2FNwtsfDpAq8rPZRl4A"})
  .query(true)
  .reply(200, {"alg":"RSA1_5","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIFJTQQ"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '199',
  'x-ms-request-id',
  '472f5a08-72f9-11eb-9617-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '2',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1613770052,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613770052},"deletedDate":1613770053,"key":{"e":"AQAB","key_ops":["wrapKey","encrypt","decrypt","unwrapKey","sign","verify"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe","kty":"RSA-HSM","n":"qUWERKm5LqLVY355ZHrjgsl9HYVS8atcIPtXy18-j_CItxHlcwaEXsGX-FBDbQiQPmy0ORGM9vFOY9AELmVBHhls00LsytobzNCzmv20zb86QYqMvTMaM5py9BeNiLhIq3Q3OWmQ41igY9HC7Teq5D-719D075C6JIuKeHTljXyQt5VTJV0hWJH2oo5e1sOAdNepD-80uBbjlFXzpbf4MvD3r4mqNuNqyJMGeKV-OepYxxqwWVR3LRAOtdLz3JkN2B__KJChIC9VrF0Hk2WUaCE5CjU06tmgYoMvb0yLS5K9kV6Bj7ZhDnEcn1gN4A5vlupGcRhmI3VY2B2qT6DLiw"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1621546053}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '905',
  'x-ms-request-id',
  '47484b8a-72f9-11eb-9617-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '92',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1613770052,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613770052},"deletedDate":1613770053,"key":{"e":"AQAB","key_ops":["verify","sign","unwrapKey","encrypt","decrypt","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c24de25ece2a477fa5c5f0d9944d37fe","kty":"RSA-HSM","n":"qUWERKm5LqLVY355ZHrjgsl9HYVS8atcIPtXy18-j_CItxHlcwaEXsGX-FBDbQiQPmy0ORGM9vFOY9AELmVBHhls00LsytobzNCzmv20zb86QYqMvTMaM5py9BeNiLhIq3Q3OWmQ41igY9HC7Teq5D-719D075C6JIuKeHTljXyQt5VTJV0hWJH2oo5e1sOAdNepD-80uBbjlFXzpbf4MvD3r4mqNuNqyJMGeKV-OepYxxqwWVR3LRAOtdLz3JkN2B__KJChIC9VrF0Hk2WUaCE5CjU06tmgYoMvb0yLS5K9kV6Bj7ZhDnEcn1gN4A5vlupGcRhmI3VY2B2qT6DLiw"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1621546053}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '476f70de-72f9-11eb-9617-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '905',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210204-1-c9f88df4-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '37'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '478e0bca-72f9-11eb-9617-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '113',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
