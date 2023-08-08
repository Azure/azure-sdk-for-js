let nock = require('nock');

module.exports.hash = "2359ef790236ecbba658beabd5887f42";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154754161809518","file":"file169154754176206160","tempfile2":"tempfile2169154754217708067"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754161809518')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'ETag',
  '"0x8DB987EFEC96503"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27483-101e-002e-1867-caab16000000',
  'x-ms-client-request-id',
  '1a4df2e4-0ea7-44f4-ac87-7ed7020375a4',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754161809518/file169154754176206160')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'ETag',
  '"0x8DB987EFEE0E1E3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167468c-f01f-0054-1067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '496fa1cb-6f3c-451c-ae9d-84dea849e38f',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754161809518/file169154754176206160', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674690-f01f-0054-1467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e6393432-278c-49e8-8706-cafd4542f9f8',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754161809518/file169154754176206160')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'ETag',
  '"0x8DB987EFF0B55CB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674695-f01f-0054-1967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1eb320b3-d62d-4cd2-81c6-47b0f31fd763',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154754161809518/tempfile2169154754217708067')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'ETag',
  '"0x8DB987EFF1FB925"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167469b-f01f-0054-1f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd76719c2-7eab-4daa-a7dc-548eeb5e5af5',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154754161809518/tempfile2169154754217708067')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFF1FB925"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c274bd-101e-002e-4167-caab16000000',
  'x-ms-client-request-id',
  '41889072-cd6f-40cd-bece-5290058f6372',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:01 GMT',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'fixed',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:19:00 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754161809518/tempfile2169154754217708067', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-lease-renewed',
  'true',
  'x-ms-request-id',
  'f1674855-f01f-0054-3367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'f883a297-153f-441c-92e7-7d6ca7a2bde1',
  'Date',
  'Wed, 09 Aug 2023 02:19:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154754161809518/tempfile2169154754217708067', "HelloWorld")
  .query(true)
  .reply(412, {"error":{"code":"LeaseIdMissing","message":"There is currently a lease on the resource and no lease ID was specified in the request.\nRequestId:f1674856-f01f-0054-3467-cab656000000\nTime:2023-08-09T02:19:17.0701968Z"}}, [
  'Content-Length',
  '219',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  'f1674856-f01f-0054-3467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'd3c40572-19d6-42d7-a237-9ef8c697201e',
  'Date',
  'Wed, 09 Aug 2023 02:19:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154754161809518/tempfile2169154754217708067')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211572017073',
  'x-ms-request-id',
  'f1674857-f01f-0054-3567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '52fe554a-39b8-4d2c-86a1-b20a540f2a90',
  'Date',
  'Wed, 09 Aug 2023 02:19:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154754161809518')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27a8a-101e-002e-7867-caab16000000',
  'x-ms-client-request-id',
  '1d9b4df8-8dd7-429e-b578-b22f22b93619',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:16 GMT'
]);
