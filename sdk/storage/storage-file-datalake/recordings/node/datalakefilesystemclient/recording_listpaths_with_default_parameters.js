let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534363181605015","file0":"file0157534363295108771","file1":"file1157534363426901411","file2":"file2157534363544404628"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363181605015')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:14 GMT',
  'ETag',
  '"0x8D7779FDA72C9DD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6cc362f-e01e-0005-4288-a9b1e1000000',
  'x-ms-client-request-id',
  '632ed222-9f46-4e63-8b78-c2a4310dd7ae',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:14 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363181605015/file0157534363295108771')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:15 GMT',
  'ETag',
  '"0x8D7779FDB3D816D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b071509-901f-004e-7588-a9807b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a9f52daf-ac09-4112-8633-6d32981f1271',
  'Date',
  'Tue, 03 Dec 2019 03:21:14 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363181605015/file1157534363426901411')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:16 GMT',
  'ETag',
  '"0x8D7779FDBEDA5ED"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1f1ce97-b01f-001d-3288-a99c74000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b21985b2-ac56-4f2f-9f4a-6265f1e3b21a',
  'Date',
  'Tue, 03 Dec 2019 03:21:16 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363181605015/file2157534363544404628')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:18 GMT',
  'ETag',
  '"0x8D7779FDC9E751E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16940d9a-101f-0010-1c88-a97378000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4fe1624b-e3ee-466c-90d7-ddf19b470d0d',
  'Date',
  'Tue, 03 Dec 2019 03:21:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534363181605015')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FDB3D816D","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:15 GMT","name":"file0157534363295108771","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FDBEDA5ED","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:16 GMT","name":"file1157534363426901411","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FDC9E751E","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:18 GMT","name":"file2157534363544404628","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7af9acd-c01f-0074-1788-a9c3d8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0505173d-940b-4012-b79e-e10fec8d1443',
  'Date',
  'Tue, 03 Dec 2019 03:21:19 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363181605015/file0157534363295108771')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b07150b-901f-004e-7788-a9807b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fd034a35-2ae4-47d0-99cd-ab58a8d4a44c',
  'Date',
  'Tue, 03 Dec 2019 03:21:18 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363181605015/file1157534363426901411')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a1f1ce9a-b01f-001d-3388-a99c74000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '07ad3bb3-faf1-4deb-bd52-5a76b2ec0ecd',
  'Date',
  'Tue, 03 Dec 2019 03:21:19 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363181605015/file2157534363544404628')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16940d9e-101f-0010-1e88-a97378000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9c58fefa-bb85-4761-b2f9-a76701d69ee8',
  'Date',
  'Tue, 03 Dec 2019 03:21:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363181605015')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a6cc4660-e01e-0005-2a88-a9b1e1000000',
  'x-ms-client-request-id',
  '63a1fa4a-97f6-45ab-a95b-fb4d4804301e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:20 GMT' ]);
