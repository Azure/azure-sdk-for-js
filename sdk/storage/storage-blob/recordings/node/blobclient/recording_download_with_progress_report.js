let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157592663733503219","blob":"blob157592663745900301"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592663733503219')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:57 GMT',
  'ETag',
  '"0x8D77CEE19E0442E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '222f574c-e01e-00d9-7fd6-ae965a000000',
  'x-ms-client-request-id',
  '872bfd6a-4408-4627-b34a-7320d10be145',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:23:57 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592663733503219/blob157592663745900301', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:57 GMT',
  'ETag',
  '"0x8D77CEE19F13A63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ae24f44a-501e-0121-5dd6-ae1b12000000',
  'x-ms-client-request-id',
  '79ecfc61-68e1-4ccd-ad84-beef1a9447dd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:23:56 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157592663733503219/blob157592663745900301')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77CEE19F13A63"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c2a784d3-401e-00b9-10d6-aed378000000',
  'x-ms-client-request-id',
  'ca418d5a-af53-4bf1-8d5d-579ce09008a5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 09 Dec 2019 21:23:57 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Dec 2019 21:23:56 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157592663733503219')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '222f578c-e01e-00d9-31d6-ae965a000000',
  'x-ms-client-request-id',
  '968abbf9-ef5a-45f0-9f0e-9e5f84fc23d0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:23:57 GMT' ]);
