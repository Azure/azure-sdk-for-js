let nock = require('nock');

module.exports.testInfo = {"share":"share156758480029405638","dir":"dir156758480073101589","file":"file156758480113709967"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480029405638')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:20 GMT',
  'ETag',
  '"0x8D7310FBFA0BC3D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45e3d4b4-701a-00d4-6ef8-6247d2000000',
  'x-ms-client-request-id',
  '10fe774f-7593-40e3-89b8-db5bea310579',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480029405638/dir156758480073101589')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:20 GMT',
  'ETag',
  '"0x8D7310FBFE10242"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9664223-d01a-0064-21f8-62061b000000',
  'x-ms-client-request-id',
  '58a51596-e9aa-4253-a0ef-826ef9b69ca0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:20.9679426Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:20.9679426Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:20.9679426Z',
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
  'Wed, 04 Sep 2019 08:13:20 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480029405638/dir156758480073101589/file156758480113709967')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:21 GMT',
  'ETag',
  '"0x8D7310FC01E412A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c448299-a01a-001c-55f8-62a5e3000000',
  'x-ms-client-request-id',
  '6338556b-3874-4b07-85f1-0d2f138cd2b6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:21.3693226Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:21.3693226Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:21.3693226Z',
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
  'Wed, 04 Sep 2019 08:13:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758480029405638/dir156758480073101589/file156758480113709967')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17abd9ed-b01a-00db-41f8-6231be000000',
  'x-ms-client-request-id',
  '8f9b85fa-ec51-4026-8e68-7a431eb3b11c',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:21 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758480029405638')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ff434aa-701a-0089-33f8-624d56000000',
  'x-ms-client-request-id',
  '868c85a0-8e6f-405a-8c49-47c73a7052b2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:21 GMT',
  'Connection',
  'close' ]);

