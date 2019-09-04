let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156758484024707760","dir":"dir156758484024801012"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156758484024707760')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'ETag',
  '"0x8D7310FD7718C19"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17abda15-b01a-00db-4bf8-6231be000000',
  'x-ms-client-request-id',
  '30336ce1-1867-43ed-a8dc-d1e53cd8525c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156758484024707760/dir156758484024801012')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'ETag',
  '"0x8D7310FD7B2DBC2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fe694910-f01a-0063-5df8-626a78000000',
  'x-ms-client-request-id',
  '9050a520-8302-43d7-9eb1-060c37a1e87c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-04T08:14:00.9308098Z',
  'x-ms-file-last-write-time',
  '2019-09-04T08:14:00.9308098Z',
  'x-ms-file-creation-time',
  '2019-09-04T08:14:00.9308098Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 04 Sep 2019 08:14:00 GMT',
  'Connection',
  'close' ]);

