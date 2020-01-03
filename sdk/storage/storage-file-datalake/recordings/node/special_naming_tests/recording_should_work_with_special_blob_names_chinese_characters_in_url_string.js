let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534396188206008","Upper blob empty another 汉字":"Upper blob empty another 汉字157534396302507463"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534396188206008')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:44 GMT',
  'ETag',
  '"0x8D777A09F2F42E0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fa9deed-501e-0017-0a89-a985fd000000',
  'x-ms-client-request-id',
  'ba5b7f39-02eb-4d44-9ecb-c7367b3712f2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:44 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534396188206008/Upper%20blob%20empty%20another%20%E6%B1%89%E5%AD%97157534396302507463')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:45 GMT',
  'ETag',
  '"0x8D777A09FDF463F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2012233a-c01f-007f-5789-a9dbac000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '931cf7b6-1684-40ed-b68e-68465f8bd564',
  'Date',
  'Tue, 03 Dec 2019 03:26:45 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534396188206008/Upper%20blob%20empty%20another%20%E6%B1%89%E5%AD%97157534396302507463')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:45 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A09FDF463F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '82c85935-301e-008f-0f89-a90bc2000000',
  'x-ms-client-request-id',
  '2f7a36e3-1e5a-4ad7-a1a4-532d909901ce',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:45 GMT',
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
  'Tue, 03 Dec 2019 03:26:46 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534396188206008')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A09FDF463F","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:45 GMT","name":"Upper blob empty another 汉字157534396302507463","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3bcb57c-e01f-0063-3789-a903bb000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '733eda5a-ab35-4bde-9f2c-414965dd4721',
  'Date',
  'Tue, 03 Dec 2019 03:26:47 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534396188206008')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fa9e4fd-501e-0017-6989-a985fd000000',
  'x-ms-client-request-id',
  '50655473-2b99-4ff4-ac9d-d32f0a0fa7a2',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:47 GMT' ]);
