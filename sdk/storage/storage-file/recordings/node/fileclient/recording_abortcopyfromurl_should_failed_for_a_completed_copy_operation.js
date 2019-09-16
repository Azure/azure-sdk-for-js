let nock = require('nock');

module.exports.testInfo = {"share":"share156816837881407855","dir":"dir156816837923700760","file":"file156816837977500155","copiedfile":"copiedfile156816838032308996"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837881407855')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:39 GMT',
  'ETag',
  '"0x8D7365E7F972CA6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a9f1deda-101a-000f-6647-688b0a000000',
  'x-ms-client-request-id',
  'bf72ada8-2650-4295-9d72-72a763774da8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:38 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837881407855/dir156816837923700760')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:39 GMT',
  'ETag',
  '"0x8D7365E7FE4894F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4704f7f-f01a-000e-6f47-688af7000000',
  'x-ms-client-request-id',
  'e7f41db5-6ff2-4e6a-b8b1-8fd5880a61fe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:39.6724047Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:39.6724047Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:39.6724047Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:38 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837881407855/dir156816837923700760/file156816837977500155')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:40 GMT',
  'ETag',
  '"0x8D7365E8039E4C5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03795ae8-401a-003e-6b47-68d0dd000000',
  'x-ms-client-request-id',
  '3004b519-c209-4e79-962d-2fa9b91566eb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:40.2318021Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:40.2318021Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:40.2318021Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:39 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837881407855/dir156816837923700760/copiedfile156816838032308996')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:40 GMT',
  'ETag',
  '"0x8D7365E80A42B9C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '450670a4-f01a-004a-4647-68569b000000',
  'x-ms-client-request-id',
  '6e7bd58b-9b1b-4be1-91cd-f5fb9cabc36b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '65870c1a-0ef8-47a3-8d7b-4cb5bbd0495f',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 11 Sep 2019 02:19:40 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837881407855/dir156816837923700760/copiedfile156816838032308996')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:a01b40ee-901a-0051-2947-687809000000\nTime:2019-09-11T02:19:42.3941418Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01b40ee-901a-0051-2947-687809000000',
  'x-ms-client-request-id',
  'fbae4276-69a0-4d7e-925f-5024cb4736ed',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Wed, 11 Sep 2019 02:19:41 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816837881407855')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42858a7e-101a-0004-2047-68937e000000',
  'x-ms-client-request-id',
  'b79611d9-12ee-4a62-b418-7c9b089b4723',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:42 GMT' ]);

