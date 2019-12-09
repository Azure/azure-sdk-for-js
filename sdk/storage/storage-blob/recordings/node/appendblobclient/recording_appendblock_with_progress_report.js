let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157592663509702145","blob":"blob157592663522204231"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592663509702145')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:55 GMT',
  'ETag',
  '"0x8D77CEE188A176A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ab5ad49-b01e-0042-66d6-ae1b62000000',
  'x-ms-client-request-id',
  '5e137d51-7b18-4def-87f7-a7d9a96362b4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:23:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592663509702145/blob157592663522204231')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:55 GMT',
  'ETag',
  '"0x8D77CEE18A22182"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd13a9f2-001e-00d8-76d6-ae97a7000000',
  'x-ms-client-request-id',
  '53050973-6c0a-4357-a61b-b44771dc1b49',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Dec 2019 21:23:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157592663509702145/blob157592663522204231', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:55 GMT',
  'ETag',
  '"0x8D77CEE18A900ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd13aa4c-001e-00d8-3cd6-ae97a7000000',
  'x-ms-client-request-id',
  'de4d56b4-6fa5-470d-b915-b0d98c7cf14f',
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
  'Mon, 09 Dec 2019 21:23:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157592663509702145/blob157592663522204231')
  .reply(200, "Hello World!", [ 'Content-Length',
  '12',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 09 Dec 2019 21:23:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D77CEE18A900ED"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bd13aa8f-001e-00d8-7ad6-ae97a7000000',
  'x-ms-client-request-id',
  '4ac4d588-b382-41b6-ad6f-fbf55c1beeba',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Mon, 09 Dec 2019 21:23:55 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 09 Dec 2019 21:23:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157592663509702145')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ab5adbc-b01e-0042-33d6-ae1b62000000',
  'x-ms-client-request-id',
  '75a6f6b0-e1ba-439c-8740-127f61fd3605',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Mon, 09 Dec 2019 21:23:55 GMT' ]);
