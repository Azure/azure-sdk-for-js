let nock = require('nock');

module.exports.hash = "7f019cb2f2bc3d2aab41a5758a39bea7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create')
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
  'c6476448-7303-11eb-bf79-0242ac120006',
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
  'b50ba1b1-c0fd-4aef-8eda-2029875c3000',
  'x-ms-ests-server',
  '2.1.11496.7 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=AoCBmAFNJcxCmRJtqAiMqNf8QxJoAwAAAN41wtcOAAAA; expires=Sun, 21-Mar-2021 22:42:41 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Feb 2021 22:42:41 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/create', {"kty":"AES","key_size":256,"attributes":{}})
  .query(true)
  .reply(200, {"attributes":{"created":1613774561,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613774561},"key":{"key_ops":["wrapKey","unwrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","kty":"oct-HSM"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '360',
  'x-ms-request-id',
  'c673b8c2-7303-11eb-bf79-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '160',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208')
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
  'c6a47fac-7303-11eb-bf79-0242ac120006',
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
  '33d201aa-b4a4-4450-a96f-43e0de2a0c00',
  'x-ms-ests-server',
  '2.1.11496.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AoCBmAFNJcxCmRJtqAiMqNf8QxJoBAAAAN41wtcOAAAA; expires=Sun, 21-Mar-2021 22:42:42 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 19 Feb 2021 22:42:41 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208')
  .query(true)
  .reply(200, {"attributes":{"created":1613774561,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613774561},"key":{"key_ops":["wrapKey","unwrapKey","encrypt","decrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","kty":"oct-HSM"}}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'c6cf0ec0-7303-11eb-bf79-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '360',
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
  '110'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208/encrypt', {"alg":"A256CBCPAD","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM","iv":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM"})
  .query(true)
  .reply(200, {"alg":"A256CBCPAD","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","value":"WhELIQfFmoobat8Km-tp5JJrgtuchLsmi_--3UeC7eN3YpxDxMi93Hj7ZvN5Qy4f"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '224',
  'x-ms-request-id',
  'c6f83f34-7303-11eb-bf79-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '1',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208/decrypt', {"alg":"A256CBCPAD","value":"WhELIQfFmoobat8Km-tp5JJrgtuchLsmi_--3UeC7eN3YpxDxMi93Hj7ZvN5Qy4f","iv":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM"})
  .query(true)
  .reply(200, {"alg":"A256CBCPAD","kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","value":"ZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHVzaW5nIEFFUy1DQkM"}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '207',
  'x-ms-request-id',
  'c710a592-7303-11eb-bf79-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '0',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .delete('/keys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1613774561,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613774561},"deletedDate":1613774562,"key":{"key_ops":["unwrapKey","wrapKey","decrypt","encrypt"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1621550562}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '527',
  'x-ms-request-id',
  'c7291500-7303-11eb-bf79-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '97',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .get('/deletedkeys/cryptography-client-test')
  .query(true)
  .reply(200, {"attributes":{"created":1613774561,"enabled":true,"exportable":false,"recoverableDays":90,"recoveryLevel":"Recoverable+Purgeable","updated":1613774561},"deletedDate":1613774562,"key":{"key_ops":["encrypt","decrypt","unwrapKey","wrapKey"],"kid":"https://azure_managedhsm.managedhsm.azure.net/keys/cryptography-client-test/c05a26c782154eba987f521797b1b208","kty":"oct-HSM"},"recoveryId":"https://azure_managedhsm.managedhsm.azure.net/deletedkeys/cryptography-client-test","scheduledPurgeDate":1621550562}, [
  'x-frame-options',
  'SAMEORIGIN',
  'x-ms-request-id',
  'c7500a02-7303-11eb-bf79-0242ac120006',
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-keyvault-region',
  'westeurope',
  'content-length',
  '527',
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
  '28'
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
  'c76c9726-7303-11eb-bf79-0242ac120006',
  'x-ms-keyvault-region',
  'westeurope',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-ms-keyvault-network-info',
  'addr=50.35.231.105',
  'x-ms-server-latency',
  '106',
  'cache-control',
  'no-cache',
  'x-frame-options',
  'SAMEORIGIN'
]);
