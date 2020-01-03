let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534394721905223","Upper blob empty another":"Upper blob empty another157534394849705881"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534394721905223')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:30 GMT',
  'ETag',
  '"0x8D777A09686B4D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88bf8fe4-001e-0087-5889-a910b1000000',
  'x-ms-client-request-id',
  '4260c1d2-6f79-4472-941d-ddb8d7c0b328',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:29 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534394721905223/Upper%20blob%20empty%20another157534394849705881')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:31 GMT',
  'ETag',
  '"0x8D777A0973631B4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f07e6c-c01f-0030-1989-a91fb4000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c57f5ac0-ecb0-4eff-8361-70af5dcafddb',
  'Date',
  'Tue, 03 Dec 2019 03:26:30 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534394721905223/Upper%20blob%20empty%20another157534394849705881')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0973631B4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17d1fb3b-e01e-008d-7789-a90938000000',
  'x-ms-client-request-id',
  '6ea9ad9e-a3f8-4bed-bc94-d20c22db5c41',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:31 GMT',
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
  'Tue, 03 Dec 2019 03:26:31 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534394721905223')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0973631B4","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:31 GMT","name":"Upper blob empty another157534394849705881","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6991d87-801f-0078-3689-a92d29000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3ea996ee-512f-49ab-a801-98e8f299309f',
  'Date',
  'Tue, 03 Dec 2019 03:26:33 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534394721905223')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '88bf99a2-001e-0087-6f89-a910b1000000',
  'x-ms-client-request-id',
  '2e2d5152-6000-4e33-aa3e-969c85e1b068',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:33 GMT' ]);
