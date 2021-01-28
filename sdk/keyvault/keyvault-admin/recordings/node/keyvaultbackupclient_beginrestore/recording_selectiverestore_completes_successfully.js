let nock = require('nock');

module.exports.hash = "58fa878c23dc768f3081bc74d6ba2833";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/b36b00af-89c6-435f-a43d-9a3087015c27/create')
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
  'd2073bba-5a98-11eb-b39a-0242ac12000a',
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
  '574daeba-34f2-4a46-91de-36f94939f800',
  'x-ms-ests-server',
  '2.1.11397.13 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ak2Rza1e-_ZLlPcpAxqH8cldWxHLAQAAAIQ-mdcOAAAA; expires=Thu, 18-Feb-2021 20:56:37 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 19 Jan 2021 20:56:36 GMT',
  'Content-Length',
  '1322'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/b36b00af-89c6-435f-a43d-9a3087015c27/create', {"kty":"oct"})
  .query(true)
  .reply(500, {"error":{"code":"UnknownError","message":"Unknown error (Activity ID: d23ac4c6-5a98-11eb-b39a-0242ac12000a)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '176',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '111',
  'x-ms-request-id',
  'd23ac4c6-5a98-11eb-b39a-0242ac12000a',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/b36b00af-89c6-435f-a43d-9a3087015c27/create', {"kty":"oct"})
  .query(true)
  .reply(500, {"error":{"code":"UnknownError","message":"Unknown error (Activity ID: d272e52c-5a98-11eb-b39a-0242ac12000a)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '137',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '111',
  'x-ms-request-id',
  'd272e52c-5a98-11eb-b39a-0242ac12000a',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);

nock('https://azure_managedhsm.managedhsm.azure.net:443', {"encodedQueryParams":true})
  .post('/keys/b36b00af-89c6-435f-a43d-9a3087015c27/create', {"kty":"oct"})
  .query(true)
  .reply(500, {"error":{"code":"UnknownError","message":"Unknown error (Activity ID: e303d05e-5a98-11eb-b39a-0242ac12000a)"}}, [
  'content-type',
  'application/json; charset=utf-8',
  'x-ms-server-latency',
  '140',
  'cache-control',
  'no-cache',
  'x-content-type-options',
  'nosniff',
  'content-length',
  '111',
  'x-ms-request-id',
  'e303d05e-5a98-11eb-b39a-0242ac12000a',
  'strict-transport-security',
  'max-age=31536000; includeSubDomains',
  'content-security-policy',
  "default-src 'self'",
  'x-frame-options',
  'SAMEORIGIN'
]);
