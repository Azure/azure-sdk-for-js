let nock = require('nock');

module.exports.hash = "2b3f11e2fc30e4c88f778fa2f37bf841";

module.exports.testInfo = {"uniqueName":{"share":"share167749051708809981","dir":"dir167749051847104156"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749051708809981')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:18 GMT',
  'ETag',
  '"0x8DB18A5F06C8DC6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb281-101a-0070-098e-4a9c5e000000',
  'x-ms-client-request-id',
  '24f6b4f5-fd2c-4ec8-aa9b-d15f57d524d5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749051708809981/dir167749051847104156')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:18 GMT',
  'ETag',
  '"0x8DB18A5F0A23EA8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb284-101a-0070-0a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '0df3d187-4f12-4226-82a8-c9a29d750b90',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:18.8892328Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:18.8892328Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:18.8892328Z',
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
  'Mon, 27 Feb 2023 09:35:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749051708809981/dir167749051847104156')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:19 GMT',
  'ETag',
  '"0x8DB18A5F0E11326"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb286-101a-0070-0b8e-4a9c5e000000',
  'x-ms-client-request-id',
  'c11d77f3-7403-4bf1-a75b-cbdb0c5d4c0e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749051708809981/dir167749051847104156')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:19 GMT',
  'ETag',
  '"0x8DB18A5F0E11326"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb287-101a-0070-0c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '5900341a-ee46-44c0-9ae9-98630ee96cde',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key0',
  'val0',
  'x-ms-meta-keya',
  'vala',
  'x-ms-meta-keyb',
  'valb',
  'x-ms-file-change-time',
  '2023-02-27T09:35:19.3009958Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:18.8892328Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:18.8892328Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key0,x-ms-meta-keya,x-ms-meta-keyb,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:19 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749051708809981')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb288-101a-0070-0d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '8abbc412-4f8c-42ac-91e4-e35795b7d903',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:20 GMT'
]);
