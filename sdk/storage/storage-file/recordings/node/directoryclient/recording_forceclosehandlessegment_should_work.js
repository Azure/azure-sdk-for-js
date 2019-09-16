let nock = require('nock');

module.exports.testInfo = {"share":"share156816834771104827","dir":"dir156816834812502359"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834771104827')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:08 GMT',
  'ETag',
  '"0x8D7365E6D0C39C5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab525441-501a-0008-4f47-687d8f000000',
  'x-ms-client-request-id',
  'd5f5e995-2059-4442-9a49-d79ae07a420a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834771104827/dir156816834812502359')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:08 GMT',
  'ETag',
  '"0x8D7365E6D59A9D4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '42858a4f-101a-0004-1947-68937e000000',
  'x-ms-client-request-id',
  '9924bcec-9987-4581-b3fe-8b7abe0ce20f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:08.5632980Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:08.5632980Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:08.5632980Z',
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
  'Wed, 11 Sep 2019 02:19:08 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816834771104827/dir156816834812502359')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6d78-c01a-0042-5947-684de8000000',
  'x-ms-client-request-id',
  '4ea073ae-4eeb-4dac-b778-0ef92801305b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 11 Sep 2019 02:19:08 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816834771104827')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'af2827cc-f01a-0063-6947-6820d9000000',
  'x-ms-client-request-id',
  'adae5b22-38db-4e38-a092-af6033152c9c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:09 GMT' ]);

