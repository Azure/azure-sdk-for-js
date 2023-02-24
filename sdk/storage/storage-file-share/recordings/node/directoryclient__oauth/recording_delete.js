let nock = require('nock');

module.exports.hash = "5ac5f6ca4c6e913260c1430254804590";

module.exports.testInfo = {"uniqueName":{"share":"share167749053072601272","dir":"dir167749053102205232"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053072601272')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:31 GMT',
  'ETag',
  '"0x8DB18A5F7EBB15A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2cd-101a-0070-358e-4a9c5e000000',
  'x-ms-client-request-id',
  '426e155d-d720-4f8d-9e0c-580fbe828447',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749053072601272/dir167749053102205232')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:31 GMT',
  'ETag',
  '"0x8DB18A5F819FD52"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2cf-101a-0070-368e-4a9c5e000000',
  'x-ms-client-request-id',
  'cc4daaa2-d69d-478b-a099-81a89cd9fe9e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:31.4180434Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:31.4180434Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:31.4180434Z',
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
  'Mon, 27 Feb 2023 09:35:31 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749053072601272')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2d1-101a-0070-378e-4a9c5e000000',
  'x-ms-client-request-id',
  '6f8d6722-d1cf-4687-b75b-4e04f9e37aaa',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:31 GMT'
]);
