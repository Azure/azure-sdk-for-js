let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534405149607972","file":"file157534405269504768","destfile":"destfile157534405451104406"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534405149607972')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:14 GMT',
  'ETag',
  '"0x8D777A0D49A07E1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12b84299-601e-0050-1289-a95a96000000',
  'x-ms-client-request-id',
  '9339cfa2-45ba-48e2-93fa-b5385a550e3a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:13 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534405149607972/file157534405269504768')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:15 GMT',
  'ETag',
  '"0x8D777A0D5517D43"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9378508d-601f-0072-5d89-a934a0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '49ddf61a-67ec-4fa6-ac18-d72736413642',
  'Date',
  'Tue, 03 Dec 2019 03:28:14 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534405149607972/file157534405269504768', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '9378508f-601f-0072-5f89-a934a0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '175fb79f-e8a8-450c-bdc3-5e7fcff2291d',
  'Date',
  'Tue, 03 Dec 2019 03:28:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534405149607972/file157534405269504768')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:16 GMT',
  'ETag',
  '"0x8D777A0D5B9630F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '93785090-601f-0072-6089-a934a0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7b515614-17d7-4aaa-9601-d429c42f9967',
  'Date',
  'Tue, 03 Dec 2019 03:28:15 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534405149607972/destfile157534405451104406')
  .query(true)
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3afde93a-b01f-007b-0989-a92e2e000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '079f3063-e188-4187-93d1-596e0c758be1',
  'Date',
  'Tue, 03 Dec 2019 03:28:16 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534405149607972/destfile157534405451104406')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0D5B9630F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f55f2d3-201e-005c-2189-a9b467000000',
  'x-ms-client-request-id',
  '1567be0a-e00b-496a-bfa5-227e43e0bd70',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:28:15 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:28:17 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534405149607972')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12b85194-601e-0050-0489-a95a96000000',
  'x-ms-client-request-id',
  '97055e6f-6a9c-4a70-8915-a6b6e451f958',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:17 GMT' ]);
