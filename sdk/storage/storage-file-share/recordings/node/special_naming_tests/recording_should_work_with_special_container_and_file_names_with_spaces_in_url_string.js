let nock = require('nock');

module.exports.testInfo = {"file empty":"file empty156816847902403119"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816847736706857/dir156816847736700284/file%20empty156816847902403119')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:19 GMT',
  'ETag',
  '"0x8D7365EBB509BE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a744778f-301a-0031-1847-683d2b000000',
  'x-ms-client-request-id',
  '51f18dc2-dced-407a-a4e1-6564be78461d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:19.3662433Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:19.3662433Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:19.3662433Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835163608398430208',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:21:18 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1share-with-dash156816847736706857/dir156816847736700284')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\" ShareName=\"1share-with-dash156816847736706857\" DirectoryPath=\"dir156816847736700284\"><Prefix>file empty156816847902403119</Prefix><Entries><File><Name>file empty156816847902403119</Name><Properties><Content-Length>10</Content-Length></Properties></File></Entries><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '076d32ff-b01a-0009-2147-687c72000000',
  'x-ms-client-request-id',
  '8287c755-cd74-45a3-922a-38e81e7f91a1',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:21:19 GMT' ]);

