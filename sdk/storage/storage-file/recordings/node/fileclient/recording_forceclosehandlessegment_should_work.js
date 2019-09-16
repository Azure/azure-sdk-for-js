let nock = require('nock');

module.exports.testInfo = {"share":"share156816841410200564","dir":"dir156816841451902830","file":"file156816841494301488"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841410200564')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:14 GMT',
  'ETag',
  '"0x8D7365E949EBFD3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a7852f9-c01a-002f-6c47-68e7c6000000',
  'x-ms-client-request-id',
  '1b187d18-e81c-459a-9b1a-cc7a5555c79f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:13 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841410200564/dir156816841451902830')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:14 GMT',
  'ETag',
  '"0x8D7365E94DF2C96"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '649135cc-f01a-0005-4d47-689283000000',
  'x-ms-client-request-id',
  '7ea56cea-2923-4808-9f49-2555189ca762',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:14.8694166Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:14.8694166Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:14.8694166Z',
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
  'Wed, 11 Sep 2019 02:20:14 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841410200564/dir156816841451902830/file156816841494301488')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:15 GMT',
  'ETag',
  '"0x8D7365E95208748"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cc75-801a-0023-5f47-680937000000',
  'x-ms-client-request-id',
  'c5560028-e404-4ee9-bc87-f80d6d073229',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:15.2977224Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:15.2977224Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:15.2977224Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841410200564/dir156816841451902830/file156816841494301488')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '861735b6-801a-0001-2747-686701000000',
  'x-ms-client-request-id',
  '7ecb5584-ca04-446f-869f-11bc70146683',
  'x-ms-version',
  '2019-02-02',
  'x-ms-number-of-handles-closed',
  '0',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816841410200564')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6dd1-c01a-0042-6d47-684de8000000',
  'x-ms-client-request-id',
  'e6650e38-23d4-444c-a009-f42de6673395',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:15 GMT' ]);

