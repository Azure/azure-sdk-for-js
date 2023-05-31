let nock = require('nock');

module.exports.hash = "18201c9677a1f325c0e0cadf6e3c2a48";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230688486104607","file":"file168230688498109778","testfile":"testfile168230688563709224"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688486104607')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'ETag',
  '"0x8DB4473EA9392FF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d672-401e-000c-385c-766e09000000',
  'x-ms-client-request-id',
  '258364ab-d549-4a22-8dc7-bce95c1c847f',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688486104607/file168230688498109778')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'ETag',
  '"0x8DB4473EAD6E473"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '4ac2dd0e-d01f-0021-355c-76dd7a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '2d108bfd-ead3-42b7-9903-0e09102b5d2e',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688486104607/file168230688498109778', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '4ac2dd0f-d01f-0021-365c-76dd7a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '5e61bc33-77b4-4d0f-b17d-eaeda08a8ed4',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688486104607/file168230688498109778')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'ETag',
  '"0x8DB4473EAF9B361"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '4ac2dd10-d01f-0021-375c-76dd7a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '56359610-c9dd-4e0f-915d-3a794a614a5a',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688486104607/testfile168230688563709224')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'ETag',
  '"0x8DB4473EB0AB626"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '4ac2dd12-d01f-0021-395c-76dd7a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '0afdada4-ef6d-4365-bb40-7d0df34a9ae4',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688486104607/testfile168230688563709224')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'ETag',
  '"0x8DB4473EB0AB626"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rw-r-----',
  'x-ms-acl',
  'user::rw-,group::r--,other::---',
  'x-ms-request-id',
  '4ac2dd13-d01f-0021-3a5c-76dd7a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'd3725462-8b61-4db2-b50b-b75a9af2d98d',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:04 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688486104607/testfile168230688563709224')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:05 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EB0AB626"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d702-401e-000c-185c-766e09000000',
  'x-ms-client-request-id',
  'da3d126b-35d8-411d-8a92-b0a8ad193fc5',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:05 GMT',
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
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:05 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230688486104607')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d722-401e-000c-305c-766e09000000',
  'x-ms-client-request-id',
  '509fb169-036b-4664-9311-a3361ede0e99',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:05 GMT'
]);
