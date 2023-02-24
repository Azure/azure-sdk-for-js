let nock = require('nock');

module.exports.hash = "6f64dd668017193c1f5aaca8d0eefd96";

module.exports.testInfo = {"uniqueName":{"share":"share167749055182409242","dir":"dir167749055211904318","file":"file167749055242002808"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055182409242')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:52 GMT',
  'ETag',
  '"0x8DB18A6047EF270"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb33c-101a-0070-808e-4a9c5e000000',
  'x-ms-client-request-id',
  'ddde062a-9013-4535-8f69-186da28006c5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055182409242/dir167749055211904318')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:52 GMT',
  'ETag',
  '"0x8DB18A604ACF7B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb341-101a-0070-048e-4a9c5e000000',
  'x-ms-client-request-id',
  '755df9f1-12ab-4dc3-b57d-575b54aa88c4',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:52.5139384Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:52.5139384Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:52.5139384Z',
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
  'Mon, 27 Feb 2023 09:35:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055182409242/dir167749055211904318/file167749055242002808')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:52 GMT',
  'ETag',
  '"0x8DB18A604DADECC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb346-101a-0070-098e-4a9c5e000000',
  'x-ms-client-request-id',
  '35c89de9-8508-4261-b4b7-3dd4efd13336',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:52.8147660Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:52.8147660Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:52.8147660Z',
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
  'Mon, 27 Feb 2023 09:35:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055182409242/dir167749055211904318/file167749055242002808')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb349-101a-0070-0b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '001af367-f352-4d9b-b06e-13d254795f25',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:52 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055182409242')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb34a-101a-0070-0c8e-4a9c5e000000',
  'x-ms-client-request-id',
  'ac6d159d-ef03-4bfb-97c4-4517e672a71c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:53 GMT'
]);
