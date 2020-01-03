let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647030004731","dir":"dir157376647075500078","file":"file157376647109605482"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647030004731')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:10 GMT',
  'ETag',
  '"0x8D76948922D5C08"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19d6602b-901a-001e-5b31-9bbc11000000',
  'x-ms-client-request-id',
  '95ab2088-3bc9-4ed9-b61d-cac8653bdc43',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:10 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647030004731/dir157376647075500078')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:11 GMT',
  'ETag',
  '"0x8D7694892642755"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1536836a-401a-0058-3c31-9b6287000000',
  'x-ms-client-request-id',
  'f2468b3e-f5ac-42f8-825f-7d4e9686745e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:11.0813525Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:11.0813525Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:11.0813525Z',
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
