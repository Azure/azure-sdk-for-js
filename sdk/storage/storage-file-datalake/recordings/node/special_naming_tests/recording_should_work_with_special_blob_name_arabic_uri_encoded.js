let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534399115703039","عربيعربى":"عربيعربى157534399230705780"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534399115703039')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:13 GMT',
  'ETag',
  '"0x8D777A0B0A339FB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '967fc13a-a01e-0020-0489-a92952000000',
  'x-ms-client-request-id',
  '08302035-e641-402f-a28e-3bccd379324f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:13 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534399115703039/%25D8%25B9%25D8%25B1%25D8%25A8%25D9%258A%25D8%25B9%25D8%25B1%25D8%25A8%25D9%2589157534399230705780')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:15 GMT',
  'ETag',
  '"0x8D777A0B16C366F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bf1f5a6-d01f-0024-3d89-a9dcd0000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '38f2705c-985c-4d76-af69-f9993b561586',
  'Date',
  'Tue, 03 Dec 2019 03:27:14 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534399115703039/%25D8%25B9%25D8%25B1%25D8%25A8%25D9%258A%25D8%25B9%25D8%25B1%25D8%25A8%25D9%2589157534399230705780')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:15 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0B16C366F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2f24c38a-001e-00a5-0889-a97e87000000',
  'x-ms-client-request-id',
  'a4ffe418-70aa-4264-8da0-7ced65f6c894',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:15 GMT',
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
  'Tue, 03 Dec 2019 03:27:15 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534399115703039')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0B16C366F","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:15 GMT","name":"%D8%B9%D8%B1%D8%A8%D9%8A%D8%B9%D8%B1%D8%A8%D9%89157534399230705780","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1718b4a3-001f-0026-0b89-a9de2a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '106e131f-45a6-49d0-a676-a3da6ff9b4b9',
  'Date',
  'Tue, 03 Dec 2019 03:27:16 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534399115703039')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '967fc944-a01e-0020-6a89-a92952000000',
  'x-ms-client-request-id',
  'd6c0df85-7c9f-447d-9ca8-b80d4f3fcc38',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:17 GMT' ]);
