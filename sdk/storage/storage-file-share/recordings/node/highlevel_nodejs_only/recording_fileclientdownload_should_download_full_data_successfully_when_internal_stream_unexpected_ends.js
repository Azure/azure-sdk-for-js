let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647601808366","dir":"dir157376647635807453","file":"file157376647670207836"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647601808366')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:16 GMT',
  'ETag',
  '"0x8D7694895873D7C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a6e5dfd-f01a-004a-5f31-9b569b000000',
  'x-ms-client-request-id',
  'c074b81b-7c32-4ebd-98e2-127004fd5ccf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:15 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647601808366/dir157376647635807453')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:16 GMT',
  'ETag',
  '"0x8D7694895BB8F1D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03e22632-101a-0040-4e31-9b4f12000000',
  'x-ms-client-request-id',
  '05d66776-a936-4a51-beb1-ee7d0fa6e657',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:16.6873373Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:16.6873373Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:16.6873373Z',
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
  'Thu, 14 Nov 2019 21:21:16 GMT' ]);
