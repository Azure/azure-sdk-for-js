let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534399616102951","عربيعربى":"عربيعربى157534399735300801"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534399616102951')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:18 GMT',
  'ETag',
  '"0x8D777A0B39F3E5E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e21b9a-f01e-001a-5889-a96af1000000',
  'x-ms-client-request-id',
  'a6705456-e0fa-48f9-9d76-6f76d1777454',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:18 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534399616102951/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89157534399735300801')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:20 GMT',
  'ETag',
  '"0x8D777A0B455252B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dabc1d8e-901f-0023-0589-a92a55000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '149072fb-b3b3-4462-bc87-a92901e2c006',
  'Date',
  'Tue, 03 Dec 2019 03:27:19 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534399616102951/%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89157534399735300801')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:20 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0B455252B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2d0c524d-701e-0029-0e89-a933dc000000',
  'x-ms-client-request-id',
  'fa49fa4c-16a4-41fe-aeaf-03dc078c3982',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:20 GMT',
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
  'Tue, 03 Dec 2019 03:27:20 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534399616102951')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0B455252B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:20 GMT","name":"عربيعربى157534399735300801","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '16940f1f-101f-0010-1789-a97378000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e959abaa-e1cd-4b09-a7c6-5bcb66086cb0',
  'Date',
  'Tue, 03 Dec 2019 03:27:21 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534399616102951')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e22545-f01e-001a-4889-a96af1000000',
  'x-ms-client-request-id',
  'f7481420-9fc8-43d4-a2c4-540b10b47a1e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:21 GMT' ]);
