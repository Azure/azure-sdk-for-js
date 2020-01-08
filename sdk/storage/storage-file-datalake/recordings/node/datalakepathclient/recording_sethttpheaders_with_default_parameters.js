let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534385458101240","file":"file157534385572201596"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385458101240')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:57 GMT',
  'ETag',
  '"0x8D777A05F3B2386"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55e911f9-b01e-007b-4d89-a92e2e000000',
  'x-ms-client-request-id',
  '64a599b2-00b5-421e-9d81-166c75a0d0df',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:56 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385458101240/file157534385572201596')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:58 GMT',
  'ETag',
  '"0x8D777A05FF22536"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '817ce453-601f-001f-5089-a99e8e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '90f04520-8e2d-4a7b-a3e8-de71ad636bbd',
  'Date',
  'Tue, 03 Dec 2019 03:24:58 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534385458101240/file157534385572201596', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '817ce454-601f-001f-5189-a99e8e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '73914597-0d45-4547-af25-7d456f7ca6aa',
  'Date',
  'Tue, 03 Dec 2019 03:24:58 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534385458101240/file157534385572201596')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:59 GMT',
  'ETag',
  '"0x8D777A0604EFF81"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '817ce455-601f-001f-5289-a99e8e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0d0e9e24-a91e-41f2-847e-bb2a1e46826e',
  'Date',
  'Tue, 03 Dec 2019 03:24:58 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534385458101240/file157534385572201596')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:00 GMT',
  'ETag',
  '"0x8D777A060FD31DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1c7a728-601e-009c-1289-a93e23000000',
  'x-ms-client-request-id',
  '3ec5f04a-382d-467a-9615-fc45d61f8bea',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:00 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534385458101240/file157534385572201596')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A060FD31DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1c7a7b3-601e-009c-0f89-a93e23000000',
  'x-ms-client-request-id',
  '10837e39-1b05-4b8a-959d-b152cdc87c49',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:58 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:25:00 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534385458101240')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '55e917ee-b01e-007b-1489-a92e2e000000',
  'x-ms-client-request-id',
  '328f4c86-a54d-47d8-9070-70f4c53bef93',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:00 GMT' ]);
