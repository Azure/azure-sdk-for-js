let nock = require('nock');

module.exports.hash = "93d1e1b00d1d680f8d47cd41f6018416";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154758133408631","file":"file169154758147808393","tempfile2":"tempfile2169154758185509554"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758133408631')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'ETag',
  '"0x8DB987F16757034"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c28379-101e-002e-7167-caab16000000',
  'x-ms-client-request-id',
  '5277ebb0-4f3f-4c35-9d0a-106c2b371f09',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:39 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758133408631/file169154758147808393')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'ETag',
  '"0x8DB987F168CCF57"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674b5d-f01f-0054-0c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '027bba7a-745b-41bd-8c4e-ba9885e1838a',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/file169154758147808393', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674b6d-f01f-0054-1c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4ead94e2-718f-475d-8c20-66eac1340578',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/file169154758147808393')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'ETag',
  '"0x8DB987F16B3B48D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674b7e-f01f-0054-2d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e06385b2-ce07-41ad-9254-f07205917202',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154758133408631/tempfile2169154758185509554')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'ETag',
  '"0x8DB987F16C6CCA0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674b8c-f01f-0054-3b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6dea1a4a-da54-4e01-a6f8-a2f708708392',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/tempfile2169154758185509554', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674b9c-f01f-0054-4b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3ff4d6f2-f5bd-4a11-95a6-bafbea33bd9f',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/tempfile2169154758185509554', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674ba8-f01f-0054-5767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'eb6bf719-728b-431c-8a17-d62fb6f3ed6c',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/tempfile2169154758185509554', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674bb4-f01f-0054-6367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '864f8f57-b599-44d2-9301-a820f0e1e633',
  'Date',
  'Wed, 09 Aug 2023 02:19:40 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154758133408631/tempfile2169154758185509554')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'ETag',
  '"0x8DB987F170FF2BC"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674bc8-f01f-0054-7767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '77dff488-2972-4f93-b86c-f13fb087278d',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154758133408631/tempfile2169154758185509554')
  .reply(200, "", [
  'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F170FF2BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2843e-101e-002e-2367-caab16000000',
  'x-ms-client-request-id',
  '33d67c9b-c137-46df-ad53-0e79b8698a48',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:41 GMT',
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
  'Wed, 09 Aug 2023 02:19:41 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154758133408631/tempfile2169154758185509554')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211820700928',
  'x-ms-request-id',
  'f1674bdd-f01f-0054-0c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '40ca7715-1d4f-47d5-a85a-ab831a8cda59',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154758133408631')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2847e-101e-002e-6067-caab16000000',
  'x-ms-client-request-id',
  '7ad4d203-c86d-43c4-8f52-ecb74322aabf',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:41 GMT'
]);
