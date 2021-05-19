let nock = require('nock');

module.exports.hash = "ab1cfcd5d04cca2f560e4a1e60a4754b";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162071856513802085","file":"file162071856544706209"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856513802085')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:05 GMT',
  'ETag',
  '"0x8D9144F6F5E70A7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c534-f01e-0012-6f38-463670000000',
  'x-ms-client-request-id',
  '951e90f3-72e7-4577-9410-1e93a3eceac8',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:04 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856513802085/file162071856544706209')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:05 GMT',
  'ETag',
  '"0x8D9144F6F9056D6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270eac6-601f-0000-0838-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '61b3fb4d-de43-468b-afec-6b67d3523bbc',
  'Date',
  'Tue, 11 May 2021 07:36:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856513802085/file162071856544706209')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921659456798',
  'x-ms-request-id',
  '1270eaed-601f-0000-2e38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'ad61cc01-734a-45f1-89ab-f36655f02f00',
  'Date',
  'Tue, 11 May 2021 07:36:05 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856513802085/file162071856544706209')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 11 May 2021 07:36:06 GMT',
  'ETag',
  '"0x8D9144F6FF2AFCE"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1270eb08-601f-0000-4938-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c0b9971d-5b36-4d4c-9a95-e4f312330907',
  'Date',
  'Tue, 11 May 2021 07:36:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856513802085/file162071856544706209')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921665769422',
  'x-ms-request-id',
  '1270eb1a-601f-0000-5a38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'fdb917bd-e423-4448-ad3a-9b0a573e83bc',
  'Date',
  'Tue, 11 May 2021 07:36:06 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856513802085/file162071856544706209')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c5bf-f01e-0012-6338-463670000000',
  'x-ms-client-request-id',
  '7dfd9bcf-b74c-42f5-bcf5-db19f4b6143f',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:06 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:06 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162071856513802085/file162071856544706209')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 11 May 2021 07:36:06 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D9144F6FF2AFCE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c5d7-f01e-0012-7b38-463670000000',
  'x-ms-client-request-id',
  '4ac7ca25-bded-406a-afbd-733df24d8127',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:06 GMT',
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
  'Tue, 11 May 2021 07:36:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856513802085/file162071856544706209')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132651921675218987',
  'x-ms-request-id',
  '1270eb3d-601f-0000-7d38-464da0000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '58c8d690-1e9a-444a-a1f3-1f57500eadcc',
  'Date',
  'Tue, 11 May 2021 07:36:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162071856513802085/file162071856544706209')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c606-f01e-0012-2338-463670000000',
  'x-ms-client-request-id',
  '2ec72a8a-b2fe-48e3-9fd4-793b88c29b6a',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 11 May 2021 07:36:05 GMT',
  'Date',
  'Tue, 11 May 2021 07:36:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162071856513802085')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69c4c63d-f01e-0012-4c38-463670000000',
  'x-ms-client-request-id',
  '31cda308-b677-44a9-8fe5-bfbdc77bfc31',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Tue, 11 May 2021 07:36:07 GMT'
]);
