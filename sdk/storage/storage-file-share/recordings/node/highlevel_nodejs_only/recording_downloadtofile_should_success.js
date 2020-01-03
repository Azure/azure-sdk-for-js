let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647897506417","dir":"dir157376647948903055","file":"file157376647984004552"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647897506417')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:19 GMT',
  'ETag',
  '"0x8D769489757CF3F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '91222f3e-701a-001f-0531-9bbdec000000',
  'x-ms-client-request-id',
  '57297192-f783-4365-8ddd-6107f55a1d2b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:19 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647897506417/dir157376647948903055')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:19 GMT',
  'ETag',
  '"0x8D76948979A6A3B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f52b6ce-801a-000a-4e31-9b7f75000000',
  'x-ms-client-request-id',
  'cbbe66d7-e7b4-4916-ae3e-4ccf8898b132',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:19.8255675Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:19.8255675Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:19.8255675Z',
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
  'Thu, 14 Nov 2019 21:21:19 GMT' ]);
