let nock = require('nock');

module.exports.testInfo = {"share":"share156874146595505350","dir":"dir156874146640309836"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156874146595505350')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 17 Sep 2019 17:31:05 GMT',
  'ETag',
  '"0x8D73B94D1F2A754"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd8a603a-301a-0094-0e7d-6d50b8000000',
  'x-ms-client-request-id',
  'faa21ea1-6582-476c-aea4-3138a3587106',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 17 Sep 2019 17:31:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156874146595505350/dir156874146640309836')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 17 Sep 2019 17:31:06 GMT',
  'ETag',
  '"0x8D73B94D223E34B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e38c1f0-901a-005e-477d-6dc375000000',
  'x-ms-client-request-id',
  'be2ab265-67d2-48e9-8a6d-64d6457fe217',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-17T17:31:06.2980427Z',
  'x-ms-file-last-write-time',
  '2019-09-17T17:31:06.2980427Z',
  'x-ms-file-creation-time',
  '2019-09-17T17:31:06.2980427Z',
  'x-ms-file-permission-key',
  '15246684120248489204*13496228697838683005',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 17 Sep 2019 17:31:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156830612406803206/dir156830612568607181')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7ae875a4-e01a-00d9-637d-6d965a000000',
  'x-ms-client-request-id',
  'bc8ea878-a50f-401d-b326-a26813ec5fd8',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 17 Sep 2019 17:31:06 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156874146595505350')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd31cdd80-401a-007e-027d-6dafb9000000',
  'x-ms-client-request-id',
  '2a48d8e8-82a3-444a-9976-2e866be27006',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 17 Sep 2019 17:31:08 GMT' ]);

