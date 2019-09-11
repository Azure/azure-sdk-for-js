let nock = require('nock');

module.exports.testInfo = {"share":"share156816841623701445","dir":"dir156816841666206643","file":"file156816841708600509"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841623701445')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:16 GMT',
  'ETag',
  '"0x8D7365E95E5E8D8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b051f5-101a-004b-0647-685766000000',
  'x-ms-client-request-id',
  'c52748a2-22ca-485f-8318-5c6eea12ae97',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:16 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841623701445/dir156816841666206643')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:17 GMT',
  'ETag',
  '"0x8D7365E96263FFA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc92af-601a-004f-7447-68a2e4000000',
  'x-ms-client-request-id',
  '7db6cfc8-0231-42d9-b4a9-f495955f7bfb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:17.0129402Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:17.0129402Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:17.0129402Z',
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
  'Wed, 11 Sep 2019 02:20:16 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841623701445/dir156816841666206643/file156816841708600509')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:17 GMT',
  'ETag',
  '"0x8D7365E96677393"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f431ea8e-201a-006a-6f47-683a57000000',
  'x-ms-client-request-id',
  '53baebc1-54a2-43a3-99d3-fafe37f0295c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:17.4402451Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:17.4402451Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:17.4402451Z',
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
  'Wed, 11 Sep 2019 02:20:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816841623701445/dir156816841666206643/file156816841708600509')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2e833a3a-b01a-0002-2247-686406000000',
  'x-ms-client-request-id',
  'b1bfeb53-481b-44ec-8454-59c825046107',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816841623701445')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '97b87c11-201a-0025-0647-68fe4f000000',
  'x-ms-client-request-id',
  '93f49a0c-8fe4-45b9-8892-4ca2b8d9c461',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:17 GMT' ]);

