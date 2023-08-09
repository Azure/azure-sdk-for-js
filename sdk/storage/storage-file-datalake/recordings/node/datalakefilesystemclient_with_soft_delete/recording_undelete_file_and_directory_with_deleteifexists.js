let nock = require('nock');

module.exports.hash = "88e089e3db1010879cc34d83b27e35c6";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154833695305946","file":"file169154833709505011","directory":"directory169154833769406568"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833695305946')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'ETag',
  '"0x8DB9880D8D97988"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadca82-601e-0046-0369-cacd86000000',
  'x-ms-client-request-id',
  '9e931e73-4bd7-4c12-b72e-85c1ee498d3c',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833695305946/file169154833709505011')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'ETag',
  '"0x8DB9880D8F1044E"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1e1-601f-0024-3169-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6a6b2e82-1698-4561-ae12-f6f0ec086222',
  'Date',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833695305946/file169154833709505011')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219367385550',
  'x-ms-request-id',
  '0e7aa1e3-601f-0024-3369-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '01a901c8-dd9c-4ddd-b2f0-7b8921b2fec8',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833695305946/file169154833709505011')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcadc-601e-0046-3269-cacd86000000',
  'x-ms-client-request-id',
  'c8c9863b-6cff-460c-9932-6dc99a13b59f',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154833695305946/file169154833709505011')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB9880D8F1044E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcaea-601e-0046-3d69-cacd86000000',
  'x-ms-client-request-id',
  '6ae2d9ea-6c75-4bd3-a04e-1b5ceefe3e56',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:32:16 GMT',
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
  'Wed, 09 Aug 2023 02:32:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833695305946/directory169154833769406568')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'ETag',
  '"0x8DB9880D94B4369"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1e5-601f-0024-3469-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e2431e2e-ddd4-445c-af0f-5482413e78c8',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833695305946/directory169154833769406568')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219373095131',
  'x-ms-request-id',
  '0e7aa1e6-601f-0024-3569-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1d0ab53a-c333-436c-892a-144b577a3a59',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833695305946/directory169154833769406568')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcb09-601e-0046-5669-cacd86000000',
  'x-ms-client-request-id',
  '735f4bad-ceb0-4fbb-a17b-7adc1b829960',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154833695305946/directory169154833769406568')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB9880D94B4369"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcb36-601e-0046-6569-cacd86000000',
  'x-ms-client-request-id',
  '5a00917e-70b1-4500-8683-990642f70d1b',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:32:17 GMT',
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
  'Wed, 09 Aug 2023 02:32:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833695305946')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadcb44-601e-0046-7169-cacd86000000',
  'x-ms-client-request-id',
  '73c38cc9-7abf-4e52-8000-a0cbfeb40359',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:17 GMT'
]);
