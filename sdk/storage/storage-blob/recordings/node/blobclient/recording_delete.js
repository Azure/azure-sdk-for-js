let nock = require('nock');

module.exports.testInfo = {"container":"container156816830532709343","blob":"blob156816830574501528"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816830532709343')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:25 GMT',
  'ETag',
  '"0x8D7365E53C94AAE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf7f440-501e-0047-3e47-68b997000000',
  'x-ms-client-request-id',
  '7d8a8c97-f44a-4abc-97dc-c7f6b4ec1d7c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816830532709343/blob156816830574501528', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:26 GMT',
  'ETag',
  '"0x8D7365E5408F434"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '331c7a8b-c01e-000d-1d47-6889f0000000',
  'x-ms-client-request-id',
  '6d8de235-f71c-4daa-a45b-6c0b140aa22b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816830532709343/blob156816830574501528')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7cc93f54-d01e-0012-3d47-6852e0000000',
  'x-ms-client-request-id',
  '8f47a610-4409-4c99-84c0-6267a6931161',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:18:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816830532709343')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7415226d-001e-0054-7a47-688c76000000',
  'x-ms-client-request-id',
  'e1423636-d507-40dc-90bf-8fc546aea677',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);

