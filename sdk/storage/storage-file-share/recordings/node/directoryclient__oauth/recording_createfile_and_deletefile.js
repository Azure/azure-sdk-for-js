let nock = require('nock');

module.exports.hash = "b7b752d476f0627e7ea3054e4732cfe6";

module.exports.testInfo = {"uniqueName":{"share":"share167749053846304910","dir":"dir167749053875906829","directory":"directory167749053906004016","file":"file167749053936401218"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053846304910')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:38 GMT',
  'ETag',
  '"0x8DB18A5FC881758"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2f9-101a-0070-528e-4a9c5e000000',
  'x-ms-client-request-id',
  '963b24e9-d8a9-4f46-a8fe-34e2548daa86',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:38 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053846304910/dir167749053875906829')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:39 GMT',
  'ETag',
  '"0x8DB18A5FCB67EB8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2fb-101a-0070-538e-4a9c5e000000',
  'x-ms-client-request-id',
  'f27a9fdd-ac2f-4b29-890f-1a8c0dc586cd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:39.1546040Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:39.1546040Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:39.1546040Z',
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
  'Mon, 27 Feb 2023 09:35:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053846304910/dir167749053875906829/directory167749053906004016')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:39 GMT',
  'ETag',
  '"0x8DB18A5FCE4DAF1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2fc-101a-0070-548e-4a9c5e000000',
  'x-ms-client-request-id',
  '25ca0c80-ca43-4163-8bc5-521302fcaf85',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:39.4584305Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:39.4584305Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:39.4584305Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053846304910/dir167749053875906829/directory167749053906004016/file167749053936401218')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:39 GMT',
  'ETag',
  '"0x8DB18A5FD12C1FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2fd-101a-0070-558e-4a9c5e000000',
  'x-ms-client-request-id',
  'f587a6fe-fae4-4d09-912a-061b595e6b8e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749053846304910/dir167749053875906829/directory167749053906004016/file167749053936401218')
  .reply(200, "", [
  'Content-Length',
  '256',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:39 GMT',
  'ETag',
  '"0x8DB18A5FD12C1FD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2fe-101a-0070-568e-4a9c5e000000',
  'x-ms-client-request-id',
  '196525f7-13a8-4fee-bcf3-360d71f3507c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-meta-key',
  'value',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:39.7592573Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '11529285414812647424',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-key,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:39 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053846304910/dir167749053875906829/directory167749053906004016/file167749053936401218')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ff-101a-0070-578e-4a9c5e000000',
  'x-ms-client-request-id',
  '0e8e306d-94d5-4bc2-b1b8-c20d16841be9',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749053846304910/dir167749053875906829/directory167749053906004016/file167749053936401218')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb302-101a-0070-588e-4a9c5e000000',
  'x-ms-client-request-id',
  'd704a398-e1e3-4f39-ba35-096841b1f651',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053846304910/dir167749053875906829/directory167749053906004016')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb303-101a-0070-598e-4a9c5e000000',
  'x-ms-client-request-id',
  '22dd3321-f88a-4fbe-bf6f-08476f70d9d1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:40 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053846304910')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb304-101a-0070-5a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '83698501-c88d-4f39-a006-e657214449f7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:41 GMT'
]);
