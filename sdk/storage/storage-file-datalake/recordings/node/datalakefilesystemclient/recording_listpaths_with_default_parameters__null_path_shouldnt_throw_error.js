let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534363886406757","file0":"file0157534364000708758","file1":"file1157534364115205058","file2":"file2157534364228407124"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363886406757')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:21:21 GMT',
  'ETag',
  '"0x8D7779FDEA67708"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5235585a-701e-0044-5188-a999f2000000',
  'x-ms-client-request-id',
  'f425559e-74ff-429b-8d86-ba0fe1f8e038',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:20 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363886406757/file0157534364000708758')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:22 GMT',
  'ETag',
  '"0x8D7779FDF57A556"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6afbe8e-901f-0089-4f88-a9fcba000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '47341bd6-9a7e-4f59-a41e-7d2da8fb059c',
  'Date',
  'Tue, 03 Dec 2019 03:21:22 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363886406757/file1157534364115205058')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:23 GMT',
  'ETag',
  '"0x8D7779FE004A98C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4595a66-101f-0054-7688-a9af14000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '5542bca7-d3ac-47fc-9b58-78b5f356c266',
  'Date',
  'Tue, 03 Dec 2019 03:21:23 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534363886406757/file2157534364228407124')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:21:24 GMT',
  'ETag',
  '"0x8D7779FE0B1350B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd1b417-201f-0031-6d88-a91e49000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9b0e88af-8bf5-4dfe-a4a1-1015d3e141bc',
  'Date',
  'Tue, 03 Dec 2019 03:21:24 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem157534363886406757')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D7779FDF57A556","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:22 GMT","name":"file0157534364000708758","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FE004A98C","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:23 GMT","name":"file1157534364115205058","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","etag":"0x8D7779FE0B1350B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:21:24 GMT","name":"file2157534364228407124","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28173e5a-701f-0083-5a88-a9e533000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bacfc63c-ff59-470f-bd15-b209b1ed6ea1',
  'Date',
  'Tue, 03 Dec 2019 03:21:25 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363886406757/file0157534364000708758')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6afbe90-901f-0089-5088-a9fcba000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'fa8a18f1-4a68-4dda-89b2-12b06744ab32',
  'Date',
  'Tue, 03 Dec 2019 03:21:25 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363886406757/file1157534364115205058')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4595a67-101f-0054-7788-a9af14000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4a5c58b3-b8e4-4c0e-bb69-04f1fb428040',
  'Date',
  'Tue, 03 Dec 2019 03:21:26 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363886406757/file2157534364228407124')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ffd1b418-201f-0031-6e88-a91e49000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6810520b-9adf-487b-a1f4-3aa730ddc388',
  'Date',
  'Tue, 03 Dec 2019 03:21:26 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534363886406757')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '52356053-701e-0044-7088-a999f2000000',
  'x-ms-client-request-id',
  'd10db015-f6de-4838-8bd5-c5b146d27d45',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:21:26 GMT' ]);
