let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534372462809018","file":"file157534372577409072"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372462809018')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:47 GMT',
  'ETag',
  '"0x8D777A011C5D1E2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2498dc7-f01e-0099-2688-a9ca5c000000',
  'x-ms-client-request-id',
  '810127e0-4eea-4e92-8d67-9875fe7a24a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:47 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372462809018/file157534372577409072')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'ETag',
  '"0x8D777A0128FD017"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c34cd75e-d01f-006b-6988-a918c8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f75a5d81-e71b-4ba5-a20d-f27e7ca0cb4a',
  'Date',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372462809018/file157534372577409072')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'ETag',
  '"0x8D777A0128FD017"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb4a6d09-001e-0026-4d88-a9de2a000000',
  'x-ms-client-request-id',
  '8881f1a3-bd20-47ba-b841-7b5779561c57',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Tue, 03 Dec 2019 03:22:49 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534372462809018/file157534372577409072')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0128FD017"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '623fb90b-c01e-003b-6c88-a907c0000000',
  'x-ms-client-request-id',
  '65c22498-2e8d-401f-9632-e992bfc607e7',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:22:50 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372462809018/file157534372577409072')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:48 GMT',
  'ETag',
  '"0x8D777A0128FD017"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb4a70d8-001e-0026-4f88-a9de2a000000',
  'x-ms-client-request-id',
  '452de72d-2d6b-4a3d-902a-2925c27dbf50',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:50 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534372462809018')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2499d91-f01e-0099-1888-a9ca5c000000',
  'x-ms-client-request-id',
  'c8f88e01-df16-4988-bba4-ada73a316a64',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:51 GMT' ]);
