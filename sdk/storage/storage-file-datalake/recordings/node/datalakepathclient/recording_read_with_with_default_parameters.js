let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534383088004196","file":"file157534383203609761"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383088004196')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:33 GMT',
  'ETag',
  '"0x8D777A05119FBA6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb6106e-d01e-008e-8089-a90a3f000000',
  'x-ms-client-request-id',
  'bee433f9-787c-4bcc-b70c-75c00e9ca05b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:33 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383088004196/file157534383203609761')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:34 GMT',
  'ETag',
  '"0x8D777A051CADEEA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '23c8465b-a01f-0064-0489-a9f53e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c9d77612-d410-45e9-88c7-93d81bc5ad5f',
  'Date',
  'Tue, 03 Dec 2019 03:24:33 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383088004196/file157534383203609761', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23c8465c-a01f-0064-0589-a9f53e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6a70584b-ed9b-4e53-926e-10f010d2712c',
  'Date',
  'Tue, 03 Dec 2019 03:24:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383088004196/file157534383203609761')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:35 GMT',
  'ETag',
  '"0x8D777A0523A749B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '23c8465d-a01f-0064-0689-a9f53e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '14d94c6d-9d23-45f5-abfc-0bfb5ed8ec5e',
  'Date',
  'Tue, 03 Dec 2019 03:24:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534383088004196/file157534383203609761')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0523A749B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7bdf9bcc-a01e-006f-7889-a9ed4a000000',
  'x-ms-client-request-id',
  'a813f765-cab3-48e4-b1b6-f4e8d25e5e3c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:34 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:36 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534383088004196')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb61695-d01e-008e-1b89-a90a3f000000',
  'x-ms-client-request-id',
  '61fe46d6-e7fb-4dcd-b8a5-fe20616d806b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:36 GMT' ]);
