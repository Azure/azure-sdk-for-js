let nock = require('nock');

module.exports.testInfo = {"container":"container156776191799706717","blob":"blob156776191840102128"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776191799706717')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:18 GMT',
  'ETag',
  '"0x8D732AC2207A859"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52d77b5f-f01e-0073-6e94-64af10000000',
  'x-ms-client-request-id',
  'a3ff2002-40d7-4ae1-8aba-cfcae1a88fb4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776191799706717/blob156776191840102128', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:25:18 GMT',
  'ETag',
  '"0x8D732AC2246478F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '03f211da-c01e-00a3-3794-649246000000',
  'x-ms-client-request-id',
  'ccd2d86e-c794-45e3-90a8-61cf7d84fa1a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:25:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776191799706717/blob156776191840102128')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b93ab508-f01e-00ca-6595-64ab0a000000',
  'x-ms-client-request-id',
  'cbf28b9b-609d-427a-983c-e14d44e7c706',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Fri, 06 Sep 2019 09:25:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776191799706717')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45c3b5c3-301e-0031-7195-641690000000',
  'x-ms-client-request-id',
  '87915c97-1cf8-4af4-a8d6-5410fecf0a29',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:25:19 GMT',
  'Connection',
  'close' ]);

