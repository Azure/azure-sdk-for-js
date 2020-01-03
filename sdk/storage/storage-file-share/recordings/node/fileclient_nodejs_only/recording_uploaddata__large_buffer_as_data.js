let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157428701769707216","dir":"dir157428701775303477","file":"file157428701780507159"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701769707216')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E04906013F7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b475cafc-001a-0068-14ed-9f19cf000000',
  'x-ms-client-request-id',
  'a6babd22-c4a7-41a3-8ac8-6d1ac8f2d3de',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157428701769707216/dir157428701775303477')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 20 Nov 2019 21:56:57 GMT',
  'ETag',
  '"0x8D76E0490686B2E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20c9bd77-b01a-0052-0ced-9f03b7000000',
  'x-ms-client-request-id',
  '199a26f5-a874-42b7-ac54-505e0225e8c8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-20T21:56:57.7901358Z',
  'x-ms-file-last-write-time',
  '2019-11-20T21:56:57.7901358Z',
  'x-ms-file-creation-time',
  '2019-11-20T21:56:57.7901358Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 20 Nov 2019 21:56:57 GMT'
]);
