let nock = require('nock');

module.exports.hash = "35fa030f64937c2ac5becba6d4895e84";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154753631406743"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'ETag',
  '"0x8DB987EFB9FECC2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c272ee-101e-002e-6167-caab16000000',
  'x-ms-client-request-id',
  '3d2e7602-bd8c-42b3-aeba-bc3ad817affd',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:54 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'ETag',
  '"0x8DB987EFBB75528"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1674599-f01f-0054-2167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2fedf6fa-19e5-4f50-a643-b06c01e0baa2',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753631406743/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211360875432',
  'x-ms-request-id',
  'f167459a-f01f-0054-2267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ee032a28-78f2-46d7-b026-40220d5aab3b',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27311-101e-002e-7e67-caab16000000',
  'x-ms-client-request-id',
  'e4e8f043-fc7e-4f5f-9e4e-63c257a4fdd2',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753631406743/!%27()%3B%5B%5D%40%26%25%3D%2B%24%2C%23%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%3B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFBB75528"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2731f-101e-002e-0967-caab16000000',
  'x-ms-client-request-id',
  '4aa4dc3e-9285-417f-8e5e-74365f10237b',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:55 GMT',
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
  'Wed, 09 Aug 2023 02:18:55 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:56 GMT',
  'ETag',
  '"0x8DB987EFC0B64C9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16745a6-f01f-0054-2e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e6483bc7-ef90-4d7e-9929-b595094831ba',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753631406743/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211366085081',
  'x-ms-request-id',
  'f16745aa-f01f-0054-3267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '1f98297a-ac90-4757-8236-02659696a05b',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2732e-101e-002e-1567-caab16000000',
  'x-ms-client-request-id',
  'e7fbad06-2846-4e7b-b774-a5f783382117',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:56 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:55 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753631406743/%2521%2527%2528%2529%253B%255B%255D%2540%2526%2525%253D%252B%2524%252C%2523%C3%A4%C3%84%C3%B6%C3%96%C3%BC%C3%9C%C3%9F%253B')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:56 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFC0B64C9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27336-101e-002e-1d67-caab16000000',
  'x-ms-client-request-id',
  '2beaed45-fa5c-44ee-95c9-44bcd1f5f9a2',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:56 GMT',
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
  'Wed, 09 Aug 2023 02:18:55 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'ETag',
  '"0x8DB987EFC595C2D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f16745b2-f01f-0054-3967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b95850fa-0c6c-4b70-8dff-b780abeacebd',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753631406743/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211371188104',
  'x-ms-request-id',
  'f16745b7-f01f-0054-3e67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '02316c9c-5e06-4102-a82f-cdf7f913148f',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154753631406743/%20a%20file%20or%20directory%20')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27348-101e-002e-2e67-caab16000000',
  'x-ms-client-request-id',
  'a3bc3804-4f63-4dd6-8368-e02d3c30ba8d',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem169154753631406743/%20a%20file%20or%20directory%20')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:57 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB987EFC595C2D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27354-101e-002e-3667-caab16000000',
  'x-ms-client-request-id',
  'a8088612-1916-4f66-8d39-aa1b282274e5',
  'x-ms-version',
  '2023-08-03',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 09 Aug 2023 02:18:57 GMT',
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
  'Wed, 09 Aug 2023 02:18:56 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154753631406743')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c27359-101e-002e-3a67-caab16000000',
  'x-ms-client-request-id',
  'ad1c021c-d784-4e87-aee9-6e3886ecebd4',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:56 GMT'
]);
