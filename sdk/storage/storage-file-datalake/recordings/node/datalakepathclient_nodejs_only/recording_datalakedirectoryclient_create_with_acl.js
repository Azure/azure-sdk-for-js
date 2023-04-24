let nock = require('nock');

module.exports.hash = "9f141e6a3b8de8c9cfe26aaa544c398b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230688972706753","file":"file168230688984102881","testdir":"testdir168230689048104517"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688972706753')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'ETag',
  '"0x8DB4473ED7956AE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d931-401e-000c-465c-766e09000000',
  'x-ms-client-request-id',
  '6deb35b2-0ee8-48f9-ab47-d073a0323b0e',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688972706753/file168230688984102881')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'ETag',
  '"0x8DB4473EDBB01F4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '743e11b5-501f-002f-615c-76f4ca000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'e51363b8-5aa2-402e-86b6-290ce9ddb7f4',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688972706753/file168230688984102881', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '743e11b9-501f-002f-655c-76f4ca000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'e5434681-1d06-4d93-99c8-d6161c4accad',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688972706753/file168230688984102881')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'ETag',
  '"0x8DB4473EDDCFC2A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '743e11c1-501f-002f-6d5c-76f4ca000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'd4c0c9ee-940b-4195-85a0-f470c58a3183',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688972706753/testdir168230689048104517')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'ETag',
  '"0x8DB4473EDED25EC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '743e11ca-501f-002f-765c-76f4ca000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'c566775f-c807-432b-9be9-8ff14bc6d3c1',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688972706753/testdir168230689048104517')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'ETag',
  '"0x8DB4473EDED25EC"',
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
  '743e11da-501f-002f-065c-76f4ca000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'f7cda17d-b269-4859-90c8-ef159081bd68',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688972706753/testdir168230689048104517')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EDED25EC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d9e1-401e-000c-505c-766e09000000',
  'x-ms-client-request-id',
  'e81b8668-354a-434a-9043-4db4b6887a21',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:10 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230688972706753')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d9e9-401e-000c-585c-766e09000000',
  'x-ms-client-request-id',
  '09c8b18c-0e11-4c65-8239-99d5a18870fd',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT'
]);
