let nock = require('nock');

module.exports.testInfo = {"share":"share156758480448007543","dir":"dir156758480492304300","file":"file156758480533109084"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480448007543')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:24 GMT',
  'ETag',
  '"0x8D7310FC2203DC0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc0a5e21-201a-004f-46f8-6286d7000000',
  'x-ms-client-request-id',
  'cff298df-ab3c-4ab7-af34-9a84b6be47e2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480448007543/dir156758480492304300')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:25 GMT',
  'ETag',
  '"0x8D7310FC260F574"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fae1c5fb-901a-0075-33f8-629caf000000',
  'x-ms-client-request-id',
  '2fa1688b-22c2-4a32-962c-9856368cdd77',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:25.1619188Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:25.1619188Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:25.1619188Z',
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
  'Wed, 04 Sep 2019 08:13:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758480448007543/dir156758480492304300/file156758480533109084')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:25 GMT',
  'ETag',
  '"0x8D7310FC2A3DB13"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de53d0bc-d01a-0109-69f8-624c5d000000',
  'x-ms-client-request-id',
  '6a1abf2e-aaf1-4e57-b2fc-839a58f84fd3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:13:25.6003347Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:13:25.6003347Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:13:25.6003347Z',
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
  'Wed, 04 Sep 2019 08:13:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156758480448007543/dir156758480492304300/file156758480533109084')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8674fa08-a01a-0051-6ff8-626a0f000000',
  'x-ms-client-request-id',
  '6d590559-a8e0-49bc-8a51-f5529a997ea8',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:25 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758480448007543')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c4aa6ec0-001a-0048-0af8-62eab4000000',
  'x-ms-client-request-id',
  '318eb3eb-0ede-4c48-bdbe-335b71591640',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:25 GMT',
  'Connection',
  'close' ]);

