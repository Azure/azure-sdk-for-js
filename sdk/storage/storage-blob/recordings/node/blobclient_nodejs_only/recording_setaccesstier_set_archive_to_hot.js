let nock = require('nock');

module.exports.testInfo = {"container":"container156988647032205960","blob":"blob156988647052503315"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988647032205960')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:30 GMT',
  'ETag',
  '"0x8D745FEBDD1A08C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '804b9784-401e-00cf-41e7-771429000000',
  'x-ms-client-request-id',
  'e3db28d8-3f80-4f19-b444-8c07861fede1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988647032205960/blob156988647052503315', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:30 GMT',
  'ETag',
  '"0x8D745FEBDF1AF47"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '94127e78-d01e-000d-1ae7-779c97000000',
  'x-ms-client-request-id',
  '1781c584-052d-4407-85d1-633e2710e4ba',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 30 Sep 2019 23:34:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988647032205960/blob156988647052503315')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0419c82-e01e-010a-37e7-772c47000000',
  'x-ms-client-request-id',
  '7e27fd11-0937-49eb-b78a-d66e6ebfd6fe',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988647032205960/blob156988647052503315')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEBDF1AF47"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3d941c4c-901e-00cd-48e7-7716d3000000',
  'x-ms-client-request-id',
  '8e5fa1b1-9284-44df-986c-bf1d6edb129b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:30 GMT',
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
  'Mon, 30 Sep 2019 23:34:30 GMT',
  'Date',
  'Mon, 30 Sep 2019 23:34:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156988647032205960/blob156988647052503315')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '11919f49-401e-00a2-38e7-77be07000000',
  'x-ms-client-request-id',
  '912b746d-eef1-4471-a3c2-8b50c6fb76e0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:31 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156988647032205960/blob156988647052503315')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 30 Sep 2019 23:34:30 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D745FEBDF1AF47"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd5135805-d01e-00e3-11e7-779614000000',
  'x-ms-client-request-id',
  'bb16f6df-ff4d-4ded-b92b-8c372659930b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 30 Sep 2019 23:34:30 GMT',
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
  'Mon, 30 Sep 2019 23:34:31 GMT',
  'x-ms-archive-status',
  'rehydrate-pending-to-hot',
  'Date',
  'Mon, 30 Sep 2019 23:34:30 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156988647032205960')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c0794a5-601e-00f1-7de7-77a208000000',
  'x-ms-client-request-id',
  'ea186d3c-5b2e-4c77-8583-5aecbe412fe5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 30 Sep 2019 23:34:31 GMT' ]);

