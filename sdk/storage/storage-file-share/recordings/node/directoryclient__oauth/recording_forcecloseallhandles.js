let nock = require('nock');

module.exports.hash = "9898d73f1792f47eaa7bbe2aca4c97b3";

module.exports.testInfo = {"uniqueName":{"share":"share167749054239201093","dir":"dir167749054268802938"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054239201093')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:42 GMT',
  'ETag',
  '"0x8DB18A5FEDFBEE8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb30b-101a-0070-5f8e-4a9c5e000000',
  'x-ms-client-request-id',
  'cef60d5f-ca23-436a-ab20-6194feec4561',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054239201093/dir167749054268802938')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:43 GMT',
  'ETag',
  '"0x8DB18A5FF0DF95E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb30e-101a-0070-608e-4a9c5e000000',
  'x-ms-client-request-id',
  '9c52155c-3fd4-46df-8c44-108f3f42ab5c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:43.0833502Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:43.0833502Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:43.0833502Z',
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
  'Mon, 27 Feb 2023 09:35:42 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749054239201093/dir167749054268802938')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb30f-101a-0070-618e-4a9c5e000000',
  'x-ms-client-request-id',
  'fbd47e4e-0a05-4f84-b22e-7cc273c32052',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Mon, 27 Feb 2023 09:35:43 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749054239201093')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb312-101a-0070-648e-4a9c5e000000',
  'x-ms-client-request-id',
  '7b88b6c2-e6a4-4a92-8514-b88701fc980f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:43 GMT'
]);
