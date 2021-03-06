let nock = require('nock');

module.exports.hash = "6c008e7540cbd6bf710ea0e219a367e5";

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
  '352e079e-7e18-11eb-b53a-0242ac120005',
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
  '7891cbb8-88f0-4ff6-ac39-b43a9fe17200',
  'x-ms-ests-server',
  '2.1.11530.15 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ar4lQP0-fFFFlh735WVosg9YXQRlAQAAAKDM1NcOAAAA; expires=Mon, 05-Apr-2021 01:06:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 06 Mar 2021 01:06:39 GMT'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/create', {"kty":"oct-HSM","attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1614992800,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1614992800},"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/104ae934344f46923b6ff6016d90917b","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '378',
  'x-ms-request-id',
  '3561eaa0-7e18-11eb-b53a-0242ac120005',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '355',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/CRUDKeyName-cancreateanOCTkeywithoptions-')
  .query(true)
  .reply(200, {"attributes":{"created":1614992800,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1614992800},"deletedDate":1614992801,"key":{"key_ops":["unwrapKey","wrapKey","decrypt","encrypt"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/104ae934344f46923b6ff6016d90917b","kty":"oct-HSM"},"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-","scheduledPurgeDate":1622768801}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '563',
  'x-ms-request-id',
  '35b116ac-7e18-11eb-b53a-0242ac120005',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '144',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://keyvault_name.vault.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-')
  .query(true)
  .reply(200, {"attributes":{"created":1614992800,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1614992800},"deletedDate":1614992801,"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://keyvault_name.vault.azure.net/keys/CRUDKeyName-cancreateanOCTkeywithoptions-/104ae934344f46923b6ff6016d90917b","kty":"oct-HSM"},"recoveryId":"https://keyvault_name.vault.azure.net/deletedkeys/CRUDKeyName-cancreateanOCTkeywithoptions-","scheduledPurgeDate":1622768801}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  '35e13102-7e18-11eb-b53a-0242ac120005',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '563',
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
  '33'
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
  '35ff99b2-7e18-11eb-b53a-0242ac120005',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '131',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
