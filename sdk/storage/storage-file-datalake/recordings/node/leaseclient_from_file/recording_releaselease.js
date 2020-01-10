let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534372994207523","file":"file157534373108905734"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372994207523')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:52 GMT',
  'ETag',
  '"0x8D777A014F0847B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '715549c6-d01e-0085-6e88-a9124b000000',
  'x-ms-client-request-id',
  'e913dc6e-7e82-47a7-93cc-981459e0797b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:52 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372994207523/file157534373108905734')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'ETag',
  '"0x8D777A015A1947E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e18b807-001f-0062-5a88-a90246000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f4d76b52-6cfa-4241-8f36-348898fe9676',
  'Date',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372994207523/file157534373108905734')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'ETag',
  '"0x8D777A015A1947E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26499ca9-401e-0003-4d88-a94699000000',
  'x-ms-client-request-id',
  '39d9079c-bdd9-4869-9a8c-c14b2eb33297',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Tue, 03 Dec 2019 03:22:54 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534372994207523/file157534373108905734')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A015A1947E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48af8d50-501e-0071-6088-a937a7000000',
  'x-ms-client-request-id',
  '65164f24-77e5-4694-8ac2-c76dcc3b3e5f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
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
  'Tue, 03 Dec 2019 03:22:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534372994207523/file157534373108905734')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:22:53 GMT',
  'ETag',
  '"0x8D777A015A1947E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2649a24a-401e-0003-1e88-a94699000000',
  'x-ms-client-request-id',
  '9e296661-e38c-4971-97a3-bb902d3c245f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534372994207523')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71555276-d01e-0085-5888-a9124b000000',
  'x-ms-client-request-id',
  'da2f2970-0ce7-4c77-bb9f-7e185514cdec',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:56 GMT' ]);
