let nock = require('nock');

module.exports.testInfo = {"container":"container156776209468002060","blob":"blob156776209507802246","blockblob":"blockblob156776209547204001","undefined":"2019-09-06T09:28:15.871Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209468002060')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:14 GMT',
  'ETag',
  '"0x8D732AC8B574DFB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd7d9813c-d01e-0039-4395-640c9f000000',
  'x-ms-client-request-id',
  'c8c08231-c452-4797-99d2-4fefc78308b9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209468002060/blob156776209507802246')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'ETag',
  '"0x8D732AC8B9331BB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cbaa0b0-901e-00ae-0b95-645a92000000',
  'x-ms-client-request-id',
  'b3c1add0-fe81-4988-8782-3be29cde98a6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209468002060/blockblob156776209547204001', "Hello World!")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'ETag',
  '"0x8D732AC8BCFFB7C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19a268ca-701e-00c4-6495-6482ba000000',
  'x-ms-client-request-id',
  '508377a1-fe05-4c98-83db-2df92d041535',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209468002060/blob156776209507802246', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'ETag',
  '"0x8D732AC8C0CEC67"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25d8b241-301e-014c-5295-6499be000000',
  'x-ms-client-request-id',
  'f0a46f95-9659-41af-9e13-eb9b77586614',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209468002060/blob156776209507802246')
  .query(true)
  .reply(201, "", [ 'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'ETag',
  '"0x8D732AC8C51CE6E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-blob-append-offset',
  '12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b88bbb96-201e-0084-0695-648582000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a777a232-1bf8-4365-8d10-28bd42a6f190',
  'Date',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776209468002060/blob156776209507802246')
  .reply(200, "Hello World!Hello World!", [ 'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC8C51CE6E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '771c7757-401e-0066-5295-64b8a3000000',
  'x-ms-client-request-id',
  '57fe0df7-c95b-4567-8bb5-d85f60b697b9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:28:15 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776209468002060')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '058eb626-501e-006a-4795-642fab000000',
  'x-ms-client-request-id',
  'c5f891ec-c874-4da9-9e10-f68f1fc20884',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:16 GMT',
  'Connection',
  'close' ]);

