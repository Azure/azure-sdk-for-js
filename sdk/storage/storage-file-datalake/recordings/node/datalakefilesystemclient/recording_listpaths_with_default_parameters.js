let nock = require('nock');

module.exports.hash = "55ec273a66aff7600b4d44178dff6c79";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem171336829442205392","file0":"file0171336829517404849","file1":"file1171336829581407735","file2":"file2171336829593600569"},"newDate":{"now":"2024-04-17T15:38:15.174Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171336829442205392')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 17 Apr 2024 15:38:15 GMT',
  'ETag',
  '"0x8DC5EF466100A56"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c63cdfae-d01e-0019-3ddd-90bd41000000',
  'x-ms-client-request-id',
  '2473685c-9016-4aad-984b-420a572a090e',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 17 Apr 2024 15:38:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171336829442205392/file0171336829517404849')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'ETag',
  '"0x8DC5EF4667BAE23"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f0b70296-901f-0021-76dd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '70a8d171-0d20-45a3-9041-365e13f92a51',
  'Date',
  'Wed, 17 Apr 2024 15:38:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171336829442205392/file1171336829581407735')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'ETag',
  '"0x8DC5EF4668E813C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f0b70299-901f-0021-77dd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '078f4a12-7eca-4b3c-8236-f3c0bf59508f',
  'Date',
  'Wed, 17 Apr 2024 15:38:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171336829442205392/file2171336829593600569')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'ETag',
  '"0x8DC5EF466A11700"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f0b7029a-901f-0021-78dd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '97decf51-897b-4c55-87a2-b3ebbdcb45a6',
  'Date',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem171336829442205392')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133578418964180515","etag":"0x8DC5EF4667BAE23","expiryTime":"0","group":"$superuser","lastModified":"Wed, 17 Apr 2024 15:38:16 GMT","name":"file0171336829517404849","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133578418965414204","etag":"0x8DC5EF4668E813C","expiryTime":"0","group":"$superuser","lastModified":"Wed, 17 Apr 2024 15:38:16 GMT","name":"file1171336829581407735","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133578418966632192","etag":"0x8DC5EF466A11700","expiryTime":"0","group":"$superuser","lastModified":"Wed, 17 Apr 2024 15:38:16 GMT","name":"file2171336829593600569","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f0b7029b-901f-0021-79dd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '1f1bb02f-e1cf-4023-8370-603b6395e27a',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 17 Apr 2024 15:38:16 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171336829442205392/file0171336829517404849')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133578418970816821',
  'x-ms-request-id',
  'f0b7029d-901f-0021-7add-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '0a0a3023-db55-47c2-bd05-f28a890ac683',
  'Date',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171336829442205392/file1171336829581407735')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133578418972302126',
  'x-ms-request-id',
  'f0b7029e-901f-0021-7bdd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  'b67ec5ca-ed5e-4323-97f6-d1f7ead6a628',
  'Date',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171336829442205392/file2171336829593600569')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133578418973718305',
  'x-ms-request-id',
  'f0b7029f-901f-0021-7cdd-90c441000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '3d49718b-d45e-4109-8e2b-0c584d15b1fd',
  'Date',
  'Wed, 17 Apr 2024 15:38:16 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171336829442205392')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c63ce031-d01e-0019-37dd-90bd41000000',
  'x-ms-client-request-id',
  'dfbf11b3-84f2-4e2f-b220-163d91bba912',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 17 Apr 2024 15:38:17 GMT'
]);
