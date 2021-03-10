let nock = require('nock');

module.exports.hash = "644e19723d06371943d80ca3db86791c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/aesCrypto-128-1615393762417')
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
  'c4c7f31c-81bd-11eb-8d84-000d3aaef1c1',
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
  '4ae191ed-893d-4727-a7e1-0aa531141b00',
  'x-ms-ests-server',
  '2.1.11562.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap788RPGtEFLtfunTKVWMR1YXQRlAQAAAODq2tcOAAAA; expires=Fri, 09-Apr-2021 16:29:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Mar 2021 16:29:21 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/aesCrypto-128-1615393762417', {"key":{"kty":"oct","key_ops":["encrypt","decrypt","wrapKey","unwrapKey"],"k":"neuhNJY4eVH225vAVHzvxw"},"attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1615393761,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393761},"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '348',
  'x-ms-request-id',
  'c4fe812a-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '278',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c/decrypt')
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
  'c54479e6-81bd-11eb-8d84-000d3aaef1c1',
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
  '7c23aff0-763d-440f-8484-6942326a1a00',
  'x-ms-ests-server',
  '2.1.11562.6 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap788RPGtEFLtfunTKVWMR1YXQRlAgAAAODq2tcOAAAA; expires=Fri, 09-Apr-2021 16:29:22 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Mar 2021 16:29:22 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c/decrypt', {"alg":"A128CBCPAD","value":"dGZmShrGvxRchs_9Obk4AS9dMKiWbVmdAZJ-Ls-RwlGRKRlpoX2TvF0nxGQf3RrL","iv":"oEmfyc6LUDW9p_cjlM8Sng"})
  .query(true)
  .reply(200, {"alg":"A128CBCPAD","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c","value":"ZW5jcnlwdHMgbG9jYWxseSBhbmQgZGVjcnlwdHMgcmVtb3RlbHk"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '199',
  'x-ms-request-id',
  'c57c14dc-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '58',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/aesCrypto-128-1615393762417')
  .query(true)
  .reply(200, {"attributes":{"created":1615393761,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393761},"deletedDate":1615393763,"key":{"key_ops":["encrypt","decrypt","wrapKey","unwrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/aesCrypto-128-1615393762417","scheduledPurgeDate":1623169763}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '503',
  'x-ms-request-id',
  'c59da372-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '104',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/aesCrypto-128-1615393762417')
  .query(true)
  .reply(200, {"attributes":{"created":1615393761,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393761},"deletedDate":1615393762,"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-128-1615393762417/2a9ab7e4efb140e03cf9913bfba1842c","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/aesCrypto-128-1615393762417","scheduledPurgeDate":1623169762}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'c5c6171c-81bd-11eb-8d84-000d3aaef1c1',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '503',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'x-ms-build-version',
  '1.0.20210306-1-6fb7c19a-develop',
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '34'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/aesCrypto-128-1615393762417')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  'c5e3daae-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '154',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
