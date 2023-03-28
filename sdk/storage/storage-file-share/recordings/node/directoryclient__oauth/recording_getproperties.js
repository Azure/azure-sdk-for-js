let nock = require('nock');

module.exports.hash = "df88c8f7d9b19f62af61c120de49c69a";

module.exports.testInfo = {"uniqueName":{"share":"share167749052007404096","dir":"dir167749052037009830"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052007404096')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:20 GMT',
  'ETag',
  '"0x8DB18A5F191F9D0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb289-101a-0070-0e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '7ff75603-f9f9-4357-ba73-1ea3fda7752c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052007404096/dir167749052037009830')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:20 GMT',
  'ETag',
  '"0x8DB18A5F1C0A3F2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb28d-101a-0070-0f8e-4a9c5e000000',
  'x-ms-client-request-id',
  'd9984db0-5418-427c-b4e9-27d99ea442ce',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:20.7661554Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:20.7661554Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:20.7661554Z',
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
  'Mon, 27 Feb 2023 09:35:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052007404096/dir167749052037009830')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:20 GMT',
  'ETag',
  '"0x8DB18A5F1C0A3F2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb28e-101a-0070-108e-4a9c5e000000',
  'x-ms-client-request-id',
  '534e040f-1c0d-4b59-9479-37bd8392a4a4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-02-27T09:35:20.7661554Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:20.7661554Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:20.7661554Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:20 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052007404096')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb28f-101a-0070-118e-4a9c5e000000',
  'x-ms-client-request-id',
  'e21913a8-5adb-4255-bae3-e4252f921d18',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:21 GMT'
]);
