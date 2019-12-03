let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534387483805916","file":"file157534387597307605","tempfile2":"tempfile2157534387774604387"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534387483805916')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:17 GMT',
  'ETag',
  '"0x8D777A06B4CD2EB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62416dcb-c01e-003b-6c89-a907c0000000',
  'x-ms-client-request-id',
  '9407b69f-7ee9-4bef-a118-9d6ab4553869',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:17 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534387483805916/file157534387597307605')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:18 GMT',
  'ETag',
  '"0x8D777A06C017D8E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1f1cf9f-b01f-001d-6289-a99c74000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f33df07a-dda4-474d-a88f-e1078c37e02b',
  'Date',
  'Tue, 03 Dec 2019 03:25:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/file157534387597307605', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1f1cfa1-b01f-001d-6389-a99c74000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '15a0c460-55b7-45ca-8495-b6e0327be4d0',
  'Date',
  'Tue, 03 Dec 2019 03:25:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/file157534387597307605')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:19 GMT',
  'ETag',
  '"0x8D777A06C5D7D73"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1f1cfa3-b01f-001d-6589-a99c74000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e059f385-6f3b-4b10-8185-322512fac6fc',
  'Date',
  'Tue, 03 Dec 2019 03:25:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534387483805916/tempfile2157534387774604387')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:20 GMT',
  'ETag',
  '"0x8D777A06D09AC1E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71ea2e1a-d01f-0042-6189-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '587ebd1a-aaed-40d4-8357-73657c6360ff',
  'Date',
  'Tue, 03 Dec 2019 03:25:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/tempfile2157534387774604387', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e1b-d01f-0042-6289-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c754321c-1aad-4b79-be97-7cdac9952ee1',
  'Date',
  'Tue, 03 Dec 2019 03:25:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/tempfile2157534387774604387', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e1c-d01f-0042-6389-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5391b50a-d3e0-4aed-95de-5249649e4c4d',
  'Date',
  'Tue, 03 Dec 2019 03:25:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/tempfile2157534387774604387', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e1e-d01f-0042-6489-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd52a3805-5633-45ff-8d9d-62585505c3c3',
  'Date',
  'Tue, 03 Dec 2019 03:25:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534387483805916/tempfile2157534387774604387')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:21 GMT',
  'ETag',
  '"0x8D777A06DC5D4A9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '71ea2e1f-d01f-0042-6589-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '931e08d0-74d5-4d5d-a962-a210faa27bf4',
  'Date',
  'Tue, 03 Dec 2019 03:25:21 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534387483805916/tempfile2157534387774604387')
  .reply(200, "", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A06DC5D4A9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dabc771e-c01e-0074-1489-a9c3d8000000',
  'x-ms-client-request-id',
  '44f55071-83b7-41b7-8708-5eba905ec03d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:25:20 GMT',
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
  'Tue, 03 Dec 2019 03:25:22 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534387483805916/tempfile2157534387774604387')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '71ea2e20-d01f-0042-6689-a96e8a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '97374e5d-7e46-4e9c-b4ec-0cbf70877e28',
  'Date',
  'Tue, 03 Dec 2019 03:25:22 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534387483805916')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62417c7a-c01e-003b-0d89-a907c0000000',
  'x-ms-client-request-id',
  '31c4b596-6f05-4aba-9deb-f8437db9833e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:22 GMT' ]);
