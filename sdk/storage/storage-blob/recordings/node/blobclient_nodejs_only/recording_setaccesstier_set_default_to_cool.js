let nock = require('nock');

module.exports.testInfo = {"container":"container156988646924605907","blob":"blob156988646945001807"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988646924605907')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:29 GMT',
  'ETag',
  '"0x8D745FEBD2D6665"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40622e52-f01e-001a-23e7-775cf4000000',
  'x-ms-client-request-id',
  'c07630bf-83bb-43d1-ba08-490cad2e46ca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988646924605907/blob156988646945001807', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:29 GMT',
  'ETag',
  '"0x8D745FEBD4D0A17"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a73e7dcf-101e-0010-0ae7-77457d000000',
  'x-ms-client-request-id',
  '88259ba1-d505-49fc-b2de-7f81b33c5674',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 30 Sep 2019 23:34:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988646924605907/blob156988646945001807')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6447ff3-401e-010c-14e7-77db3f000000',
  'x-ms-client-request-id',
  '2396740d-5abe-4cd3-8587-84623bcfb054',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988646924605907/blob156988646945001807')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEBD4D0A17"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c428ff4c-e01e-00a4-5de7-77497f000000',
  'x-ms-client-request-id',
  '4f003ef7-7ac7-44f3-a7fc-209daa89d513',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-change-time',
  'Mon, 30 Sep 2019 23:34:29 GMT',
  'Date',
  'Mon, 30 Sep 2019 23:34:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156988646924605907')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '129b1ca5-e01e-000e-43e7-779f90000000',
  'x-ms-client-request-id',
  'a6368b3f-d69f-4c7c-95b7-ed843a2377be',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:30 GMT' ]);

