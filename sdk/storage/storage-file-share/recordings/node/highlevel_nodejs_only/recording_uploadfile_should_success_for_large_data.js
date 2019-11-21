let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646416907933","dir":"dir157376646451308266","file":"file157376646503408739"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646416907933')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:04 GMT',
  'ETag',
  '"0x8D769488E7789E1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '74e22115-a01a-003f-7231-9bd120000000',
  'x-ms-client-request-id',
  '71d38742-ac2c-45b6-8ebc-04c79c60f33c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:03 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646416907933/dir157376646451308266')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:04 GMT',
  'ETag',
  '"0x8D769488EC2B0BC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15368362-401a-0058-3931-9b6287000000',
  'x-ms-client-request-id',
  'ee7997c5-959c-4366-be61-5625c8315eb5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:04.9900220Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:04.9900220Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:04.9900220Z',
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
  'Thu, 14 Nov 2019 21:21:04 GMT' ]);
