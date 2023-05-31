let nock = require('nock');

module.exports.hash = "8b217ce0d716f9b299b23ada6176963b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230688607207334","file":"file168230688618705785","testfile":"testfile168230688683001331"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688607207334')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'ETag',
  '"0x8DB4473EB4BCB96"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d72a-401e-000c-375c-766e09000000',
  'x-ms-client-request-id',
  '4e7465fa-2f2c-4b00-84e9-c9f8cb198bf7',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:05 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688607207334/file168230688618705785')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'ETag',
  '"0x8DB4473EB8E472D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '91a6767b-e01f-0058-0d5c-76215e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'bb626bab-77a4-4fb9-92ee-dcafc191124f',
  'Date',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688607207334/file168230688618705785', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '91a67686-e01f-0058-185c-76215e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '97eafb40-ed4c-461a-8f81-20ca52e96ae2',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688607207334/file168230688618705785')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'ETag',
  '"0x8DB4473EBAFFAA8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '91a67691-e01f-0058-235c-76215e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'c1bf54ec-be72-4485-9e35-bdd7c5500710',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688607207334/testfile168230688683001331')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'ETag',
  '"0x8DB4473EBC03642"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '91a6769c-e01f-0058-2e5c-76215e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '25355a9e-83fa-451e-893b-5a837f9351ce',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688607207334/testfile168230688683001331')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'ETag',
  '"0x8DB4473EBC03642"',
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
  '91a676a7-e01f-0058-395c-76215e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'd771b2df-75dc-4d94-97ee-9fc9be0e4868',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688607207334/testfile168230688683001331')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EBC03642"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d7b5-401e-000c-225c-766e09000000',
  'x-ms-client-request-id',
  'e1ed6904-bf95-4ee9-afdf-82393bfbd838',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:07 GMT',
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
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem168230688607207334/testfile168230688683001331')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EBC03642"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d7bf-401e-000c-2b5c-766e09000000',
  'x-ms-client-request-id',
  '270c941f-fc7b-4040-a1a1-7dc6aeb5f97f',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x-w-',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230688607207334')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d7ca-401e-000c-335c-766e09000000',
  'x-ms-client-request-id',
  '9c0ba98e-ee48-4100-91fd-1b4c7af288a8',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT'
]);
