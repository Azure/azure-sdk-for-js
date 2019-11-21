let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646866903051","dir":"dir157376646901708430","file":"file157376646959105660"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646866903051')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:09 GMT',
  'ETag',
  '"0x8D7694891272EE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc4d6355-001a-001b-2b31-9b486e000000',
  'x-ms-client-request-id',
  '53b69ebb-c86c-44ad-9148-48443b5fe516',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:08 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646866903051/dir157376646901708430')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:09 GMT',
  'ETag',
  '"0x8D769489178B21C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec0d2648-801a-0001-1331-9b6701000000',
  'x-ms-client-request-id',
  '8f02b75c-066b-4c5d-a62b-8fd40c4dfa96',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:09.5382556Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:09.5382556Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:09.5382556Z',
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
  'Thu, 14 Nov 2019 21:21:09 GMT' ]);
