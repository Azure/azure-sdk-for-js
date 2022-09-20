let nock = require('nock');

module.exports.hash = "33c9ca91414f7662a44d52aaeb9a68ca";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165881686135906220","file":"file165881686204805318"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165881686135906220')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'ETag',
  '"0x8DA6ECFF1FCA9FC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb8791c1-e01e-0058-43b8-a0215e000000',
  'x-ms-client-request-id',
  '042a75e2-0f7b-47d7-8186-e9b43c0e0c25',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165881686135906220/file165881686204805318')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'ETag',
  '"0x8DA6ECFF25F4C80"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'bfc4cc08-401f-0041-29b8-a0a1e5000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'b64b316d-03c6-43ac-a9d3-131bcc6abcaa',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165881686135906220/file165881686204805318', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'bfc4cc09-401f-0041-2ab8-a0a1e5000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '33d98d36-a201-4c12-9f4b-72bee71c1d77',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165881686135906220/file165881686204805318')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 26 Jul 2022 06:27:43 GMT',
  'ETag',
  '"0x8DA6ECFF281D269"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'bfc4cc0a-401f-0041-2bb8-a0a1e5000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '5469220a-3beb-4f40-8411-0d6cc32ac307',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem165881686135906220/file165881686204805318')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 26 Jul 2022 06:27:43 GMT',
  'ETag',
  '"0x8DA6ECFF281D269"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'bfc4cc0b-401f-0041-2cb8-a0a1e5000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '590ccd10-7ed7-4a10-9903-4f404c51156b',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165881686135906220/file165881686204805318')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Tue, 26 Jul 2022 06:27:43 GMT',
  'ETag',
  '"0x8DA6ECFF281D269"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-x-wT',
  'x-ms-acl',
  'user::rw-,group::r-x,other::-w-',
  'x-ms-request-id',
  'bfc4cc0c-401f-0041-2db8-a0a1e5000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '9a3c063d-6449-4a3d-9e85-30f4d6b5dee9',
  'Access-Control-Expose-Headers',
  'Content-Length,Date,ETag,Last-Modified,Server,x-ms-acl,x-ms-client-request-id,x-ms-group,x-ms-owner,x-ms-permissions,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 26 Jul 2022 06:27:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165881686135906220')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb879228-e01e-0058-14b8-a0215e000000',
  'x-ms-client-request-id',
  'de7c4835-5b5c-4c4e-a872-8b20f0af93fc',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 26 Jul 2022 06:27:43 GMT'
]);
