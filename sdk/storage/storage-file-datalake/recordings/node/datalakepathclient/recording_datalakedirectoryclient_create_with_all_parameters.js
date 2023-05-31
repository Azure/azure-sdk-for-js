let nock = require('nock');

module.exports.hash = "555ad1c096d406d9bbd8639505a1f054";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem168230689210307273","file":"file168230689222103127","testdir":"testdir168230689285809315"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689210307273')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'ETag',
  '"0x8DB4473EEE42364"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232db0e-401e-000c-385c-766e09000000',
  'x-ms-client-request-id',
  'dbcbe09e-dd20-4f04-93b3-ef3a575060c6',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:11 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689210307273/file168230689222103127')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'ETag',
  '"0x8DB4473EF261911"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8e2be5e4-c01f-0060-7c5c-76859e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '532c32b4-834c-40dc-bc44-d20043987d54',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689210307273/file168230689222103127', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8e2be5e5-c01f-0060-7d5c-76859e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '50bf9abe-b851-4fba-a57b-1f5e13d96d40',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem168230689210307273/file168230689222103127')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'ETag',
  '"0x8DB4473EF479AA7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '8e2be5e6-c01f-0060-7e5c-76859e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  'e0b21dea-0a58-469d-8ddd-0a17f00fb46f',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem168230689210307273/testdir168230689285809315')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'ETag',
  '"0x8DB4473EF5868DA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '8e2be5e7-c01f-0060-7f5c-76859e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '80663d6f-f4fc-4ead-878d-c7a00e2620db',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230689210307273/testdir168230689285809315')
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
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB4473EF5868DA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dbb2-401e-000c-345c-766e09000000',
  'x-ms-client-request-id',
  '661f6cf7-0996-44f5-87b1-bac79c2c4732',
  'x-ms-version',
  '2023-01-03',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Mon, 24 Apr 2023 03:28:13 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem168230689210307273/testdir168230689285809315')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Mon, 24 Apr 2023 03:28:13 GMT',
  'ETag',
  '"0x8DB4473EF5868DA"',
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
  '8e2be5e8-c01f-0060-805c-76859e000000',
  'x-ms-version',
  '2023-01-03',
  'x-ms-client-request-id',
  '808a1693-ff79-40ad-bf7c-59f4e500ef61',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem168230689210307273')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b232dbd6-401e-000c-505c-766e09000000',
  'x-ms-client-request-id',
  '84cd6346-0aa5-491a-98a7-088481fee261',
  'x-ms-version',
  '2023-01-03',
  'Date',
  'Mon, 24 Apr 2023 03:28:12 GMT'
]);
