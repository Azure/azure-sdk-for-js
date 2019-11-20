let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647110003802","dir":"dir157376647144605944","file":"file157376647179407231"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647110003802')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:11 GMT',
  'ETag',
  '"0x8D769489299BF1C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5d1ea96-801a-0067-1131-9bd55b000000',
  'x-ms-client-request-id',
  '16bc71ba-2ccf-4ba2-9c36-dfe7b93c58d4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:10 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647110003802/dir157376647144605944')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:11 GMT',
  'ETag',
  '"0x8D7694892CDAAB6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f179f77-601a-0022-2731-9b08ca000000',
  'x-ms-client-request-id',
  '03cc14bb-36ec-4fd3-9eff-2dce639294ca',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:11.7728438Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:11.7728438Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:11.7728438Z',
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
  'Thu, 14 Nov 2019 21:21:10 GMT' ]);
