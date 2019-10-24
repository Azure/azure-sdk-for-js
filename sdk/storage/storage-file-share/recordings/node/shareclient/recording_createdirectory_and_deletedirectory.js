let nock = require('nock');

module.exports.testInfo = {"share":"share156816846547209478","directory":"directory156816846588004470"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816846547209478')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:05 GMT',
  'ETag',
  '"0x8D7365EB33BA8B0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e71ce533-001a-0039-4547-682658000000',
  'x-ms-client-request-id',
  '9319b1fd-7c55-448e-9c7e-9d668dc0812e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816846547209478/directory156816846588004470')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:06 GMT',
  'ETag',
  '"0x8D7365EB37C9F3A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af282862-f01a-0063-0847-6820d9000000',
  'x-ms-client-request-id',
  '574c96b8-3e15-40c7-bb15-c747bcf308a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:06.2329146Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:06.2329146Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:06.2329146Z',
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
  'Wed, 11 Sep 2019 02:21:05 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816846547209478/directory156816846588004470')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:06 GMT',
  'ETag',
  '"0x8D7365EB37C9F3A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '388cf6d5-a01a-0034-0647-68c954000000',
  'x-ms-client-request-id',
  '478a6739-0ee1-4532-93d3-3c1754fc3e00',
  'x-ms-version',
  '2019-02-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-meta-key',
  'value',
  'x-ms-file-change-time',
  '2019-09-11T02:21:06.2329146Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:06.2329146Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:06.2329146Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-meta-key,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:06 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816846547209478/directory156816846588004470')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70bc0877-601a-0066-7e47-68d4a6000000',
  'x-ms-client-request-id',
  '3c39ff22-0f65-4dff-8bd6-195ffd1c831c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:06 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816846547209478/directory156816846588004470')
  .query(true)
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:b3b05238-101a-004b-1347-685766000000\nTime:2019-09-11T02:21:07.4806639Z</Message></Error>", [ 'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3b05238-101a-004b-1347-685766000000',
  'x-ms-client-request-id',
  'cb0cf3d4-5444-4bb3-9ade-1da014ede5a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816846547209478')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18c67-b01a-0064-1d47-68d65c000000',
  'x-ms-client-request-id',
  '8f66330d-5dcb-4bff-85e0-eebfdd64b555',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:07 GMT' ]);

