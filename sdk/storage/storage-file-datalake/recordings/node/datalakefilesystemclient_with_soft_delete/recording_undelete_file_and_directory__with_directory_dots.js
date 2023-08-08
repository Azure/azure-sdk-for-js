let nock = require('nock');

module.exports.hash = "9fcd161fbe0ffde62b0b60e1266f81f9";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154753187804711","file":"file169154753201209439","directory":"directory169154753276701736"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753187804711')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'ETag',
  '"0x8DB987EF8FAFA3D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27184-101e-002e-4667-caab16000000',
  'x-ms-client-request-id',
  'de2b0a3f-2786-4f0f-a273-ffe1920835b9',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:50 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753187804711/file169154753201209439')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'ETag',
  '"0x8DB987EF910CC29"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16744d6-f01f-0054-6167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c975c914-e16f-49c7-b3c5-663d95bf2fd2',
  'Date',
  'Wed, 09 Aug 2023 02:18:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753187804711/file169154753201209439')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211316420460',
  'x-ms-request-id',
  'f16744e1-f01f-0054-6c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'bd8fb092-bc43-457a-a66c-2494f0523e49',
  'Date',
  'Wed, 09 Aug 2023 02:18:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753187804711/file169154753201209439')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c271a3-101e-002e-5e67-caab16000000',
  'x-ms-client-request-id',
  '18349b8c-04bc-4168-8339-3ed3c506562a',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:50 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753187804711/file169154753201209439')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EF910CC29"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c271b0-101e-002e-6767-caab16000000',
  'x-ms-client-request-id',
  '0ac1b4dd-b38c-4878-822c-a51ae71c2335',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:51 GMT',
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
  'Wed, 09 Aug 2023 02:18:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753187804711/file169154753201209439')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211320923906',
  'x-ms-request-id',
  'f1674517-f01f-0054-2267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '81e6dfc1-28bd-4c20-938a-d5c72895435b',
  'Date',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753187804711/directory169154753276701736')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:52 GMT',
  'ETag',
  '"0x8DB987EF9830553"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167451c-f01f-0054-2767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2b9be891-03b5-4b07-a85b-4238e8290f56',
  'Date',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753187804711/directory169154753276701736')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211323819225',
  'x-ms-request-id',
  'f1674528-f01f-0054-3367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '94b77439-b4e0-4fca-9bd5-d2ad1e2627e3',
  'Date',
  'Wed, 09 Aug 2023 02:18:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753187804711/directory169154753276701736')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c271d0-101e-002e-0467-caab16000000',
  'x-ms-client-request-id',
  '9679aedf-9d87-45b1-8c57-c0f7383b7841',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:52 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753187804711/directory169154753276701736')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EF9830553"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c271e1-101e-002e-1267-caab16000000',
  'x-ms-client-request-id',
  '1f59cdd1-0fc4-4ce5-9dd4-4dea803a6dbf',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:52 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753187804711/directory169154753276701736')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211328110806',
  'x-ms-request-id',
  'f1674539-f01f-0054-4167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8a8d3d7b-d04d-4d62-8bf2-8c29cfb09262',
  'Date',
  'Wed, 09 Aug 2023 02:18:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753187804711')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c271f0-101e-002e-1f67-caab16000000',
  'x-ms-client-request-id',
  'a174f66c-2b1f-42c4-92d2-19e830f71dde',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:52 GMT'
]);
