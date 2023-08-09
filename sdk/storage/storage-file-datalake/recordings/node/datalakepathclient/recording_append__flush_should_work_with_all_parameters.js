let nock = require('nock');

module.exports.hash = "70ed68d3d946cb3e2ff18e12773f532c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154758288005619","file":"file169154758302308187","tempfile2":"tempfile2169154758344608718"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758288005619')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'ETag',
  '"0x8DB987F17615B16"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28485-101e-002e-6767-caab16000000',
  'x-ms-client-request-id',
  'aadbd0c9-bd4d-4c9c-bf67-e8f4916d07e8',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758288005619/file169154758302308187')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'ETag',
  '"0x8DB987F17781EB7"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674bf6-f01f-0054-2567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd0cc9a59-43ea-4484-8380-9215ff4cd96d',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/file169154758302308187', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674bfe-f01f-0054-2d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1ec7f29d-236f-4e6e-9ad2-27d32fadd0fe',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/file169154758302308187')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'ETag',
  '"0x8DB987F17A231EB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674c03-f01f-0054-3267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '853f024a-14b8-4a68-a28d-dfe0e002132f',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758288005619/tempfile2169154758344608718')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'ETag',
  '"0x8DB987F17B83F06"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674c06-f01f-0054-3567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd46a477a-752c-419f-aaa2-74fc18982c53',
  'Date',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154758288005619/tempfile2169154758344608718')
  .reply(200, [], [
  'Cache-Control',
  'cacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'contentType',
  'Content-Encoding',
  'contentEncoding',
  'Content-Language',
  'contentLanguage',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F17B83F06"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c284d2-101e-002e-2a67-caab16000000',
  'x-ms-client-request-id',
  'ad5c27f7-4399-45bc-832f-db2954dba853',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'val-a',
  'x-ms-meta-b',
  'val-b',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition',
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
  '---------',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154758288005619/tempfile2169154758344608718')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'ETag',
  '"0x8DB987F17B83F06"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  'f1674c0a-f01f-0054-3967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b7f69f39-40db-47d5-b519-cdc4c6625405',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/tempfile2169154758344608718', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46cf5edf-301f-0006-4f67-cacabe000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8d58aa1d-c27c-4d7f-a6bf-404303e53019',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/tempfile2169154758344608718', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46cf5ee5-301f-0006-5567-cacabe000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5e07d69a-dc82-419b-b148-d2d973068d22',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/tempfile2169154758344608718', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '46cf5ee8-301f-0006-5867-cacabe000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '82f23f1e-f80f-4ade-bf91-fb83c76801a4',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758288005619/tempfile2169154758344608718')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:44 GMT',
  'ETag',
  '"0x8DB987F186DBF2B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '46cf5ee9-301f-0006-5967-cacabe000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd552e70e-ee18-4ca5-a12d-fa1335c421a0',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154758288005619/tempfile2169154758344608718')
  .reply(200, [], [
  'Cache-Control',
  'cacheControl2',
  'Content-Length',
  '30',
  'Content-Type',
  'contentType2',
  'Content-Encoding',
  'contentEncoding2',
  'Content-Language',
  'contentLanguage2',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:44 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F186DBF2B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28572-101e-002e-1f67-caab16000000',
  'x-ms-client-request-id',
  'f4015b9b-8f1b-437d-9e20-c7018a9cee44',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-meta-a',
  'val-a',
  'x-ms-meta-b',
  'val-b',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:42 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition2',
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
  '---------',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154758288005619/tempfile2169154758344608718')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211843545987',
  'x-ms-request-id',
  '46cf5ef1-301f-0006-6167-cacabe000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '96f68e7a-2bb0-45cc-99a8-fe568c3f1ff4',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154758288005619')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28593-101e-002e-3b67-caab16000000',
  'x-ms-client-request-id',
  'e9c7a474-0a84-4ca2-a064-d747e6848acd',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:43 GMT'
]);
