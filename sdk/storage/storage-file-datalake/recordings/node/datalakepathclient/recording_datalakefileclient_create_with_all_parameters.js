let nock = require('nock');

module.exports.hash = "d49254e929e30988889f662d94445383";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230689091500198","file":"file168230689103109197","testfile":"testfile168230689167508362"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689091500198')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'ETag',
  '"0x8DB4473EE2EA985"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232da05-401e-000c-6c5c-766e09000000',
  'x-ms-client-request-id',
  'a791e1a0-3ded-494f-8c89-9296dde186e2',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:10 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689091500198/file168230689103109197')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'ETag',
  '"0x8DB4473EE719B28"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1f290c69-c01f-003d-315c-768f1a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'e3130aca-bee5-4944-b2a3-39b7d6d44879',
  'Date',
  'Mon, 24 Apr 2023 03:28:10 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689091500198/file168230689103109197', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1f290c6a-c01f-003d-325c-768f1a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'fbb5fb4a-3f15-49eb-9fc0-c47d5cf56b89',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689091500198/file168230689103109197')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'ETag',
  '"0x8DB4473EE9385E1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '1f290c6b-c01f-003d-335c-768f1a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'fe61da22-94ad-47b5-948e-fa4249c05d2a',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689091500198/testfile168230689167508362')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'ETag',
  '"0x8DB4473EEA3D99F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1f290c6c-c01f-003d-345c-768f1a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'bce2aea5-2546-4679-a168-09f6b17564f9',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230689091500198/testfile168230689167508362')
  .reply(200, [], [
  'Cache-Control',
  'control',
  'Content-Length',
  '0',
  'Content-Type',
  'type/subtype',
  'Content-Encoding',
  'encoding',
  'Content-Language',
  'language',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EEA3D99F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dabe-401e-000c-7a5c-766e09000000',
  'x-ms-client-request-id',
  'a01726de-b9ff-4b01-81cd-56aa0073dada',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'x-ms-expiry-time',
  'Mon, 24 Apr 2023 03:29:11 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'disposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-context',
  'EncryptionContext',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-expiry-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-encryption-context,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:10 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230689091500198/testfile168230689167508362')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:11 GMT',
  'ETag',
  '"0x8DB4473EEA3D99F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  '1f290c6d-c01f-003d-355c-768f1a000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'dcab50d5-d9bf-447a-810c-0bb3af73362f',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230689091500198')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232daf4-401e-000c-255c-766e09000000',
  'x-ms-client-request-id',
  '07ebf4f3-adf7-469d-a380-779937ada1c8',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT'
]);
