let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534367432908649","file0":"file0157534367547906994","file1":"file1157534367664503393","file2":"file2157534367777500098","file3":"file3157534367890507334"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534367432908649')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:56 GMT',
  'ETag',
  '"0x8D7779FF3C9ADA8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40f94477-001e-002d-4b88-a9c65e000000',
  'x-ms-client-request-id',
  '44e74066-d4f8-4661-85e9-dd43159568cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:56 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534367432908649/file0157534367547906994')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:58 GMT',
  'ETag',
  '"0x8D7779FF47D842B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202c9e74-e01f-0005-7c88-a9b1e1000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c5ecd1c1-9ec7-4a77-9d3a-011b4a620a2e',
  'Date',
  'Tue, 03 Dec 2019 03:21:57 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534367432908649/file1157534367664503393')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:59 GMT',
  'ETag',
  '"0x8D7779FF52BE95F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5c3d643-801f-0015-3488-a98707000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '47e0a0de-2988-44eb-b01f-5870faf3045f',
  'Date',
  'Tue, 03 Dec 2019 03:21:58 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534367432908649/file2157534367777500098')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:22:00 GMT',
  'ETag',
  '"0x8D7779FF5D87F6A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28173e75-701f-0083-6788-a9e533000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'afb42f1c-648b-4da0-8b1c-5b004a2e8a37',
  'Date',
  'Tue, 03 Dec 2019 03:21:59 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534367432908649/file3157534367890507334')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:22:01 GMT',
  'ETag',
  '"0x8D7779FF684E940"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859b214c-601f-0036-0588-a9e8cc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7b854d6f-20bc-497c-a3df-65ed81cef68f',
  'Date',
  'Tue, 03 Dec 2019 03:22:00 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534367432908649')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FF47D842B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:58 GMT","name":"file0157534367547906994","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FF52BE95F","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:59 GMT","name":"file1157534367664503393","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'MTMyMDk1OTI2NjIxNTk5MzkxMiAwIC9qc3YxMgEwMUQ1NThCM0RGNDMyREI5L2ZpbGVzeXN0ZW0xNTc1MzQzNjc0MzI5MDg2NDkBMDFENUE5ODhEMTUyRTMwMC9maWxlMjE1NzUzNDM2Nzc3NzUwMDA5OA==',
  'x-ms-request-id',
  'd57da0ea-d01f-0085-3988-a9124b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'faf06059-6d0d-422b-97d3-bbbf087da871',
  'Date',
  'Tue, 03 Dec 2019 03:22:02 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534367432908649')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FF47D842B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:58 GMT","name":"file0157534367547906994","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FF52BE95F","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:59 GMT","name":"file1157534367664503393","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'MTMyMDk1OTI2NjIxNTk5MzkxMiAwIC9qc3YxMgEwMUQ1NThCM0RGNDMyREI5L2ZpbGVzeXN0ZW0xNTc1MzQzNjc0MzI5MDg2NDkBMDFENUE5ODhEMTUyRTMwMC9maWxlMjE1NzUzNDM2Nzc3NzUwMDA5OA==',
  'x-ms-request-id',
  'd57da0eb-d01f-0085-3a88-a9124b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd0f3f10c-63f7-4b14-a09a-e8f8b589a436',
  'Date',
  'Tue, 03 Dec 2019 03:22:02 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534367432908649/file0157534367547906994')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '202c9e79-e01f-0005-7f88-a9b1e1000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a006c981-830f-41e2-aa04-a66c5da8309f',
  'Date',
  'Tue, 03 Dec 2019 03:22:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534367432908649/file1157534367664503393')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f5c3d64f-801f-0015-4088-a98707000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'a5a3ede2-1fe2-4d87-ae0b-04229324547a',
  'Date',
  'Tue, 03 Dec 2019 03:22:02 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534367432908649/file2157534367777500098')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28173e79-701f-0083-6a88-a9e533000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'b9521de7-1753-41b4-95d2-af52a3feb1ec',
  'Date',
  'Tue, 03 Dec 2019 03:22:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534367432908649/file3157534367890507334')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859b214e-601f-0036-0688-a9e8cc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8b28cffa-e1c4-4f3e-ab51-3c76c8be7e4d',
  'Date',
  'Tue, 03 Dec 2019 03:22:03 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534367432908649')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40f954c3-001e-002d-2d88-a9c65e000000',
  'x-ms-client-request-id',
  'b3c435e9-72a0-45ca-8b75-047e242b044e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:22:03 GMT' ]);
