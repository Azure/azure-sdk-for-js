let nock = require('nock');

module.exports.hash = "d670fc5c987e91d0e9b7098240fddefe";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230688855009343","file":"file168230688866302069","testdir":"testdir168230688930706715"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688855009343')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'ETag',
  '"0x8DB4473ECC5B149"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d897-401e-000c-4f5c-766e09000000',
  'x-ms-client-request-id',
  'db7771a6-2edb-4bff-aeda-99a17463dad7',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688855009343/file168230688866302069')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'ETag',
  '"0x8DB4473ED07500E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46f2a44b-c01f-005f-7e5c-764d3d000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '7187ecd1-0c7c-47de-bd52-92f37d609e75',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688855009343/file168230688866302069', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46f2a44d-c01f-005f-7f5c-764d3d000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '5b0dee1b-2212-4262-8ad9-18b841427b88',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688855009343/file168230688866302069')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'ETag',
  '"0x8DB4473ED29ADB8"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '46f2a44e-c01f-005f-805c-764d3d000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '0146ddf7-318f-4fe0-8d39-8ed339d210c8',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688855009343/testdir168230688930706715')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'ETag',
  '"0x8DB4473ED39D99A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46f2a44f-c01f-005f-015c-764d3d000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '7b1b33b0-5a40-4a97-8f2b-5a82d2d3dd97',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688855009343/testdir168230688930706715')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'ETag',
  '"0x8DB4473ED39D99A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '67089e35-dc13-458b-b06e-d873b8406284',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  '46f2a450-c01f-005f-025c-764d3d000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '9554c1f1-e1f3-4d3b-9264-6e4f760c7c61',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688855009343/testdir168230688930706715')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473ED39D99A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d910-401e-000c-2e5c-766e09000000',
  'x-ms-client-request-id',
  'fb2b36b0-da62-4461-89ea-ceebb5765ee0',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:09 GMT',
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
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230688855009343')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d926-401e-000c-3c5c-766e09000000',
  'x-ms-client-request-id',
  '91a02510-367a-4f7f-a81b-ec98e7be8f87',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT'
]);
