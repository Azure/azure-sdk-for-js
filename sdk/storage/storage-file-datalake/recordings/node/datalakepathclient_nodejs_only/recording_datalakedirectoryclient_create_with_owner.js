let nock = require('nock');

module.exports.hash = "58453d8aaf328ac20dc4c6d12f539562";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230688737106552","file":"file168230688748500449","testdir":"testdir168230688813405575"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688737106552')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'ETag',
  '"0x8DB4473EC120BE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d7dd-401e-000c-425c-766e09000000',
  'x-ms-client-request-id',
  'da1fb6ee-10d0-4245-a7be-650d2521fe3f',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:06 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688737106552/file168230688748500449')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'ETag',
  '"0x8DB4473EC54E53A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1eaa142-c01f-004f-685c-768855000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '3c0a5ea1-fe2d-458b-ad04-c9ff887217a8',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688737106552/file168230688748500449', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1eaa144-c01f-004f-6a5c-768855000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'c55990aa-8ed9-454c-85ca-3f05cd178521',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230688737106552/file168230688748500449')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'ETag',
  '"0x8DB4473EC7703D6"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'a1eaa145-c01f-004f-6b5c-768855000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '772ddd73-9b4f-4ecd-b931-4c475a67d1fe',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230688737106552/testdir168230688813405575')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'ETag',
  '"0x8DB4473EC874B35"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'a1eaa147-c01f-004f-6d5c-768855000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'bcb5c106-2131-462e-8398-62923b38a724',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688737106552/testdir168230688813405575')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'ETag',
  '"0x8DB4473EC874B35"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '25fb43dd-e251-48a8-903b-e924f405299a',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'x-ms-acl',
  'user::rwx,group::r-x,other::---',
  'x-ms-request-id',
  'a1eaa149-c01f-004f-6f5c-768855000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '138e0690-e60c-4b6f-a789-eaf745304ed1',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230688737106552/testdir168230688813405575')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EC874B35"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d877-401e-000c-365c-766e09000000',
  'x-ms-client-request-id',
  '73130006-51c4-44df-a3c2-39dd49fbb69f',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:08 GMT',
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
  '25fb43dd-e251-48a8-903b-e924f405299a',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230688737106552')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232d884-401e-000c-3f5c-766e09000000',
  'x-ms-client-request-id',
  'd9e80820-c23c-46c6-bc09-6719b3b34931',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:07 GMT'
]);
