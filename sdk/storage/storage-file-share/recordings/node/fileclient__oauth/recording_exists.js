let nock = require('nock');

module.exports.hash = "ae1c188833962e6937626c9bba53ed43";

module.exports.testInfo = {"uniqueName":{"share":"share167749055508200860","dir":"dir167749055537508017","file":"file167749055567305277"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055508200860')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:55 GMT',
  'ETag',
  '"0x8DB18A6066FF6FE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb355-101a-0070-168e-4a9c5e000000',
  'x-ms-client-request-id',
  'ee460758-281f-4998-b60d-059a04a36a8e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055508200860/dir167749055537508017')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:55 GMT',
  'ETag',
  '"0x8DB18A6069DA956"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb359-101a-0070-178e-4a9c5e000000',
  'x-ms-client-request-id',
  '932e605b-fc37-4e15-84c9-59f75ac65a1a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:55.7690710Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:55.7690710Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:55.7690710Z',
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
  'Mon, 27 Feb 2023 09:35:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749055508200860/dir167749055537508017/file167749055567305277')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb35a-101a-0070-188e-4a9c5e000000',
  'x-ms-client-request-id',
  '72de7b95-1620-4a1a-be51-e3552fcd4b26',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:55 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055508200860/dir167749055537508017/file167749055567305277')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:56 GMT',
  'ETag',
  '"0x8DB18A606F83F2B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb35b-101a-0070-198e-4a9c5e000000',
  'x-ms-client-request-id',
  '7877768a-b186-4235-a01d-82fc1a717f55',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:56.3627307Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:56.3627307Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:56.3627307Z',
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
  'Mon, 27 Feb 2023 09:35:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749055508200860/dir167749055537508017/file167749055567305277')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:56 GMT',
  'ETag',
  '"0x8DB18A606F83F2B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb35c-101a-0070-1a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'c0f0ae21-5bed-42c4-a692-265d7653f362',
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
  '2023-02-27T09:35:56.3627307Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:56.3627307Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:56.3627307Z',
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
  'Mon, 27 Feb 2023 09:35:56 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055508200860')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb35d-101a-0070-1b8e-4a9c5e000000',
  'x-ms-client-request-id',
  'fa01d1a4-0988-4c3a-b742-55525b0034e0',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:56 GMT'
]);
