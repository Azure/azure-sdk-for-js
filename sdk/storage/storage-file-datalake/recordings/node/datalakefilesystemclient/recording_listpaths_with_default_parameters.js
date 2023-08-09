let nock = require('nock');

module.exports.hash = "ddbbb8b9f5a89926db8e9d8763b99c97";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154749912703885","file0":"file0169154749998308089","file1":"file1169154750071809292","file2":"file2169154750085204652"},"newDate":{"now":"2023-08-09T02:18:19.983Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154749912703885')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:19 GMT',
  'ETag',
  '"0x8DB987EE5DE9EE8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2617f-101e-002e-5e67-caab16000000',
  'x-ms-client-request-id',
  '062d2438-b6b3-4330-88a4-102b63c59db1',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:18 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154749912703885/file0169154749998308089')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'ETag',
  '"0x8DB987EE652E320"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d21-f01f-0054-6a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6bc6fbcf-3608-4e90-b08c-ecd1f7070a4e',
  'Date',
  'Wed, 09 Aug 2023 02:18:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154749912703885/file1169154750071809292')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'ETag',
  '"0x8DB987EE66A351A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d24-f01f-0054-6d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e4050d7b-b127-467a-9fef-efa2c1b27a4d',
  'Date',
  'Wed, 09 Aug 2023 02:18:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154749912703885/file2169154750085204652')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'ETag',
  '"0x8DB987EE67E5A3F"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d27-f01f-0054-7067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5cd7027b-9588-46db-9b39-ca35aa47e572',
  'Date',
  'Wed, 09 Aug 2023 02:18:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154749912703885')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211000550176","etag":"0x8DB987EE652E320","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:20 GMT","name":"file0169154749998308089","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211002078490","etag":"0x8DB987EE66A351A","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:20 GMT","name":"file1169154750071809292","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211003398719","etag":"0x8DB987EE67E5A3F","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:20 GMT","name":"file2169154750085204652","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d2a-f01f-0054-7367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '44af5ecd-0846-49f7-aebe-e7d9cf741ac9',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:19 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154749912703885/file0169154749998308089')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211006098425',
  'x-ms-request-id',
  'f1673d2b-f01f-0054-7467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3648e76a-1d47-42af-9c6e-2bdec3d11aba',
  'Date',
  'Wed, 09 Aug 2023 02:18:19 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154749912703885/file1169154750071809292')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211007623349',
  'x-ms-request-id',
  'f1673d2f-f01f-0054-7567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c5a48b16-bfd6-484f-a7ef-66cbcb7438b6',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154749912703885/file2169154750085204652')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211009134106',
  'x-ms-request-id',
  'f1673d31-f01f-0054-7767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'afb03eab-93db-4dab-9143-5757750988f6',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154749912703885')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2624b-101e-002e-0f67-caab16000000',
  'x-ms-client-request-id',
  'e787c2f2-610b-4e6b-93a8-4514a40109d4',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT'
]);
