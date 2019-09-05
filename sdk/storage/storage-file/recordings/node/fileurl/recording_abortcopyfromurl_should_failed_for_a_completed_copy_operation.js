let nock = require('nock');

module.exports.testInfo = {"share":"share156775320185902682","dir":"dir156775320228702052","file":"file156775320268604877","copiedfile":"copiedfile156775320317801738"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775320185902682')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:02 GMT',
  'ETag',
  '"0x8D73297D6CC2FBC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e42a5159-801a-0024-1380-640123000000',
  'x-ms-client-request-id',
  '42390605-397e-4a02-9c16-6c66909c152c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775320185902682/dir156775320228702052')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:02 GMT',
  'ETag',
  '"0x8D73297D70C7027"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd7ac208-401a-0134-7f80-643a46000000',
  'x-ms-client-request-id',
  'ce6e575a-a807-49bc-9c69-a0ca973ba50e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:02.5581607Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:02.5581607Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:02.5581607Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:01 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775320185902682/dir156775320228702052/file156775320268604877')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:03 GMT',
  'ETag',
  '"0x8D73297D756354E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31a3d37d-b01a-00a9-7880-6436f1000000',
  'x-ms-client-request-id',
  'c4776ee6-bbbd-4e7f-ba29-13e15290c3ae',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:03.0416206Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:03.0416206Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:03.0416206Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:02 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775320185902682/dir156775320228702052/copiedfile156775320317801738')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:03 GMT',
  'ETag',
  '"0x8D73297D7B003EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad82b5ba-c01a-0115-4880-641e3d000000',
  'x-ms-client-request-id',
  '05085dbf-2d8c-479e-99a0-b46716ffaeed',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'f46c077b-c576-4eff-8601-ce9480c3372e',
  'x-ms-copy-status',
  'success',
  'Date',
  'Fri, 06 Sep 2019 07:00:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775320185902682/dir156775320228702052/copiedfile156775320317801738')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:3ccfcdbe-d01a-00bf-0e80-64c026000000\nTime:2019-09-06T07:00:05.0702917Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ccfcdbe-d01a-00bf-0e80-64c026000000',
  'x-ms-client-request-id',
  '761aa01f-694a-4b86-a10e-c997664ec740',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Fri, 06 Sep 2019 07:00:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775320185902682')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e96fcbae-a01a-006e-3e80-64a2ac000000',
  'x-ms-client-request-id',
  '60e40387-f967-4a5a-8c79-9bdfeca4f36d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:04 GMT',
  'Connection',
  'close' ]);

