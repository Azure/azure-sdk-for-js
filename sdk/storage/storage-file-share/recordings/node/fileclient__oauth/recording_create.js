let nock = require('nock');

module.exports.hash = "9e176984b36199f5e9e12ef90a13fd75";

module.exports.testInfo = {"uniqueName":{"share":"share167749054670802341","dir":"dir167749054700406293","file":"file167749054730301338"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054670802341')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:47 GMT',
  'ETag',
  '"0x8DB18A601726B8D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb321-101a-0070-6f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '5b9cfbc6-431f-484f-9806-afcfde6855cf',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054670802341/dir167749054700406293')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:47 GMT',
  'ETag',
  '"0x8DB18A601A09F89"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb323-101a-0070-708e-4a9c5e000000',
  'x-ms-client-request-id',
  'bd29a446-e0ba-4f70-89fc-2d5bdd8ee43d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:47.3998729Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:47.3998729Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:47.3998729Z',
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
  'Mon, 27 Feb 2023 09:35:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054670802341/dir167749054700406293/file167749054730301338')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:47 GMT',
  'ETag',
  '"0x8DB18A601CE3889"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb324-101a-0070-718e-4a9c5e000000',
  'x-ms-client-request-id',
  '9d3ac8da-e21a-44b3-bae5-a4a6a30ae7a6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:47.6987017Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:47.6987017Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:47.6987017Z',
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
  'Mon, 27 Feb 2023 09:35:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749054670802341/dir167749054700406293/file167749054730301338')
  .reply(200, "\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB18A601CE3889"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb325-101a-0070-728e-4a9c5e000000',
  'x-ms-client-request-id',
  '6798a406-98be-48f2-8e76-16cdca355a6d',
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
  '2023-02-27T09:35:47.6987017Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:47.6987017Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:47.6987017Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:47 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749054670802341')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb327-101a-0070-738e-4a9c5e000000',
  'x-ms-client-request-id',
  'fc03e3db-1e41-4acd-9df9-9d6722d58dd1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:48 GMT'
]);
