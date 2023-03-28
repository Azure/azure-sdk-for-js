let nock = require('nock');

module.exports.hash = "7c0a40971869a5219bc1b4ac05d34e8f";

module.exports.testInfo = {"uniqueName":{"share":"share167749055929009442","dir":"dir167749055958607770","file":"file167749055988509911","copiedfile":"copiedfile167749056018403083"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055929009442')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:59 GMT',
  'ETag',
  '"0x8DB18A608F2522E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb367-101a-0070-238e-4a9c5e000000',
  'x-ms-client-request-id',
  '62282705-3fb1-4d00-bc9f-53aa0b55afa5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055929009442/dir167749055958607770')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:59 GMT',
  'ETag',
  '"0x8DB18A609207357"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb373-101a-0070-248e-4a9c5e000000',
  'x-ms-client-request-id',
  'ce86f591-c855-45a2-ab1a-17bd99af31c1',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:59.9816535Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:59.9816535Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:59.9816535Z',
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
  'Mon, 27 Feb 2023 09:35:59 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055929009442/dir167749055958607770/file167749055988509911')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:00 GMT',
  'ETag',
  '"0x8DB18A6094E0C5B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb374-101a-0070-258e-4a9c5e000000',
  'x-ms-client-request-id',
  '14233c5e-49af-4931-b9ed-753375b2add8',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:00.2804827Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:00.2804827Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:00.2804827Z',
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
  'Mon, 27 Feb 2023 09:36:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055929009442/dir167749055958607770/copiedfile167749056018403083')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:00 GMT',
  'ETag',
  '"0x8DB18A6097ED92F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb379-101a-0070-268e-4a9c5e000000',
  'x-ms-client-request-id',
  '35f04b48-2ec6-4815-9c7f-52db74c9c580',
  'x-ms-version',
  '2022-11-02',
  'x-ms-copy-id',
  '8e1b2d90-a5e7-4faf-8748-8e679dee4963',
  'x-ms-copy-status',
  'success',
  'Date',
  'Mon, 27 Feb 2023 09:36:00 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055929009442/dir167749055958607770/copiedfile167749056018403083')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:a17cb37d-101a-0070-298e-4a9c5e000000\nTime:2023-02-27T09:36:01.9751096Z</Message></Error>", [
  'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb37d-101a-0070-298e-4a9c5e000000',
  'x-ms-client-request-id',
  '10407dd2-9714-417e-8210-ce26f704e3aa',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Mon, 27 Feb 2023 09:36:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055929009442')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb37e-101a-0070-2a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'd71b56dd-1755-4306-9100-4a58129134e1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:02 GMT'
]);
