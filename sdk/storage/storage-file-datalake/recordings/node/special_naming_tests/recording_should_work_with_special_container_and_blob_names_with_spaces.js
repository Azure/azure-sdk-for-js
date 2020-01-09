let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534393962503422","blob empty":"blob empty157534394077807350"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534393962503422')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:22 GMT',
  'ETag',
  '"0x8D777A091EB6203"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b94772a-501e-0058-6789-a941e5000000',
  'x-ms-client-request-id',
  'e1c0316f-1766-4bcb-9b22-f40799a402fb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:21 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534393962503422/blob%20empty157534394077807350')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:23 GMT',
  'ETag',
  '"0x8D777A092B3F608"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dc6b5bdb-501f-007a-0789-a92fd3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aa96d206-6fc0-4bd0-9658-d9c2f239baa8',
  'Date',
  'Tue, 03 Dec 2019 03:26:23 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534393962503422')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A092B3F608","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:23 GMT","name":"blob empty157534394077807350","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72c87ffe-f01f-0011-0e89-a97285000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '85b05fab-1578-44dd-afe6-beb40a3da5f3',
  'Date',
  'Tue, 03 Dec 2019 03:26:24 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534393962503422')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b947f5e-501e-0058-0589-a941e5000000',
  'x-ms-client-request-id',
  '88d5bad9-de34-41f9-bf1c-618c2d785766',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:24 GMT' ]);
