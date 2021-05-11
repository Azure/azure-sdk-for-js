let nock = require('nock');

module.exports.hash = "f54e217505937fb499be1d5204a37c94";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071856868303048","file":"file162071856899503707","directory":"directory162071857035207031"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856868303048')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:08 GMT',
  'ETag',
  '"0x8D9144F717C20F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c660-f01e-0012-6838-463670000000',
  'x-ms-client-request-id',
  '6d0fb2ce-f6b9-49be-93f0-1c09caf712d2',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:08 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856868303048/file162071856899503707')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:09 GMT',
  'ETag',
  '"0x8D9144F71AE188C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270eb54-601f-0000-1038-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '3c0c5eaf-17d5-4b4f-80d4-4d3fe1c66e05',
  'Date',
  'Tue, 11 May 2021 07:36:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856868303048/file162071856899503707')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921695008632',
  'x-ms-request-id',
  '1270eb69-601f-0000-2538-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'f849874e-0c2f-4371-8199-c681ee81a271',
  'Date',
  'Tue, 11 May 2021 07:36:09 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856868303048/file162071856899503707')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c6ab-f01e-0012-2138-463670000000',
  'x-ms-client-request-id',
  '82d0c2a4-cc37-4d94-b421-71e49f4c9937',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:09 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071856868303048/file162071856899503707')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:09 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F71AE188C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c6cc-f01e-0012-3a38-463670000000',
  'x-ms-client-request-id',
  'b249712b-cdd8-423d-90a2-6c7d2d465bab',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:09 GMT',
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
  'Tue, 11 May 2021 07:36:09 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856868303048/directory162071857035207031')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:10 GMT',
  'ETag',
  '"0x8D9144F727B4189"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270ebad-601f-0000-6838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '1715f0ec-0010-46b2-bc40-c09ab81574af',
  'Date',
  'Tue, 11 May 2021 07:36:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856868303048/directory162071857035207031')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921708371080',
  'x-ms-request-id',
  '1270ebb1-601f-0000-6c38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'e189ab8b-ed25-4e34-bdec-ae939e122e03',
  'Date',
  'Tue, 11 May 2021 07:36:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856868303048/directory162071857035207031')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c72b-f01e-0012-0b38-463670000000',
  'x-ms-client-request-id',
  'a51c3ebb-7b19-4191-88fe-bb4e5430f7ba',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:10 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071856868303048/directory162071857035207031')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F727B4189"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c746-f01e-0012-1d38-463670000000',
  'x-ms-client-request-id',
  '817414cc-60a2-4928-b255-4866782408c7',
  'x-ms-version',
  '2020-06-12',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:10 GMT',
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
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 11 May 2021 07:36:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856868303048')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c75c-f01e-0012-3138-463670000000',
  'x-ms-client-request-id',
  '2c862bd7-abd0-468e-b0cf-7647decdf1a3',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:10 GMT'
]);
