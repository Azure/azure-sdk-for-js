let nock = require('nock');

module.exports.testInfo = {"1share-with-dash":"1share-with-dash156767546706905738","dir":"dir156767546706908324"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156767546706905738')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:27 GMT',
  'ETag',
  '"0x8D731E2D93D3C04"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd47214-a01a-00c7-2ccb-6363de000000',
  'x-ms-client-request-id',
  'a7b95b72-62a5-465a-9fa7-83721a8dce29',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 05 Sep 2019 09:24:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1share-with-dash156767546706905738/dir156767546706908324')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 05 Sep 2019 09:24:27 GMT',
  'ETag',
  '"0x8D731E2D97A7442"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b25ad98-e01a-00e9-67cb-6331c9000000',
  'x-ms-client-request-id',
  '10d410f6-701c-4ac4-9f42-d60de94f8390',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-05T09:24:27.7265474Z',
  'x-ms-file-last-write-time',
  '2019-09-05T09:24:27.7265474Z',
  'x-ms-file-creation-time',
  '2019-09-05T09:24:27.7265474Z',
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
  'Thu, 05 Sep 2019 09:24:26 GMT',
  'Connection',
  'close' ]);

