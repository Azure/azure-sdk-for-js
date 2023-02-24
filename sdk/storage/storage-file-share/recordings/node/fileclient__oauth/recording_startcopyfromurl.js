let nock = require('nock');

module.exports.hash = "4474fa21c50d3781c7d2aa54cce09227";

module.exports.testInfo = {"uniqueName":{"share":"share167749055686607668","dir":"dir167749055716203942","file":"file167749055746005524","copiedfile":"copiedfile167749055775706897"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055686607668')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:57 GMT',
  'ETag',
  '"0x8DB18A607807E59"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb35e-101a-0070-1c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '1fdc020d-365c-4f70-833f-cc3d4d52e57c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055686607668/dir167749055716203942')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:57 GMT',
  'ETag',
  '"0x8DB18A607AEA31A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb360-101a-0070-1d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '96a0eed2-e00b-4a4c-bbd1-73cc066ee1fb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:57.5580442Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:57.5580442Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:57.5580442Z',
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
  'Mon, 27 Feb 2023 09:35:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055686607668/dir167749055716203942/file167749055746005524')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:57 GMT',
  'ETag',
  '"0x8DB18A607DBC6FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb361-101a-0070-1e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '740ec44f-6f78-460d-b627-37f553dc5b5d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:57.8538747Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:57.8538747Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:57.8538747Z',
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
  'Mon, 27 Feb 2023 09:35:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055686607668/dir167749055716203942/copiedfile167749055775706897')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:58 GMT',
  'ETag',
  '"0x8DB18A6083B1709"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb363-101a-0070-1f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '70b07f58-b2e0-4542-9709-29d2f7e3e995',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  'c93b76ab-3739-4e5c-a396-1e587458a5a2',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 09:35:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749055686607668/dir167749055716203942/file167749055746005524')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:57 GMT',
  'ETag',
  '"0x8DB18A607DBC6FB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb364-101a-0070-208e-4a9c5e000000',
  'x-ms-client-request-id',
  '219a39e8-9929-4af2-a163-a1d6cb367c95',
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
  '2023-02-27T09:35:57.8538747Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:57.8538747Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:57.8538747Z',
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
  'Mon, 27 Feb 2023 09:35:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749055686607668/dir167749055716203942/copiedfile167749055775706897')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:58 GMT',
  'ETag',
  '"0x8DB18A6083B1709"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb365-101a-0070-218e-4a9c5e000000',
  'x-ms-client-request-id',
  '0ca31a32-8903-4518-af09-4f2b969f19b8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  'c93b76ab-3739-4e5c-a396-1e587458a5a2',
  'x-ms-copy-source',
  'https://fakestorageaccount.file.core.windows.net/share167749055686607668/dir167749055716203942/file167749055746005524',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '1024/1024',
  'x-ms-copy-completion-time',
  'Mon, 27 Feb 2023 09:35:58 GMT',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:35:58.4785161Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:58.4785161Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:58.4785161Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:58 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055686607668')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb366-101a-0070-228e-4a9c5e000000',
  'x-ms-client-request-id',
  'dd3009eb-de35-43bd-8726-0770c151aa35',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:59 GMT'
]);
