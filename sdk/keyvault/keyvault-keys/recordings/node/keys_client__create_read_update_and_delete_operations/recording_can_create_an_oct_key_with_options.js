let nock = require('nock');

module.exports.hash = "b2df495aea09d11d6586c5d0cdc3d49e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/create')
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
  '2a1cd098-64ef-11eb-91de-0242ac120003',
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
  '91607e6f-71dd-4259-a759-d8eae447b800',
  'x-ms-ests-server',
  '2.1.11444.12 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=ApHPgK2Vz_1PlUa33MNOo45dWxHLAQAAAFiWqtcOAAAA; expires=Thu, 04-Mar-2021 00:39:53 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 02 Feb 2021 00:39:52 GMT',
  'Content-Length',
  '1322'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/create', {"kty":"oct-HSM","attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1612226393,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612226393},"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/6e832436767e04932b3327fefc4fc9e5","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '379',
  'x-ms-request-id',
  '2a4efc3a-64ef-11eb-91de-0242ac120003',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '218',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cancreateanOCTkeywithoptions-')
  .query(true)
  .reply(200, {"attributes":{"created":1612226393,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612226393},"deletedDate":1612226393,"key":{"key_ops":["unwrapKey","wrapKey","decrypt","encrypt"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/6e832436767e04932b3327fefc4fc9e5","kty":"oct-HSM"},"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-","scheduledPurgeDate":1620002393}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '565',
  'x-ms-request-id',
  '2a8bd312-64ef-11eb-91de-0242ac120003',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '138',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-')
  .query(true)
  .reply(200, {"attributes":{"created":1612226393,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1612226393},"deletedDate":1612226393,"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/6e832436767e04932b3327fefc4fc9e5","kty":"oct-HSM"},"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-","scheduledPurgeDate":1620002393}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '2aba8edc-64ef-11eb-91de-0242ac120003',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '565',
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
  '37'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-')
  .query(true)
  .reply(204, "", [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '0',
  'x-ms-request-id',
  '2ad97f90-64ef-11eb-91de-0242ac120003',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '139',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
