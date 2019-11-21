let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376645520704806","dir":"dir157376645555300411","file":"file157376645589706134"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376645520704806')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:20:55 GMT',
  'ETag',
  '"0x8D769488920DDB0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '861373b1-c01a-002f-5431-9be7c6000000',
  'x-ms-client-request-id',
  'd0b40b81-793d-4be2-83ef-2ce2126e715d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:20:54 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376645520704806/dir157376645555300411')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:20:55 GMT',
  'ETag',
  '"0x8D7694889543C59"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f52b6b1-801a-000a-4531-9b7f75000000',
  'x-ms-client-request-id',
  '88555939-9855-41a5-9637-80cc78e29044',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:20:55.8775385Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:20:55.8775385Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:20:55.8775385Z',
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
  'Thu, 14 Nov 2019 21:20:55 GMT' ]);
