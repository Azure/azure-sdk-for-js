let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534365147401713","file0":"file0157534365267105685","file1":"file1157534365379908951","file2":"file2157534365493408470","file3":"file3157534365634208884"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534365147401713')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:34 GMT',
  'ETag',
  '"0x8D7779FE62D6415"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24ad7280-301e-00a6-7788-a97d80000000',
  'x-ms-client-request-id',
  'a3e023b5-6c01-4c1b-aeec-8b46179cb99e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:33 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534365147401713/file0157534365267105685')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:35 GMT',
  'ETag',
  '"0x8D7779FE6E1CA15"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b6b9359-301f-006a-0988-a91935000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9b6f6f59-ba96-42b9-ad3f-4d858955168a',
  'Date',
  'Tue, 03 Dec 2019 03:21:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534365147401713/file1157534365379908951')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:36 GMT',
  'ETag',
  '"0x8D7779FE78EFC2E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9d64534-501f-0017-1488-a985fd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0430abd1-4fdc-4c2e-8413-71f9980dd23f',
  'Date',
  'Tue, 03 Dec 2019 03:21:36 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534365147401713/file2157534365493408470')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:37 GMT',
  'ETag',
  '"0x8D7779FE8658F34"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '503744fe-a01f-0081-1a88-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7db98886-c519-4079-8530-1210e89db81b',
  'Date',
  'Tue, 03 Dec 2019 03:21:37 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534365147401713/file3157534365634208884')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:39 GMT',
  'ETag',
  '"0x8D7779FE9139B57"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb9d845a-b01f-0052-3888-a9586c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'dc5fe649-e0d4-4f9d-85c6-2cac163f236a',
  'Date',
  'Tue, 03 Dec 2019 03:21:38 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534365147401713')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FE6E1CA15","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:35 GMT","name":"file0157534365267105685","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FE78EFC2E","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:36 GMT","name":"file1157534365379908951","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FE8658F34","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:37 GMT","name":"file2157534365493408470","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FE9139B57","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:39 GMT","name":"file3157534365634208884","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16940db3-101f-0010-2788-a97378000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '61df0426-eba1-4560-8b30-80210cae3222',
  'Date',
  'Tue, 03 Dec 2019 03:21:40 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534365147401713/file0157534365267105685')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b6b935a-301f-006a-0a88-a91935000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9e3349b7-bf8d-4644-873b-df54103a2632',
  'Date',
  'Tue, 03 Dec 2019 03:21:39 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534365147401713/file1157534365379908951')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c9d64537-501f-0017-1588-a985fd000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e2d44a5f-970c-4d8a-a1e7-757a292ac693',
  'Date',
  'Tue, 03 Dec 2019 03:21:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534365147401713/file2157534365493408470')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '503744ff-a01f-0081-1b88-a9e7c9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2b02495b-9f59-4ddb-b2b0-ba714038cc9b',
  'Date',
  'Tue, 03 Dec 2019 03:21:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534365147401713/file3157534365634208884')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb9d845b-b01f-0052-3988-a9586c000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c19694a7-318e-4a86-b36b-99266703669b',
  'Date',
  'Tue, 03 Dec 2019 03:21:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534365147401713')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '24ad88c8-301e-00a6-5888-a97d80000000',
  'x-ms-client-request-id',
  '5284b9ff-a583-403e-b890-aa2cc39b78c5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:41 GMT' ]);
