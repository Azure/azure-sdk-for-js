let nock = require('nock');

module.exports.hash = "f15c4ddfac4e94083a45e24c0a1b367e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem162061904916506549","file":"file162061904947600699","directory":"directory162061905134509783"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904916506549')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:29 GMT',
  'ETag',
  '"0x8D91367BB640CD7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d2fb-801e-0045-0f50-459843000000',
  'x-ms-client-request-id',
  '899cea85-3523-408d-9064-7350241e2999',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904916506549/file162061904947600699')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:29 GMT',
  'ETag',
  '"0x8D91367BB95F01E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f93fc-201f-0073-0a50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '5f9b0ab2-dbf0-4d16-9c9a-b50cb97ea3a0',
  'Date',
  'Mon, 10 May 2021 03:57:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904916506549/file162061904947600699')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926502418024',
  'x-ms-request-id',
  '6d9f93fd-201f-0073-0b50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '51d876cb-b606-4e37-aca2-176b1ed4fa5d',
  'Date',
  'Mon, 10 May 2021 03:57:30 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904916506549/file162061904947600699')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d34a-801e-0045-4b50-459843000000',
  'x-ms-client-request-id',
  '35112a7a-2d82-498d-b67e-eb501bb4e2e9',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:29 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061904916506549/file162061904947600699')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367BB95F01E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d35f-801e-0045-5d50-459843000000',
  'x-ms-client-request-id',
  '73fb197f-555b-49df-95c2-18e207d46d35',
  'x-ms-version',
  '2020-06-12',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:29 GMT',
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
  'Mon, 10 May 2021 03:57:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904916506549/file162061904947600699')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926513212703',
  'x-ms-request-id',
  '6d9f93ff-201f-0073-0d50-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '8351581f-bb14-482b-94f5-0a0986490226',
  'Date',
  'Mon, 10 May 2021 03:57:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904916506549/directory162061905134509783')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 10 May 2021 03:57:31 GMT',
  'ETag',
  '"0x8D91367BCB1FDA1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '6d9f9406-201f-0073-1450-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'c2437234-472d-4fa3-ae4e-6944e4e898c5',
  'Date',
  'Mon, 10 May 2021 03:57:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904916506549/directory162061905134509783')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926520945438',
  'x-ms-request-id',
  '6d9f9407-201f-0073-1550-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  '798dd248-a9d8-4691-b8c4-8754a3b48d6e',
  'Date',
  'Mon, 10 May 2021 03:57:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem162061904916506549/directory162061905134509783')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d3d0-801e-0045-3e50-459843000000',
  'x-ms-client-request-id',
  'f268efdb-5e5d-472a-a2e7-a7f5829ea560',
  'x-ms-version',
  '2020-06-12',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:31 GMT',
  'Date',
  'Mon, 10 May 2021 03:57:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem162061904916506549/directory162061905134509783')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 10 May 2021 03:57:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D91367BCB1FDA1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d3e4-801e-0045-4d50-459843000000',
  'x-ms-client-request-id',
  'a59f797d-18e1-4ab8-bc28-916e8bff83f5',
  'x-ms-version',
  '2020-06-12',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 10 May 2021 03:57:31 GMT',
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
  'Mon, 10 May 2021 03:57:32 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904916506549/directory162061905134509783')
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '132650926530654373',
  'x-ms-request-id',
  '6d9f9409-201f-0073-1650-451533000000',
  'x-ms-version',
  '2020-06-12',
  'x-ms-client-request-id',
  'cba5e015-de64-4230-8336-d08ba83b0274',
  'Date',
  'Mon, 10 May 2021 03:57:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem162061904916506549')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8a8d3fe-801e-0045-6250-459843000000',
  'x-ms-client-request-id',
  'f41b5eb8-c6b8-42c8-be73-707d5dcd06fd',
  'x-ms-version',
  '2020-06-12',
  'Date',
  'Mon, 10 May 2021 03:57:32 GMT'
]);
