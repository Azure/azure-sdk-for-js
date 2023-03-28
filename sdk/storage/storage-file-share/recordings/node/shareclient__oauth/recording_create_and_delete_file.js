let nock = require('nock');

module.exports.hash = "ee5311d6495dcf55d2369cac684ce2b4";

module.exports.testInfo = {"uniqueName":{"share":"share167749058847302674","file":"file167749058877108152"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058847302674')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:28 GMT',
  'ETag',
  '"0x8DB18A61A5759C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb417-101a-0070-0c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '10a7cb38-e909-4f76-aa66-8b22ccace5fc',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058847302674/file167749058877108152')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:29 GMT',
  'ETag',
  '"0x8DB18A61A861268"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb419-101a-0070-0d8e-4a9c5e000000',
  'x-ms-client-request-id',
  'ff341f63-71d7-470c-bfda-636f57b04965',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749058847302674/file167749058877108152')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:29 GMT',
  'ETag',
  '"0x8DB18A61A861268"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb41a-101a-0070-0e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '1a853f28-da0a-4124-80d1-831d6f22283c',
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
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:29.1689064Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058847302674/file167749058877108152')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb41b-101a-0070-0f8e-4a9c5e000000',
  'x-ms-client-request-id',
  'dd946913-0bdd-4b02-aedf-c3914adae595',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749058847302674/file167749058877108152')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb41d-101a-0070-108e-4a9c5e000000',
  'x-ms-client-request-id',
  '14ec6197-0e95-4865-b4da-26ba24e0c3bb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058847302674')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb41e-101a-0070-118e-4a9c5e000000',
  'x-ms-client-request-id',
  '0e7944c3-7ff4-4f59-9687-5ae3e2a9533a',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:30 GMT'
]);
