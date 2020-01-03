let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534397157500791","汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'157534397272208936"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534397157500791')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:54 GMT',
  'ETag',
  '"0x8D777A0A4F72489"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35ff1c04-701e-00a1-7689-a98b05000000',
  'x-ms-client-request-id',
  '50abbe47-ba81-420f-a985-b4de80cc008c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:53 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534397157500791/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534397272208936')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:55 GMT',
  'ETag',
  '"0x8D777A0A5A8BEA3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c34cd80d-d01f-006b-3789-a918c8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0e3e9844-f188-44cc-9fbe-89074fa9d22c',
  'Date',
  'Tue, 03 Dec 2019 03:26:54 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534397157500791/%E6%B1%89%E5%AD%97.%20special%20~!%40%23%24%25%5E%26*()_%2B%601234567890-%3D%7B%7D%7C%5B%5D%3A%22%3B%27%3C%3E%3F%2C%27157534397272208936')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0A5A8BEA3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67b36123-301e-0007-6789-a9b31b000000',
  'x-ms-client-request-id',
  '3be4cdac-fa32-4ce9-98ec-bd40e3c27043',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:55 GMT',
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
  'Tue, 03 Dec 2019 03:26:55 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534397157500791')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0A5A8BEA3","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:55 GMT","name":"汉字. special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'157534397272208936","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ad71973e-c01f-0056-3b89-a9adee000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3b4c5ca3-9488-4182-a10d-afce70fac352',
  'Date',
  'Tue, 03 Dec 2019 03:26:56 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534397157500791')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '35ff2364-701e-00a1-5b89-a98b05000000',
  'x-ms-client-request-id',
  'c8a19d2c-2729-4b45-95ec-1d5e9ee748e6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:57 GMT' ]);
