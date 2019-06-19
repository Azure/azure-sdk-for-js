let nock = require('nock');

module.exports.testInfo = {"share":"share156044258580103262","dir":"dir156044258611806680","file":"file156044258639201309","copiedfile":"copiedfile156044258665006306"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258580103262')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:10 GMT',
  'ETag',
  '"0x8D6EFDFC6920B99"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49b81dd5-b01a-00b4-51c8-217693000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258580103262/dir156044258611806680')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:11 GMT',
  'ETag',
  '"0x8D6EFDFC6BEB04E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b8c5191f-601a-00db-36c8-21de47000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258580103262/dir156044258611806680/file156044258639201309')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:11 GMT',
  'ETag',
  '"0x8D6EFDFC6E6FFF1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc685023-101a-003a-30c8-213932000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:16:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258580103262/dir156044258611806680/copiedfile156044258665006306')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:16:13 GMT',
  'ETag',
  '"0x8D6EFDFC84435D9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a200146d-b01a-00d9-1fc8-21dcbd000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-copy-id',
  'e2cad45d-19d5-440e-8fe4-8bff992381cc',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 13 Jun 2019 09:16:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044258580103262/dir156044258611806680/copiedfile156044258665006306')
  .query(true)
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>NoPendingCopyOperation</Code><Message>There is currently no pending copy operation.\nRequestId:74ebc76b-101a-009b-78c8-21f7a9000000\nTime:2019-06-13T09:16:16.6924180Z</Message></Error>", [ 'Content-Length',
  '236',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74ebc76b-101a-009b-78c8-21f7a9000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'NoPendingCopyOperation',
  'Date',
  'Thu, 13 Jun 2019 09:16:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044258580103262')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb1d57df-d01a-00eb-6cc8-21846d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:16:16 GMT',
  'Connection',
  'close' ]);

