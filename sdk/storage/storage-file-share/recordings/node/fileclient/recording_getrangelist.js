let nock = require('nock');

module.exports.testInfo = {"share":"share156816839805304872","dir":"dir156816839848202460","file":"file156816839891307893"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:58 GMT',
  'ETag',
  '"0x8D7365E8B0FAC11"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e1ba6de-001a-0010-1b47-68501a000000',
  'x-ms-client-request-id',
  '1a1557ed-7ec3-4e6f-8ff6-0d97b19eba03',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872/dir156816839848202460')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:58 GMT',
  'ETag',
  '"0x8D7365E8B5084F1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9158b764-f01a-0027-7547-68fcb5000000',
  'x-ms-client-request-id',
  '68d37476-e36e-4dc9-b1eb-2c8d2f614026',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:58.8350193Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:58.8350193Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:58.8350193Z',
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
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872/dir156816839848202460/file156816839891307893')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:59 GMT',
  'ETag',
  '"0x8D7365E8B911C20"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5fbd1d58-c01a-0049-0947-68559c000000',
  'x-ms-client-request-id',
  'f134db68-aa1b-4e69-88ed-c7cd07863432',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:59.2583200Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:59.2583200Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:59.2583200Z',
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
  'Wed, 11 Sep 2019 02:19:58 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872/dir156816839848202460/file156816839891307893', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:59 GMT',
  'ETag',
  '"0x8D7365E8BD24FB4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45dc1b56-401a-0017-7647-68a69f000000',
  'x-ms-client-request-id',
  '2af29291-d07f-4c20-a051-ebdf443bf6f8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872/dir156816839848202460/file156816839891307893', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:00 GMT',
  'ETag',
  '"0x8D7365E8C12BFC9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9e4a1fe9-101a-0069-5947-683950000000',
  'x-ms-client-request-id',
  'b85164ad-8db9-4f73-b0f7-0702017ab5ac',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:59 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816839805304872/dir156816839848202460/file156816839891307893')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:00 GMT',
  'ETag',
  '"0x8D7365E8C57283C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388cf680-a01a-0034-7347-68c954000000',
  'x-ms-client-request-id',
  '85e0eb4e-b25c-4c82-a3d8-c29950a16079',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816839805304872/dir156816839848202460/file156816839891307893')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:00 GMT',
  'ETag',
  '"0x8D7365E8C57283C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7d8510c2-301a-005c-1547-689705000000',
  'x-ms-client-request-id',
  '821fec26-269d-4378-aa9c-f363bf0c1f5d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:00 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816839805304872')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70bc081f-601a-0066-6a47-68d4a6000000',
  'x-ms-client-request-id',
  '749a08d4-0f76-4edc-b6b7-c5d85656496e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);

