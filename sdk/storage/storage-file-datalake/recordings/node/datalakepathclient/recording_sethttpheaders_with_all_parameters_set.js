let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534385925003773","file":"file157534386039301146"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385925003773')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:01 GMT',
  'ETag',
  '"0x8D777A062030A3F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cbbe854-701e-000b-0889-a95dea000000',
  'x-ms-client-request-id',
  '976cd5e3-6997-43cb-8f4f-b2fb8c1513ee',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:01 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385925003773/file157534386039301146')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:03 GMT',
  'ETag',
  '"0x8D777A062B2493F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f9cf1639-f01f-005e-4b89-a9b69d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1c4072a0-45d8-45c7-8400-7b1c3fb8c8d0',
  'Date',
  'Tue, 03 Dec 2019 03:25:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534385925003773/file157534386039301146', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f9cf163a-f01f-005e-4c89-a9b69d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '02399f1f-e06b-4c39-9fd5-0c74a4e6f74a',
  'Date',
  'Tue, 03 Dec 2019 03:25:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534385925003773/file157534386039301146')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:03 GMT',
  'ETag',
  '"0x8D777A0630B95A5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f9cf163b-f01f-005e-4d89-a9b69d000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b7ec7b01-1d06-4b65-b159-311396bd66da',
  'Date',
  'Tue, 03 Dec 2019 03:25:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385925003773/file157534386039301146')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:04 GMT',
  'ETag',
  '"0x8D777A063B80D8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aaa3f7fe-001e-0004-3e89-a9b01c000000',
  'x-ms-client-request-id',
  '3e0fcca4-eb14-4092-9b85-e980a9d17397',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534385925003773/file157534386039301146')
  .reply(200, [], [ 'Cache-Control',
  'cacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'contentType',
  'Content-Encoding',
  'contentEncoding',
  'Content-Language',
  'contentLanguage',
  'Content-MD5',
  'AQIDBA==',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:04 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A063B80D8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aaa3f8ad-001e-0004-5c89-a9b01c000000',
  'x-ms-client-request-id',
  '82bcde8b-e4f4-47e3-b4af-5a8634c2d7ff',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:25:03 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:25:04 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534385925003773')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2cbbefe9-701e-000b-0a89-a95dea000000',
  'x-ms-client-request-id',
  '04000226-ca1a-4379-8614-7f347e4bd367',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:04 GMT' ]);
