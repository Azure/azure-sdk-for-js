let nock = require('nock');

module.exports.hash = "cac2532f7d08499ac8acc86aa5ef86cb";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167703368523603500","file":"file167703368536107602","filename":"filename167703368574002500"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368523603500')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'ETag',
  '"0x8DB147E4AB09946"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64e53-f01e-0019-7767-4679ba000000',
  'x-ms-client-request-id',
  'ea0fe839-020a-479a-b861-7f9e54ba79a6',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368523603500/file167703368536107602')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'ETag',
  '"0x8DB147E4AC52270"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966e6-501f-004d-3c67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'c668b2db-e7b6-4b71-9634-a51f18becf96',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368523603500/file167703368536107602', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966e7-501f-004d-3d67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '0ae56496-1b8d-41ab-b035-7b7bea31d094',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368523603500/file167703368536107602')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'ETag',
  '"0x8DB147E4AEB5FFB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '53f966e8-501f-004d-3e67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'ea52bfc7-1cbd-48cb-b971-505b686967f0',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368523603500/filename167703368574002500')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'ETag',
  '"0x8DB147E4AFDB24D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966e9-501f-004d-3f67-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '2ab037f3-07e8-46fe-bee4-894d699c8e5f',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368523603500')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"11","creationTime":"133215072855925360","etag":"0x8DB147E4AEB5FFB","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:25 GMT","name":"file167703368536107602","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133215072859632205","etag":"0x8DB147E4AFDB24D","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:25 GMT","name":"filename167703368574002500","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f966ea-501f-004d-4067-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'fa2a4b4b-ad0e-412b-be87-324dd2409983',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703368523603500')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64ee6-f01e-0019-7c67-4679ba000000',
  'x-ms-client-request-id',
  'b600d041-4fd5-48ef-8b16-c698688a8eff',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT'
]);
