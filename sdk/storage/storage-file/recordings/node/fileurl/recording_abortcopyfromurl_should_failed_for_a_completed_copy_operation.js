let nock = require('nock');

module.exports.testInfo = {"share":"share156758476870403307","dir":"dir156758476911208733","file":"file156758476951906145","copiedfile":"copiedfile156758476993405197"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476870403307')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:48 GMT',
  'ETag',
  '"0x8D7310FACCA5584"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6de82b6e-501a-00c3-01f8-62eed9000000',
  'x-ms-client-request-id',
  'b794f839-a739-4042-8f76-b77d92bfcb45',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476870403307/dir156758476911208733')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:49 GMT',
  'ETag',
  '"0x8D7310FAD085691"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a943136-801a-00ff-66f8-62c71e000000',
  'x-ms-client-request-id',
  'a43f6fb5-1e1f-4c57-943f-914446583efe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:49.3489809Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:49.3489809Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:49.3489809Z',
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
  'Wed, 04 Sep 2019 08:12:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476870403307/dir156758476911208733/file156758476951906145')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:49 GMT',
  'ETag',
  '"0x8D7310FAD474392"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7dd3aea2-a01a-013c-22f8-622049000000',
  'x-ms-client-request-id',
  '574bab39-d852-41ef-bd13-371c6584e0ee',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:12:49.7613714Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:12:49.7613714Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:12:49.7613714Z',
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
  'Wed, 04 Sep 2019 08:12:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476870403307/dir156758476911208733/copiedfile156758476993405197')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:12:50 GMT',
  'ETag',
  '"0x8D7310FADA72E17"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ad8a1dc-401a-0066-1cf8-62b8a3000000',
  'x-ms-client-request-id',
  '8518377c-22e9-4085-9fcc-e549df92f2cb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  '49e37204-506a-4581-a95f-cd7e457588a0',
  'x-ms-copy-status',
  'success',
  'Date',
  'Wed, 04 Sep 2019 08:12:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758476870403307/dir156758476911208733/copiedfile156758476993405197')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:9a00af12-201a-0150-21f8-62cbde000000\nTime:2019-09-04T08:12:51.8303026Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a00af12-201a-0150-21f8-62cbde000000',
  'x-ms-client-request-id',
  '42b96e8c-0189-44e0-8896-13fb8d1c2e70',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Wed, 04 Sep 2019 08:12:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758476870403307')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3318d79a-e01a-008b-5df8-62f3ee000000',
  'x-ms-client-request-id',
  '76b1a66d-68db-4e8c-95a9-5bf22c233ea4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:12:51 GMT',
  'Connection',
  'close' ]);

