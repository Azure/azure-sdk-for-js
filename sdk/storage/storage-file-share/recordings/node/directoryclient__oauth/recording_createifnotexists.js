let nock = require('nock');

module.exports.hash = "70a666ce84f6f904b449d464aa4f099d";

module.exports.testInfo = {"uniqueName":{"share":"share167749052217303346","dir":"dir167749052246808970","dir167749052246808970":"dir167749052246808970167749052308004725"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052217303346')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:22 GMT',
  'ETag',
  '"0x8DB18A5F2D23D32"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb295-101a-0070-158e-4a9c5e000000',
  'x-ms-client-request-id',
  'b97f7e1b-fda2-4cb5-94c5-d40ff21cd9a5',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052217303346/dir167749052246808970')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:22 GMT',
  'ETag',
  '"0x8DB18A5F301323B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb297-101a-0070-168e-4a9c5e000000',
  'x-ms-client-request-id',
  '28953590-26ad-48e2-a773-1f9d8fb843e7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:22.8669499Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:22.8669499Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:22.8669499Z',
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
  'Mon, 27 Feb 2023 09:35:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052217303346/dir167749052246808970')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceAlreadyExists</Code><Message>The specified resource already exists.\nRequestId:a17cb299-101a-0070-178e-4a9c5e000000\nTime:2023-02-27T09:35:23.1638878Z</Message></Error>", [
  'Content-Length',
  '228',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb299-101a-0070-178e-4a9c5e000000',
  'x-ms-client-request-id',
  'a4542831-653f-46fc-9c69-7fde9e9b5fca',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceAlreadyExists',
  'Date',
  'Mon, 27 Feb 2023 09:35:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052217303346/dir167749052246808970167749052308004725')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:23 GMT',
  'ETag',
  '"0x8DB18A5F35E11AC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb29a-101a-0070-188e-4a9c5e000000',
  'x-ms-client-request-id',
  'a4a2e6f6-521c-4c84-9af8-c716eb501ae3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:23.4756012Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:23.4756012Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:23.4756012Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '16140971433240035328',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052217303346/dir167749052246808970167749052308004725')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb29b-101a-0070-198e-4a9c5e000000',
  'x-ms-client-request-id',
  '4c85ede3-9802-4232-ba82-af994e1e7dfb',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052217303346')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb29c-101a-0070-1a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '1d69e555-3da6-40a3-8d18-8ff0b50b468f',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:24 GMT'
]);
