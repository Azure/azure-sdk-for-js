let nock = require('nock');

module.exports.hash = "fdff8a9bb8ef6bb52beb1eccec029c67";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem171245972368705312","file":"file171245972440505466","testdir":"testdir171245972538609322"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171245972368705312')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:25 GMT',
  'ETag',
  '"0x8DC56B0F7CCC2A5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a931f7b-e01e-004e-0599-88c973000000',
  'x-ms-client-request-id',
  '0067a23d-c819-4dc6-a302-32a211d62fb3',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Sun, 07 Apr 2024 03:15:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171245972368705312/file171245972440505466')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:25 GMT',
  'ETag',
  '"0x8DC56B0F837133D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3ca3f595-a01f-0002-0599-885943000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '4ffc94b5-265f-44ee-b23e-a0012da5ec9e',
  'Date',
  'Sun, 07 Apr 2024 03:15:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem171245972368705312/file171245972440505466', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3ca3f5ae-a01f-0002-1e99-885943000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '5a817228-cbe3-42c1-bc69-d5f76f0cc828',
  'Date',
  'Sun, 07 Apr 2024 03:15:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem171245972368705312/file171245972440505466')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:26 GMT',
  'ETag',
  '"0x8DC56B0F868DA00"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '3ca3f5b7-a01f-0002-2799-885943000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  '5ceccbc3-a034-462c-83d5-3a55f60de55c',
  'Date',
  'Sun, 07 Apr 2024 03:15:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171245972368705312/testdir171245972538609322')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:26 GMT',
  'ETag',
  '"0x8DC56B0F87A9C87"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '3ca3f5d1-a01f-0002-4199-885943000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  'c5a92cd4-10e5-4c3a-a133-272b2ab6d95d',
  'Date',
  'Sun, 07 Apr 2024 03:15:25 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem171245972368705312/testdir171245972538609322')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:26 GMT',
  'ETag',
  '"0x8DC56B0F87A9C87"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'x-ms-request-id',
  '3ca3f5e4-a01f-0002-5499-885943000000',
  'x-ms-version',
  '2024-02-04',
  'x-ms-client-request-id',
  'cdcc00ce-91d7-4a1b-84e9-aa34a35b6406',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 03:15:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem171245972368705312/testdir171245972538609322')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Sun, 07 Apr 2024 03:15:26 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DC56B0F87A9C87"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a93217c-e01e-004e-0b99-88c973000000',
  'x-ms-client-request-id',
  'd5f89fd9-869e-4ec4-9f93-3b38979a1464',
  'x-ms-version',
  '2023-11-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Sun, 07 Apr 2024 03:15:26 GMT',
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
  'rwxr-x-w-',
  'x-ms-acl',
  'user::rwx,group::r-x,other::-w-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,x-ms-acl,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 07 Apr 2024 03:15:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171245972368705312')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a9321a0-e01e-004e-2999-88c973000000',
  'x-ms-client-request-id',
  'b3a6610e-9c4e-4ccf-8b93-b08c2971fc14',
  'x-ms-version',
  '2023-11-03',
  'Date',
  'Sun, 07 Apr 2024 03:15:26 GMT'
]);
