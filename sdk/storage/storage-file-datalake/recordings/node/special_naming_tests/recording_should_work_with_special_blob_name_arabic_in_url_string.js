let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534400104702351","عربيعربى":"عربيعربى157534400220800324"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534400104702351')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:23 GMT',
  'ETag',
  '"0x8D777A0B688AD5C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec9ef1af-201e-00b2-8089-a9bee4000000',
  'x-ms-client-request-id',
  '5ccfaf9f-2006-41a1-8db1-0eb68b2abc29',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:22 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534400104702351/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89157534400220800324')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:25 GMT',
  'ETag',
  '"0x8D777A0B74FFF7E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859b2267-601f-0036-2489-a9e8cc000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1a385785-6ff5-423c-a267-cfb6886a7789',
  'Date',
  'Tue, 03 Dec 2019 03:27:24 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534400104702351/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89157534400220800324')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:25 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0B74FFF7E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8234f0c4-201e-0057-3889-a9ac13000000',
  'x-ms-client-request-id',
  '2e4205a0-8a15-4cee-973f-b0d1ccbb98c9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:25 GMT',
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
  'Tue, 03 Dec 2019 03:27:25 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534400104702351')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0B74FFF7E","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:25 GMT","name":"عربيعربى157534400220800324","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b3bcb596-e01f-0063-4289-a903bb000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '27365553-b60d-4bcb-9915-56a56c6417ff',
  'Date',
  'Tue, 03 Dec 2019 03:27:26 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534400104702351')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ec9ef91b-201e-00b2-7789-a9bee4000000',
  'x-ms-client-request-id',
  '77172f8b-a7ce-4cf8-bfaa-c534a8c85e0f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:26 GMT' ]);
