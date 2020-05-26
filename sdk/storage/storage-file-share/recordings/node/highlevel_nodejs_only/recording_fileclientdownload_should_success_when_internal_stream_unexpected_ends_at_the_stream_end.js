let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647519601366","dir":"dir157376647565000075","file":"file157376647601409412"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647519601366')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:15 GMT',
  'ETag',
  '"0x8D76948951832EF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bb095d5-e01a-0033-2431-9b3fd1000000',
  'x-ms-client-request-id',
  '7e3fec97-6e29-4e07-8d6d-998035f841f4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:15 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647519601366/dir157376647565000075')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:15 GMT',
  'ETag',
  '"0x8D7694895505DB7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0604cfb2-001a-0010-3431-9b501a000000',
  'x-ms-client-request-id',
  '37186e09-9215-47c7-a0ef-ae7253f53cbe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:15.9848375Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:15.9848375Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:15.9848375Z',
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
  'Thu, 14 Nov 2019 21:21:15 GMT' ]);
