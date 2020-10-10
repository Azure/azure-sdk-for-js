let nock = require('nock');

module.exports.hash = "66acba6578a6fe70ffea703bf23c4fa7";

module.exports.testInfo = {"uniqueName":{"share":"share160230364967002560"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160230364967002560')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871bda-d01a-005d-5dbc-9e6422000000',
  'x-ms-client-request-id',
  '5c83f43f-9443-4c5a-bb98-1cd3f5c9de94',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 10 Oct 2020 04:20:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160230364967002560')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871bdc-d01a-005d-5ebc-9e6422000000',
  'x-ms-client-request-id',
  '0ee6db24-ecf7-4cd6-a112-c375a7f122f4',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-10-10T04:20:50.0000000Z',
  'Date',
  'Sat, 10 Oct 2020 04:20:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160230364967002560')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871bdf-d01a-005d-60bc-9e6422000000',
  'x-ms-client-request-id',
  '4148ddc9-2148-4119-8282-ed74bd923bd9',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sat, 10 Oct 2020 04:20:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160230364967002560')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871be0-d01a-005d-61bc-9e6422000000',
  'x-ms-client-request-id',
  '7654ee54-f431-4b6e-8f11-910cb77c3c6e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 10 Oct 2020 04:20:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160230364967002560')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871be3-d01a-005d-62bc-9e6422000000',
  'x-ms-client-request-id',
  'c51a0fa7-3861-4d9a-bb94-481a720a741e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 10 Oct 2020 04:20:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160230364967002560')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 04:20:49 GMT',
  'ETag',
  '"0x8D86CD3DE6BB9AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871be5-d01a-005d-63bc-9e6422000000',
  'x-ms-client-request-id',
  '62f74de0-32d1-4dcf-ac45-25e6b8576284',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sat, 10 Oct 2020 04:20:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160230364967002560')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7871be6-d01a-005d-64bc-9e6422000000',
  'x-ms-client-request-id',
  '62f08376-2653-4731-bff3-ebda59e6b7d1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 10 Oct 2020 04:20:51 GMT'
]);
