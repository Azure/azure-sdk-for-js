let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156816847736706857","dir":"dir156816847736700284"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816847736706857')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:17 GMT',
  'ETag',
  '"0x8D7365EBA530317"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf44a3a0-d01a-0056-4647-688e8c000000',
  'x-ms-client-request-id',
  'c0e79a62-21df-4326-966d-844653517025',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:21:17 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156816847736706857/dir156816847736700284')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:21:18 GMT',
  'ETag',
  '"0x8D7365EBA931CD3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf05ebed-701a-0014-3347-68a598000000',
  'x-ms-client-request-id',
  'ba87c010-7def-4616-b494-e9d3c96fe3e5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:21:18.1243603Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:21:18.1243603Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:21:18.1243603Z',
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
  'Wed, 11 Sep 2019 02:21:18 GMT' ]);

