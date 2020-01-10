let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534366563809541","file0":"file0157534366677803020","file1":"file1157534366791802787","file2":"file2157534366905209485","file3":"file3157534367017903742"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366563809541')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:48 GMT',
  'ETag',
  '"0x8D7779FEE9B886A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea2621a-701e-004f-5488-a98186000000',
  'x-ms-client-request-id',
  '16ba25e4-b994-44a2-85bb-0c15af86cae9',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:47 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366563809541/file0157534366677803020')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:49 GMT',
  'ETag',
  '"0x8D7779FEF4BD76E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52b7c29e-e01f-004a-5a88-a975f9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '038815fd-b2b8-4c16-b62f-ea210cde9bd7',
  'Date',
  'Tue, 03 Dec 2019 03:21:48 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366563809541/file1157534366791802787')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:50 GMT',
  'ETag',
  '"0x8D7779FEFF9021B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed49711f-901f-000a-6a88-a95c17000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6ad0040d-f58f-4c22-9d61-24039ea05d45',
  'Date',
  'Tue, 03 Dec 2019 03:21:50 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366563809541/file2157534366905209485')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:51 GMT',
  'ETag',
  '"0x8D7779FF0A524A7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328a6c9f-101f-005f-5f88-a9b760000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ed3f6e77-6125-4ec2-a90a-ce52f78c4f45',
  'Date',
  'Tue, 03 Dec 2019 03:21:51 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534366563809541/file3157534367017903742')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:53 GMT',
  'ETag',
  '"0x8D7779FF16AB00D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20122113-c01f-007f-2288-a9dbac000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7351e1a1-f415-42ae-a801-6bbafd87be08',
  'Date',
  'Tue, 03 Dec 2019 03:21:52 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534366563809541')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FEF4BD76E","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:49 GMT","name":"file0157534366677803020","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FEFF9021B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:50 GMT","name":"file1157534366791802787","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'NzM2NTk3NjAzMzkwMjkwOTIzOSAwIC9qc3YxMgEwMUQ1NThCM0RGNDMyREI5L2ZpbGVzeXN0ZW0xNTc1MzQzNjY1NjM4MDk1NDEBMDFENUE5ODhDQzI0REUzRS9maWxlMjE1NzUzNDM2NjkwNTIwOTQ4NQ==',
  'x-ms-request-id',
  'dc6b5afe-501f-007a-0e88-a92fd3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '91fca7f8-8739-4b9f-beda-93c3375423cd',
  'Date',
  'Tue, 03 Dec 2019 03:21:53 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534366563809541')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FF0A524A7","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:51 GMT","name":"file2157534366905209485","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FF16AB00D","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:53 GMT","name":"file3157534367017903742","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc6b5aff-501f-007a-0f88-a92fd3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4ca8d121-cb86-4dd7-ad4b-49ff9efa3119',
  'Date',
  'Tue, 03 Dec 2019 03:21:53 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366563809541/file0157534366677803020')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52b7c2a3-e01f-004a-5d88-a975f9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c1bce5e3-b912-483c-87a4-b89bbe2f6026',
  'Date',
  'Tue, 03 Dec 2019 03:21:53 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366563809541/file1157534366791802787')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ed497121-901f-000a-6b88-a95c17000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c3aa5c5e-a68a-4e07-b750-6460f1f5a510',
  'Date',
  'Tue, 03 Dec 2019 03:21:54 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366563809541/file2157534366905209485')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328a6ca1-101f-005f-6088-a9b760000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0f344d27-8613-41ca-8a38-c72cec6bb23d',
  'Date',
  'Tue, 03 Dec 2019 03:21:54 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366563809541/file3157534367017903742')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '20122115-c01f-007f-2388-a9dbac000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '263490da-f765-4a9d-88f1-bf2a489cd33c',
  'Date',
  'Tue, 03 Dec 2019 03:21:54 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534366563809541')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dea2735a-701e-004f-6d88-a98186000000',
  'x-ms-client-request-id',
  'bf6f4500-ce47-4e5a-a321-fa7a60ddd78b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:55 GMT' ]);
