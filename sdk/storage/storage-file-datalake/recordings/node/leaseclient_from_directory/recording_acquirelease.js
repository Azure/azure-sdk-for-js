let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534377777906091","dir":"dir157534377891706893"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534377777906091')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:40 GMT',
  'ETag',
  '"0x8D777A031730A92"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd972d9ec-901e-0045-1e89-a9980f000000',
  'x-ms-client-request-id',
  '96dc0757-7689-496f-97d1-1c8d43895810',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:40 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534377777906091/dir157534377891706893')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:23:41 GMT',
  'ETag',
  '"0x8D777A032210712"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3ae4d5e8-e01f-0086-3a89-a9114c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '177f7b31-796d-48af-8c0e-a2e4f9e85d51',
  'Date',
  'Tue, 03 Dec 2019 03:23:41 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534377777906091/dir157534377891706893')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:41 GMT',
  'ETag',
  '"0x8D777A032210712"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f75a212-801e-001e-0c89-a99f73000000',
  'x-ms-client-request-id',
  '6fa03471-2ded-4d86-b40e-73433f30ce23',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Tue, 03 Dec 2019 03:23:42 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534377777906091/dir157534377891706893')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A032210712"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3004489c-001e-00ae-3789-a966f3000000',
  'x-ms-client-request-id',
  'c00c0db7-f79d-417a-a7fa-1b110a20752c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:23:41 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:23:43 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534377777906091/dir157534377891706893')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:23:41 GMT',
  'ETag',
  '"0x8D777A032210712"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7f75a4db-801e-001e-1d89-a99f73000000',
  'x-ms-client-request-id',
  '32ca3621-150f-40e2-b2fe-1485a91e4895',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:43 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534377777906091')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd972e0a5-901e-0045-2489-a9980f000000',
  'x-ms-client-request-id',
  '604b6ec1-d138-40e2-88ec-ce3367086e99',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:23:44 GMT' ]);
