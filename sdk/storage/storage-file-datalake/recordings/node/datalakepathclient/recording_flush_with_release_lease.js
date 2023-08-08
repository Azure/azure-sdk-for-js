let nock = require('nock');

module.exports.hash = "6ff378d8bd52cb0191b161d15946344c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154757838208997","file":"file169154757852208445","tempfile2":"tempfile2169154757894206522"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757838208997')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'ETag',
  '"0x8DB987F14B2F410"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c281ee-101e-002e-1e67-caab16000000',
  'x-ms-client-request-id',
  'f367c92a-c30c-46aa-b7c4-d0c554e776cd',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:36 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757838208997/file169154757852208445')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'ETag',
  '"0x8DB987F14C9B3D4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a43-f01f-0054-7567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'f0446e8a-bd5b-455e-b701-ef8c583592b1',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757838208997/file169154757852208445', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a4a-f01f-0054-7c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b7f17a1c-c3e8-445e-a048-e20214712085',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757838208997/file169154757852208445')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'ETag',
  '"0x8DB987F14F3EC5E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674a4d-f01f-0054-7f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '14fc5249-ce7f-4c92-a188-fc62dc5a44b6',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154757838208997/tempfile2169154757894206522')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'ETag',
  '"0x8DB987F150963A2"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a53-f01f-0054-0467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '169f377b-53bb-4a1f-8251-2cf07af84dd7',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757838208997/tempfile2169154757894206522', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a59-f01f-0054-0a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7a640684-31d9-4fe3-8260-3e624cd10423',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757838208997/tempfile2169154757894206522', "HelloWorld")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674a5d-f01f-0054-0e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '10a1ff1d-0688-4aa3-8a1b-b1a255d70839',
  'Date',
  'Wed, 09 Aug 2023 02:19:37 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154757838208997/tempfile2169154757894206522')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'ETag',
  '"0x8DB987F1545FC28"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1674a65-f01f-0054-1667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e03d9789-80b1-420e-90bd-58f97c9dadbf',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154757838208997/tempfile2169154757894206522')
  .reply(200, "", [
  'Content-Length',
  '20',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987F1545FC28"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c282a1-101e-002e-4167-caab16000000',
  'x-ms-client-request-id',
  '6e4ea411-9a1a-4b28-b70f-a656130978ab',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:19:38 GMT',
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
  'Wed, 09 Aug 2023 02:19:38 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154757838208997/tempfile2169154757894206522')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211790700420',
  'x-ms-request-id',
  'f1674a74-f01f-0054-2567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ab5c0ce5-5097-48c3-aa88-9547650383aa',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154757838208997')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c282d3-101e-002e-6367-caab16000000',
  'x-ms-client-request-id',
  '19616855-82d0-4190-b42a-a41282b375ec',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:19:38 GMT'
]);
