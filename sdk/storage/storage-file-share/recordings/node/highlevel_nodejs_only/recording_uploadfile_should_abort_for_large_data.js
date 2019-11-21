let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646572708549","dir":"dir157376646607100514","file":"file157376646641806771"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646572708549')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:06 GMT',
  'ETag',
  '"0x8D769488F6608D4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff38eb52-301a-0018-3031-9b4b69000000',
  'x-ms-client-request-id',
  'abe38c76-2c03-4a9b-ad31-4d824658a1ab',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:05 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646572708549/dir157376646607100514')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:06 GMT',
  'ETag',
  '"0x8D769488F99AFE0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '861373be-c01a-002f-5731-9be7c6000000',
  'x-ms-client-request-id',
  '0a5df7d8-8458-4837-b5f5-f0af2977403f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:06.3990240Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:06.3990240Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:06.3990240Z',
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
