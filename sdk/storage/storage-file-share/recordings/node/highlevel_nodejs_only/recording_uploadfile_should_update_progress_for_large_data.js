let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646717302840","dir":"dir157376646750906793","file":"file157376646785807072"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646717302840')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:07 GMT',
  'ETag',
  '"0x8D76948904111B9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16d80a50-c01a-0042-2c31-9b4de8000000',
  'x-ms-client-request-id',
  '41ee2d2b-0063-45c9-8553-effcc988f634',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:07 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646717302840/dir157376646750906793')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:07 GMT',
  'ETag',
  '"0x8D769489074F58B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1a2d0629-a01a-0016-1031-9ba762000000',
  'x-ms-client-request-id',
  'd33474cf-31aa-4cb2-abe8-ca5a3d0b7872',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:07.8360459Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:07.8360459Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:07.8360459Z',
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
  'Thu, 14 Nov 2019 21:21:07 GMT' ]);
