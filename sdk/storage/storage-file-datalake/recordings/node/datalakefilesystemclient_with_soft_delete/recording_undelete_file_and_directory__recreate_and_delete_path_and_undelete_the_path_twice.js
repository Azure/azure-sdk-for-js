let nock = require('nock');

module.exports.hash = "02b66835354b11f1dc2d44fd36753f80";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154753492701433","file":"file169154753508103616"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753492701433')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'ETag',
  '"0x8DB987EFACC8F53"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2727d-101e-002e-0567-caab16000000',
  'x-ms-client-request-id',
  'f97f73f6-65ed-447b-80a0-06eb33dc7045',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:53 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'ETag',
  '"0x8DB987EFAE5265E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f167457a-f01f-0054-0267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ec347626-8acc-4bab-a19d-7c537974fd78',
  'Date',
  'Wed, 09 Aug 2023 02:18:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211347025047',
  'x-ms-request-id',
  'f167457f-f01f-0054-0767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b3ec9f7b-3479-4c18-b611-e11ca3d92e28',
  'Date',
  'Wed, 09 Aug 2023 02:18:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'ETag',
  '"0x8DB987EFB10923F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674587-f01f-0054-0f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '89bfa358-36bc-42ac-b340-c1d60a06fee0',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211349885431',
  'x-ms-request-id',
  'f167458c-f01f-0054-1467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0fbb7e76-9f4b-4021-a722-13b74011f82e',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c272a7-101e-002e-2867-caab16000000',
  'x-ms-client-request-id',
  '79346b28-5b59-40ea-92c9-6af1f89f14ee',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753492701433/file169154753508103616')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFB10923F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c272b0-101e-002e-3067-caab16000000',
  'x-ms-client-request-id',
  'd6bb92f9-ea95-41f8-bce6-0d568d4615f2',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:54 GMT',
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
  'Wed, 09 Aug 2023 02:18:54 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211353740832',
  'x-ms-request-id',
  'f1674591-f01f-0054-1967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '24895943-adf5-4848-a1af-7ed1b319293f',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753492701433/file169154753508103616')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c272ca-101e-002e-4167-caab16000000',
  'x-ms-client-request-id',
  'c2368b28-eadd-4477-9cd3-c03b29943b4d',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:54 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753492701433')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c272e0-101e-002e-5567-caab16000000',
  'x-ms-client-request-id',
  '372fd8d0-2798-46ab-90af-638f20c4fb09',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT'
]);
