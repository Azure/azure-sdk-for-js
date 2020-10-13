let nock = require('nock');

module.exports.hash = "605aa7c32fc39d9cef1923e874e73573";

module.exports.testInfo = {"uniqueName":{"share":"share160231621762403825"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160231621762403825')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'ETag',
  '"0x8D86CF122C31DE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6eefa50-601a-0077-16da-9ebb32000000',
  'x-ms-client-request-id',
  'fc84405d-a9db-457b-bb36-64bffaf1313e',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160231621762403825')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'ETag',
  '"0x8D86CF122C31DE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26963bc8-001a-0061-16da-9e4de5000000',
  'x-ms-client-request-id',
  '4b3062da-1bb2-4fde-b1b8-4e647f06f113',
  'x-ms-version',
  '2020-02-10',
  'x-ms-snapshot',
  '2020-10-10T07:50:21.0000000Z',
  'Date',
  'Sat, 10 Oct 2020 07:50:21 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160231621762403825')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'ETag',
  '"0x8D86CF122C31DE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a54469d4-001a-0013-23da-9e4aaa000000',
  'x-ms-client-request-id',
  'a45c8417-7156-4341-a75b-e57891ef5b49',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Sat, 10 Oct 2020 07:50:21 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160231621762403825')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'ETag',
  '"0x8D86CF122C31DE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '32797438-201a-003b-47da-9e2b02000000',
  'x-ms-client-request-id',
  'f2cb11c4-fd7d-4748-88bf-9f64b202a9ac',
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
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 10 Oct 2020 07:50:23 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160231621762403825')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'ETag',
  '"0x8D86CF122C31DE4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f519f12-a01a-0078-5ada-9ecd5e000000',
  'x-ms-client-request-id',
  '7df7280b-8e52-4de2-87ef-014f37dcddb6',
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
  'Sat, 10 Oct 2020 07:50:19 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sat, 10 Oct 2020 07:50:24 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160231621762403825')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ad66e7f-401a-005f-20da-9eda9a000000',
  'x-ms-client-request-id',
  '7c9541f2-aed4-416e-ab52-94a6fe320bf1',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sat, 10 Oct 2020 07:50:26 GMT',
  'Connection',
  'close'
]);
