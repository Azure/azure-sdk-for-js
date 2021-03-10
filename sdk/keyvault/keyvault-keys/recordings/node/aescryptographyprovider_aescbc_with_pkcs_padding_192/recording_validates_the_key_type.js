let nock = require('nock');

module.exports.hash = "f423f9e96fb418f698c777aafd3e857a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/aesCrypto-192-1615393762418')
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
  'ccd80650-81bd-11eb-8d84-000d3aaef1c1',
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
  '60e35a49-3e9a-438a-907b-9000418f1c00',
  'x-ms-ests-server',
  '2.1.11562.6 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ap788RPGtEFLtfunTKVWMR1YXQRlCgAAAODq2tcOAAAA; expires=Fri, 09-Apr-2021 16:29:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Mar 2021 16:29:34 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .put('/keys/aesCrypto-192-1615393762418', {"key":{"kty":"oct","key_ops":["encrypt","decrypt","wrapKey","unwrapKey"],"k":"T_ZKqxZj4z8pIDfUoQiCfYDfHp-VR92Q"},"attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1615393775,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393775},"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-192-1615393762418/2845d1549c430d09008d7af81d813505","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '348',
  'x-ms-request-id',
  'cd08119c-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '250',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/aesCrypto-192-1615393762418')
  .query(true)
  .reply(200, {"attributes":{"created":1615393775,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393775},"deletedDate":1615393775,"key":{"key_ops":["encrypt","decrypt","wrapKey","unwrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-192-1615393762418/2845d1549c430d09008d7af81d813505","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/aesCrypto-192-1615393762418","scheduledPurgeDate":1623169775}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '503',
  'x-ms-request-id',
  'cd47bd92-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '174',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/aesCrypto-192-1615393762418')
  .query(true)
  .reply(200, {"attributes":{"created":1615393775,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1615393775},"deletedDate":1615393775,"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/aesCrypto-192-1615393762418/2845d1549c430d09008d7af81d813505","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/aesCrypto-192-1615393762418","scheduledPurgeDate":1623169775}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'cd7ac322-81bd-11eb-8d84-000d3aaef1c1',
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
  '35'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/aesCrypto-192-1615393762418')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  'cd9a01e2-81bd-11eb-8d84-000d3aaef1c1',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '114',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
