let nock = require('nock');

module.exports.hash = "f67df948af0ceae132f87ea5dae52f2b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071856231907871","file":"file162071856262806844"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856231907871')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:02 GMT',
  'ETag',
  '"0x8D9144F6DB0891F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c458-f01e-0012-4d38-463670000000',
  'x-ms-client-request-id',
  'a704e413-f1e2-480d-9af4-18cd500f5310',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:01 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856231907871/file162071856262806844')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:02 GMT',
  'ETag',
  '"0x8D9144F6DE10BAC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e9e8-601f-0000-2d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ab46f27b-b3eb-468d-8749-75036ca3181e',
  'Date',
  'Tue, 11 May 2021 07:36:02 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856231907871/file162071856262806844')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921631172108',
  'x-ms-request-id',
  '1270e9fe-601f-0000-4338-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '170ea572-9281-4d92-bc4a-f420b1a95e33',
  'Date',
  'Tue, 11 May 2021 07:36:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856231907871/file162071856262806844')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:03 GMT',
  'ETag',
  '"0x8D9144F6E42CF68"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270e9ff-601f-0000-4438-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e51f7903-c95d-4f06-801f-1c0a951b6426',
  'Date',
  'Tue, 11 May 2021 07:36:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856231907871/file162071856262806844')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921637419610',
  'x-ms-request-id',
  '1270ea04-601f-0000-4938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f54d3918-08ae-4dc1-a35d-862fbd85d1b7',
  'Date',
  'Tue, 11 May 2021 07:36:03 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856231907871/file162071856262806844')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c4d8-f01e-0012-2a38-463670000000',
  'x-ms-client-request-id',
  '227e7cda-e2cd-48db-a1a1-8f663a94d9b0',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:02 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:03 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071856231907871/file162071856262806844')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:02 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F6DE10BAC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c4f3-f01e-0012-4038-463670000000',
  'x-ms-client-request-id',
  '80b1a9ff-17fb-4934-8614-8144c5f66028',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:02 GMT',
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
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:36:03 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856231907871/file162071856262806844')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921646852730',
  'x-ms-request-id',
  '1270ea5b-601f-0000-1f38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '51dec187-3cf9-48f7-92f6-729ea1e00186',
  'Date',
  'Tue, 11 May 2021 07:36:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856231907871')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c516-f01e-0012-5c38-463670000000',
  'x-ms-client-request-id',
  '2591c0ea-e5ac-447a-8ef3-9449a8ba7de0',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:04 GMT'
]);
