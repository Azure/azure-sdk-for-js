let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534396670905095","汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'157534396788307491"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534396670905095')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:49 GMT',
  'ETag',
  '"0x8D777A0A21006EA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6849b69-701e-0088-4f89-a9fd47000000',
  'x-ms-client-request-id',
  'd0a8aec2-fb86-4dcc-99fc-9a5f010d9e7a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:48 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534396670905095/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534396788307491')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:50 GMT',
  'ETag',
  '"0x8D777A0A2C41804"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f061c71c-401f-0065-2889-a9f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8e43d404-a666-4ed8-9af1-c1b5c1ec28ed',
  'Date',
  'Tue, 03 Dec 2019 03:26:49 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534396670905095/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534396788307491')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:50 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0A2C41804"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '08bbf72b-b01e-0070-1189-a9365a000000',
  'x-ms-client-request-id',
  '2beea4e8-8c15-442c-89e5-3b325039cb2b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:50 GMT',
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
  'Tue, 03 Dec 2019 03:26:51 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534396670905095')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0A2C41804","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:50 GMT","name":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'157534396788307491","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9ddbc79a-e01f-0027-6c89-a9dfd7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c4dcd7e7-9c9d-481b-a3fb-76fb8aa1bd48',
  'Date',
  'Tue, 03 Dec 2019 03:26:51 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534396670905095')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c684a80f-701e-0088-4289-a9fd47000000',
  'x-ms-client-request-id',
  'f305739e-c94a-4a08-9fe7-167a5efa2264',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:52 GMT' ]);
