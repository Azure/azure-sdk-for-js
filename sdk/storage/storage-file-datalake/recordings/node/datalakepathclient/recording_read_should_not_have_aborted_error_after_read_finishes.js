let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534383544209497","file":"file157534383660204861"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383544209497')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:38 GMT',
  'ETag',
  '"0x8D777A053D27A34"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f698404-d01e-006b-5889-a918c8000000',
  'x-ms-client-request-id',
  '283e6f0e-30f1-429d-851f-108d6655f080',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:37 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534383544209497/file157534383660204861')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'ETag',
  '"0x8D777A05488FF8B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fba67fc3-401f-0021-4689-a928af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8b8dee2e-b8fe-4351-8ccb-2a12dd536032',
  'Date',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383544209497/file157534383660204861', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'fba67fd2-401f-0021-5589-a928af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '94ef0374-bae3-47df-99de-8a5b99501fdb',
  'Date',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534383544209497/file157534383660204861')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'ETag',
  '"0x8D777A054E55A82"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'fba67fde-401f-0021-6189-a928af000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '282c2ab0-7300-4903-9a53-2ec5257ed665',
  'Date',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534383544209497/file157534383660204861')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:39 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A054E55A82"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5236e5cc-701e-0044-2489-a999f2000000',
  'x-ms-client-request-id',
  '14d79059-3c7c-4549-b236-19cc5ad0cb96',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:39 GMT',
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
  'Tue, 03 Dec 2019 03:24:40 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534383544209497')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f698c13-d01e-006b-6989-a918c8000000',
  'x-ms-client-request-id',
  '68115b60-2fc8-45b8-85a5-5128a6faf1ef',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:40 GMT' ]);
