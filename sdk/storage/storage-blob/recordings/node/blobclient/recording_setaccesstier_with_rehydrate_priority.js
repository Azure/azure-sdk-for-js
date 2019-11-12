let nock = require('nock');

module.exports.testInfo = {"container":"container156988645232600103","blob":"blob156988645252909478"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988645232600103')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:12 GMT',
  'ETag',
  '"0x8D745FEB317887B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0520a29a-201e-0018-2ce7-775e0e000000',
  'x-ms-client-request-id',
  '4a308b79-7902-447b-90bd-e9dd021b2221',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988645232600103/blob156988645252909478', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:12 GMT',
  'ETag',
  '"0x8D745FEB336574E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'de8eadc1-601e-0050-63e7-776c93000000',
  'x-ms-client-request-id',
  'f5352ce3-4011-4c57-98f3-463c3e1ee7db',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 30 Sep 2019 23:34:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988645232600103/blob156988645252909478')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff651c8d-c01e-00de-80e7-772332000000',
  'x-ms-client-request-id',
  'cbfd3493-e792-4195-9ce5-8b8a11a645e1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988645232600103/blob156988645252909478')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '01c655ac-301e-006a-0be7-772f30000000',
  'x-ms-client-request-id',
  'e02763c9-6c0b-41f7-abf1-da1e8bc5efdf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:12 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988645232600103/blob156988645252909478')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:12 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEB336574E"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '58d23566-001e-002d-7de7-77f05b000000',
  'x-ms-client-request-id',
  'c671f7dd-67ee-4487-a1df-9e45279338d5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:12 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Archive',
  'x-ms-access-tier-change-time',
  'Mon, 30 Sep 2019 23:34:13 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-cool',
  'Date',
  'Mon, 30 Sep 2019 23:34:13 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156988645232600103')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69873fd5-101e-001b-50e7-775d09000000',
  'x-ms-client-request-id',
  '5672f746-cce2-4d43-8349-8b3488ca09ba',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:13 GMT' ]);

