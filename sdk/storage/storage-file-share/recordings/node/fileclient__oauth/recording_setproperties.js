let nock = require('nock');

module.exports.hash = "cd4918536aad63653dbbf78e8a04f085";

module.exports.testInfo = {"uniqueName":{"share":"share167749054821900461","dir":"dir167749054851705918","file":"file167749054882105627"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054821900461')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:48 GMT',
  'ETag',
  '"0x8DB18A60259508C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb328-101a-0070-748e-4a9c5e000000',
  'x-ms-client-request-id',
  '02a3e3a6-894a-4a87-8665-3ac185e6aed2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054821900461/dir167749054851705918')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:48 GMT',
  'ETag',
  '"0x8DB18A602881E6C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb32b-101a-0070-758e-4a9c5e000000',
  'x-ms-client-request-id',
  'de760604-12b3-4886-9506-3517d2e54975',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:48.9170028Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:48.9170028Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:48.9170028Z',
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
  'Mon, 27 Feb 2023 09:35:48 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054821900461/dir167749054851705918/file167749054882105627')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:49 GMT',
  'ETag',
  '"0x8DB18A602B60582"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb32d-101a-0070-768e-4a9c5e000000',
  'x-ms-client-request-id',
  'f0e5f401-1a20-4807-831c-b80101f610a1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:49.2178306Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:49.2178306Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:49.2178306Z',
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
  'Mon, 27 Feb 2023 09:35:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054821900461/dir167749054851705918/file167749054882105627')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:49 GMT',
  'ETag',
  '"0x8DB18A602E572FA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb32e-101a-0070-778e-4a9c5e000000',
  'x-ms-client-request-id',
  '74fdbee7-ff3d-4e04-a20f-3d92f182a6a2',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:49.5286522Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:49.2178306Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:49.2178306Z',
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
  'Mon, 27 Feb 2023 09:35:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749054821900461/dir167749054851705918/file167749054882105627')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:49 GMT',
  'ETag',
  '"0x8DB18A602E572FA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb32f-101a-0070-788e-4a9c5e000000',
  'x-ms-client-request-id',
  '9e29d50e-e6c3-4573-a0d8-128e0ea79423',
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
  '2023-02-27T09:35:49.5286522Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:49.2178306Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:49.2178306Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:49 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749054821900461')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb331-101a-0070-798e-4a9c5e000000',
  'x-ms-client-request-id',
  '5f218225-0ce5-488b-93db-82208625935a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:49 GMT'
]);
