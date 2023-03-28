let nock = require('nock');

module.exports.hash = "3595d2b77734fe4e32e7b92ee67169f2";

module.exports.testInfo = {"uniqueName":{"share":"share167749056217803473","dir":"dir167749056247300044","file":"file167749056277104992"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056217803473')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:02 GMT',
  'ETag',
  '"0x8DB18A60AAAE951"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb37f-101a-0070-2b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0a68663f-426d-43ae-a38c-b0ab5369a344',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056217803473/dir167749056247300044')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:02 GMT',
  'ETag',
  '"0x8DB18A60AD90630"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb381-101a-0070-2c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '332b7d12-4d91-4395-9e85-576037599896',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:02.8689968Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:02.8689968Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:02.8689968Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056217803473/dir167749056247300044/file167749056277104992')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:03 GMT',
  'ETag',
  '"0x8DB18A60B069F35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb383-101a-0070-2d8e-4a9c5e000000',
  'x-ms-client-request-id',
  'b1f7c315-b94b-49bc-9d5c-5c0388b7a91b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:02 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749056217803473/dir167749056247300044/file167749056277104992')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:03 GMT',
  'ETag',
  '"0x8DB18A60B069F35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb384-101a-0070-2e8e-4a9c5e000000',
  'x-ms-client-request-id',
  'e4765aed-cc97-455e-8b0f-58846a576fb3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056217803473/dir167749056247300044/file167749056277104992')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:03 GMT',
  'ETag',
  '"0x8DB18A60B60E6ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb385-101a-0070-2f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '55c8de90-449c-4b3f-ac24-ae96263a0191',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:03.7594861Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:03.7594861Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749056217803473/dir167749056247300044/file167749056277104992')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:03 GMT',
  'ETag',
  '"0x8DB18A60B60E6ED"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb386-101a-0070-308e-4a9c5e000000',
  'x-ms-client-request-id',
  '279a2769-f56b-44f1-8a68-c3e75436180b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:36:03.7594861Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:03.7594861Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:03.1678261Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749056217803473')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb388-101a-0070-318e-4a9c5e000000',
  'x-ms-client-request-id',
  'e2e7d9a2-b6e7-499d-9f67-c38addc30051',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:04 GMT'
]);
