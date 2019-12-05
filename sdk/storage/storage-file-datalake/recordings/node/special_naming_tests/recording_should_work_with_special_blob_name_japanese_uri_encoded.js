let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534400603708456","にっぽんごにほんご":"にっぽんごにほんご157534400717606933"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534400603708456')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:28 GMT',
  'ETag',
  '"0x8D777A0B980A87F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd698a7b0-a01e-0002-2e89-a94764000000',
  'x-ms-client-request-id',
  '9ac892d6-6386-4ad8-b445-bdd935f1fc84',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:28 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534400603708456/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594157534400717606933')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:29 GMT',
  'ETag',
  '"0x8D777A0BA31A2F6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '328a6e81-101f-005f-3f89-a9b760000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd1d390a8-3ba4-4ba0-909e-98b566dd00cb',
  'Date',
  'Tue, 03 Dec 2019 03:27:29 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534400603708456/%25E3%2581%25AB%25E3%2581%25A3%25E3%2581%25BD%25E3%2582%2593%25E3%2581%2594%25E3%2581%25AB%25E3%2581%25BB%25E3%2582%2593%25E3%2581%2594157534400717606933')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0BA31A2F6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '62430d1b-c01e-003b-1289-a907c0000000',
  'x-ms-client-request-id',
  '3d174758-dc8f-43ef-8e65-5a5c52f93328',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:29 GMT',
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
  'Tue, 03 Dec 2019 03:27:30 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534400603708456')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0BA31A2F6","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:29 GMT","name":"%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94157534400717606933","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a077e10-501f-0071-0389-a937a7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aa673f4c-b79f-4e9f-9ecf-d9e32b80a45c',
  'Date',
  'Tue, 03 Dec 2019 03:27:32 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534400603708456')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd698afaa-a01e-0002-6689-a94764000000',
  'x-ms-client-request-id',
  '41d28246-e53b-4242-8a1e-3dd2865eabde',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:31 GMT' ]);
