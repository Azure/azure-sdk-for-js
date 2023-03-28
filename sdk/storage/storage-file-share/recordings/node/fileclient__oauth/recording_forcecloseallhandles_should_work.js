let nock = require('nock');

module.exports.hash = "583e2fbc1699a07aa80d0c8064b8bf3f";

module.exports.testInfo = {"uniqueName":{"share":"share167749058009406957","dir":"dir167749058038902490","file":"file167749058068906402"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058009406957')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:20 GMT',
  'ETag',
  '"0x8DB18A615586EB0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e1-101a-0070-6e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '4f1218e7-bd40-4c60-8df8-d20d25064fa6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058009406957/dir167749058038902490')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:20 GMT',
  'ETag',
  '"0x8DB18A61586E611"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e5-101a-0070-6f8e-4a9c5e000000',
  'x-ms-client-request-id',
  'd6a14f57-da12-4a7a-9598-1f263a284b2d',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:20.7857169Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:20.7857169Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:20.7857169Z',
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
  'Mon, 27 Feb 2023 09:36:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058009406957/dir167749058038902490/file167749058068906402')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:21 GMT',
  'ETag',
  '"0x8DB18A615B45803"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e6-101a-0070-708e-4a9c5e000000',
  'x-ms-client-request-id',
  '3b243af2-733e-4678-8a25-0db94cdbfcd0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:21.0835459Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:21.0835459Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:21.0835459Z',
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
  'Mon, 27 Feb 2023 09:36:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058009406957/dir167749058038902490/file167749058068906402')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e7-101a-0070-718e-4a9c5e000000',
  'x-ms-client-request-id',
  '6a0460a9-3070-4fac-b3d4-f1d66bec5e68',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Mon, 27 Feb 2023 09:36:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058009406957')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3e8-101a-0070-728e-4a9c5e000000',
  'x-ms-client-request-id',
  '50d4afb6-fb18-447a-9e31-a9e3a997e7e1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:21 GMT'
]);
