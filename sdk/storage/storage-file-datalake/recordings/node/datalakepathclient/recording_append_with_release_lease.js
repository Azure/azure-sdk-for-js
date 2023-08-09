let nock = require('nock');

module.exports.hash = "ab8c80a9e76a7783069554765c4f3833";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154755831505553","file":"file169154755845705326","tempfile2":"tempfile2169154755918604996"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154755831505553')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'ETag',
  '"0x8DB987F08BD0F10"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27ac9-101e-002e-2f67-caab16000000',
  'x-ms-client-request-id',
  '54de23dc-78c6-4da2-98fd-cf9b2b9c74b6',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154755831505553/file169154755845705326')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'ETag',
  '"0x8DB987F08D41AEC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674858-f01f-0054-3667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ca0fe641-4111-4b57-b59f-b8807d44467d',
  'Date',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154755831505553/file169154755845705326', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674859-f01f-0054-3767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '131c66b7-6fca-4d98-b9a7-1354442ce1f5',
  'Date',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154755831505553/file169154755845705326')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'ETag',
  '"0x8DB987F092DC3ED"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f167487e-f01f-0054-5c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '13c140da-5f43-443b-9841-77311b3f047a',
  'Date',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154755831505553/tempfile2169154755918604996')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'ETag',
  '"0x8DB987F0942DF0D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167488a-f01f-0054-6867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '492941d5-1db8-49e4-b5ac-9d9dfa9f49fd',
  'Date',
  'Wed, 09 Aug 2023 02:19:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154755831505553/tempfile2169154755918604996', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674894-f01f-0054-7267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1797dcd9-5864-40fc-aaf2-e360743c732c',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154755831505553/tempfile2169154755918604996', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'ETag',
  '"0x8DB987F096EF338"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16748a8-f01f-0054-0667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6027e557-2b04-4403-afc2-35d37b703a65',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154755831505553/tempfile2169154755918604996')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/json',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F096EF338"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27b3c-101e-002e-1967-caab16000000',
  'x-ms-client-request-id',
  'a1126355-9854-46c5-bfac-208cb3d23da1',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:18 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154755831505553/tempfile2169154755918604996')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211592242918',
  'x-ms-request-id',
  'f16748c4-f01f-0054-2267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'efe1e268-3e77-4a4a-a6d2-6dd8500790dc',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154755831505553')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27b5e-101e-002e-3667-caab16000000',
  'x-ms-client-request-id',
  '0b4a4246-8db1-495c-abed-3e18b7433315',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:18 GMT'
]);
