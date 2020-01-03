let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646786108477","dir":"dir157376646830007064","file":"file157376646866508124"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646786108477')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:08 GMT',
  'ETag',
  '"0x8D7694890B70004"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc3991aa-f01a-0041-7f31-9b4eef000000',
  'x-ms-client-request-id',
  '42e975b6-b729-46f7-86e5-1d195366f9b1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:07 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646786108477/dir157376646830007064')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:08 GMT',
  'ETag',
  '"0x8D7694890F0A4A8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fc9425d6-a01a-0052-2631-9b7b0e000000',
  'x-ms-client-request-id',
  '0f9779bb-025a-4e8b-b60d-dd4348075699',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:08.6466216Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:08.6466216Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:08.6466216Z',
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
  'Thu, 14 Nov 2019 21:21:08 GMT' ]);
