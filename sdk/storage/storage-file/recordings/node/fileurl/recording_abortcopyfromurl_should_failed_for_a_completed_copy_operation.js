let nock = require('nock');

module.exports.testInfo = {"share":"share156767539768507802","dir":"dir156767539810109763","file":"file156767539850303280","copiedfile":"copiedfile156767539890702025"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539768507802')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:17 GMT',
  'ETag',
  '"0x8D731E2AFE3EEC9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc6b3ece-101a-00c2-39cb-63b105000000',
  'x-ms-client-request-id',
  '8d02578d-2b49-4dc7-af27-13446afe2446',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539768507802/dir156767539810109763')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:18 GMT',
  'ETag',
  '"0x8D731E2B02214B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb698294-101a-00a0-14cb-637322000000',
  'x-ms-client-request-id',
  '8d13d7c9-5892-452f-84f4-4648c2706b4e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:18.3607992Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:18.3607992Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:18.3607992Z',
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
  'Thu, 05 Sep 2019 09:23:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539768507802/dir156767539810109763/file156767539850303280')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:18 GMT',
  'ETag',
  '"0x8D731E2B05FF009"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e9c799-d01a-00af-33cb-63054e000000',
  'x-ms-client-request-id',
  'ced9c9b8-ec25-4a6c-8349-c002e80fd4db',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:23:18.7661833Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:23:18.7661833Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:23:18.7661833Z',
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
  'Thu, 05 Sep 2019 09:23:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539768507802/dir156767539810109763/copiedfile156767539890702025')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:23:19 GMT',
  'ETag',
  '"0x8D731E2B0B130FC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2b3d45e-101a-0019-6bcb-637738000000',
  'x-ms-client-request-id',
  '3c321d1c-83df-4785-87df-7b920ddff9b2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-copy-id',
  'ecac3a21-43c9-4604-adcb-2fa4b4954f03',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 05 Sep 2019 09:23:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156767539768507802/dir156767539810109763/copiedfile156767539890702025')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:3fe45305-401a-0134-5fcb-633a46000000\nTime:2019-09-05T09:23:20.7038165Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fe45305-401a-0134-5fcb-633a46000000',
  'x-ms-client-request-id',
  '3ca72c19-74fd-40df-bfa8-db851b3fc55d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 05 Sep 2019 09:23:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156767539768507802')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0f3e87ac-401a-0049-48cb-63b568000000',
  'x-ms-client-request-id',
  'b20c19ff-459c-4ca1-ad00-2744c8775bad',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:23:20 GMT',
  'Connection',
  'close' ]);

