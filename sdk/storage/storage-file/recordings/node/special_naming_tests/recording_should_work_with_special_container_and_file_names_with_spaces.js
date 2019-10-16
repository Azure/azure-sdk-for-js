let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156816847819903897"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816847736706857/dir156816847736700284/file%20empty156816847819903897')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:18 GMT',
  'ETag',
  '"0x8D7365EBAD22D1F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8c4b231-b01a-004d-2147-68a01e000000',
  'x-ms-client-request-id',
  '8154052d-08ad-4884-87ba-ea27d5d14310',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:18.5376543Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:18.5376543Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:18.5376543Z',
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
  'Wed, 11 Sep 2019 02:21:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156816847736706857/dir156816847736700284')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156816847736706857\" DirectoryPath=\"dir156816847736700284\"><Prefix>file empty156816847819903897</Prefix><Entries><File><Name>file empty156816847819903897</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b759b89-a01a-0016-6747-68a762000000',
  'x-ms-client-request-id',
  'e3f094b2-7fd5-41a2-88d4-2a8c09fe4ab7',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:18 GMT' ]);

