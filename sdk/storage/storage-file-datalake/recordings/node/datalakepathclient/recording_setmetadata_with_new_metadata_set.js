let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534384470301537","file":"file157534384584404901"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384470301537')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:47 GMT',
  'ETag',
  '"0x8D777A059574777"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e0d001-f01e-001a-7289-a96af1000000',
  'x-ms-client-request-id',
  '9c0c3d69-d034-4bce-b2bc-5b30a0d40505',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:46 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384470301537/file157534384584404901')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:48 GMT',
  'ETag',
  '"0x8D777A05A06214D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df320dcc-201f-005c-6f89-a9b467000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4f8c6adf-e7c7-42cb-946c-88457e855104',
  'Date',
  'Tue, 03 Dec 2019 03:24:47 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534384470301537/file157534384584404901', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'df320dcd-201f-005c-7089-a9b467000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6fb4a1cb-ce03-444d-88ae-24f2a07d70bc',
  'Date',
  'Tue, 03 Dec 2019 03:24:48 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534384470301537/file157534384584404901')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:49 GMT',
  'ETag',
  '"0x8D777A05A5E73A4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'df320dce-201f-005c-7189-a9b467000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a8b9233d-112c-428b-bac9-4a7cfed09e98',
  'Date',
  'Tue, 03 Dec 2019 03:24:48 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384470301537/file157534384584404901')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:50 GMT',
  'ETag',
  '"0x8D777A05B0E91D6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12b55e4d-601e-0050-3f89-a95a96000000',
  'x-ms-client-request-id',
  'e1b23f9c-c9d3-42e5-a864-988ff03727e4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 03 Dec 2019 03:24:49 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534384470301537/file157534384584404901')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A05B0E91D6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '12b55f4b-601e-0050-2989-a95a96000000',
  'x-ms-client-request-id',
  'cb068651-9acf-451d-a5ba-25794d65f7a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:48 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:49 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534384470301537')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e0d6b9-f01e-001a-0489-a96af1000000',
  'x-ms-client-request-id',
  '3692bf8c-ef0e-490c-9685-83605e45787f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:50 GMT' ]);
