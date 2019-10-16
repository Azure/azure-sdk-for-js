let nock = require('nock');

module.exports.testInfo = {"container":"container157113289589101240","blob":"blob157113289704105520","blob_move":"blob_move157113289932909000"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113289589101240')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:22 GMT',
  'ETag',
  '"0x8D751541E3F0794"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec686a88-001e-0026-643c-83de2a000000',
  'x-ms-client-request-id',
  '5011a637-2440-43ef-90a4-e0bb3ff6c9d5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113289589101240/blob157113289704105520', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'ETag',
  '"0x8D751541EF10A00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1cb0a931-701e-0029-143c-8333dc000000',
  'x-ms-client-request-id',
  '97b0b2c3-70bd-4c33-b297-48ab7a3963ec',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:43:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113289589101240/blob157113289704105520')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'ETag',
  '"0x8D751541EF10A00"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '7bbe9f2d-801f-005a-703c-83431f000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9288fb59-b23f-464e-91bf-bd0687cf64f9',
  'Date',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113289589101240/blob_move157113289932909000')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b1bc1b9-c01f-0056-283c-83adee000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5b8c8d39-6815-4be5-b20c-fa7916980a7c',
  'Date',
  'Tue, 15 Oct 2019 09:43:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113289589101240/blob_move157113289932909000')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'ETag',
  '"0x8D751541EF10A00"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-rw-rw-',
  'x-ms-acl',
  'user::rw-,group::rw-,other::rw-',
  'x-ms-request-id',
  '3a8330fd-d01f-0060-583c-8300bc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0f0cddaf-860a-470f-bfec-8651d2292430',
  'Date',
  'Tue, 15 Oct 2019 09:43:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113289589101240/blob_move157113289932909000')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D751541EF10A00"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ac7f474c-001e-00a5-1e3c-837e87000000',
  'x-ms-client-request-id',
  '44be00d3-2707-4f06-92cc-0bf6f1fa79d6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 15 Oct 2019 09:43:23 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 15 Oct 2019 09:43:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113289589101240')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b67e6646-f01e-0055-603c-83aee9000000',
  'x-ms-client-request-id',
  '7c3b672e-5665-4a2b-accc-e36c7bd6b5b0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:29 GMT',
  'Connection',
  'close' ]);

