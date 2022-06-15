let nock = require('nock');

module.exports.hash = "d1f3acad2d8c6d291bb80020116372c0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165569024431806850","file":"file165569024739007063"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165569024431806850')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:27 GMT',
  'ETag',
  '"0x8DA52603A52C7CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1ab9d2b-901e-0014-1349-84be4e000000',
  'x-ms-client-request-id',
  '5a7a106e-f68d-4313-a736-c84bcedac49c',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:57:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165569024431806850/file165569024739007063')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:29 GMT',
  'ETag',
  '"0x8DA52603B7CED42"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'a5b9b447-c01f-0009-0249-84b3f2000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '2f66b060-bdea-4fdc-b266-ba0daee58f26',
  'Date',
  'Mon, 20 Jun 2022 01:57:29 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165569024431806850/file165569024739007063')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 20 Jun 2022 01:57:29 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA52603B7CED42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1ab9f2f-901e-0014-6c49-84be4e000000',
  'x-ms-client-request-id',
  '7c915c1a-335b-4b23-bf33-6f50b97988b6',
  'x-ms-version',
  '2021-06-08',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Mon, 20 Jun 2022 01:57:29 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-scope,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 20 Jun 2022 01:57:29 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165569024431806850')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1ab9f78-901e-0014-1b49-84be4e000000',
  'x-ms-client-request-id',
  'b03633ef-5661-43c7-a5bd-43e696bfe689',
  'x-ms-version',
  '2021-06-08',
  'Date',
  'Mon, 20 Jun 2022 01:57:29 GMT'
]);
