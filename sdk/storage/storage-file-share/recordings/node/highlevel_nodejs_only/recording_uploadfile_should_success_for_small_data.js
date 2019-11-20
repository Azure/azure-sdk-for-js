let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646504101000","dir":"dir157376646538104426","file":"file157376646572201264"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646504101000')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:05 GMT',
  'ETag',
  '"0x8D769488EFC577B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b9c4913b-201a-000c-6b31-9b880d000000',
  'x-ms-client-request-id',
  '21509075-69c6-4666-804b-025824864ae8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:05 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646504101000/dir157376646538104426')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:05 GMT',
  'ETag',
  '"0x8D769488F30055C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '529f9b89-001a-0039-5931-9b2658000000',
  'x-ms-client-request-id',
  'dd4864c5-dcb9-4fc1-980c-714ddfb56250',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:05.7065308Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:05.7065308Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:05.7065308Z',
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
  'Thu, 14 Nov 2019 21:21:05 GMT' ]);
