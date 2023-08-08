let nock = require('nock');

module.exports.hash = "9745a8ec81c6a7c3ca3d07f7d6ea6d61";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154833415704542","file0":"file0169154833494509955","file1":"file1169154833565109979","file2":"file2169154833580907384","file3":"file3169154833594606642"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833415704542')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:14 GMT',
  'ETag',
  '"0x8DB9880D78CDEB2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadc99a-601e-0046-3569-cacd86000000',
  'x-ms-client-request-id',
  '80ce6e49-8a06-4f7a-8156-72613a5de11b',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833415704542/file0169154833494509955')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'ETag',
  '"0x8DB9880D7FF3975"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1d1-601f-0024-2169-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b3b83880-86ee-48fe-bebe-a78f7c9480a9',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833415704542/file1169154833565109979')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'ETag',
  '"0x8DB9880D816EC2D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1d2-601f-0024-2269-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '86d38e5c-7d62-4d1b-b646-6ef796dbba53',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833415704542/file2169154833580907384')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'ETag',
  '"0x8DB9880D82C2096"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1d3-601f-0024-2369-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c30811f5-0d7d-4b5c-91a8-aa82b9cfbf8e',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154833415704542/file3169154833594606642')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'ETag',
  '"0x8DB9880D8410E7D"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e7aa1d6-601f-0024-2669-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4f1df8a3-d993-4a3e-94d6-a9e9e3cab3ef',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154833415704542')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360219350120821","etag":"0x8DB9880D7FF3975","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:32:15 GMT","name":"file0169154833494509955","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360219351673901","etag":"0x8DB9880D816EC2D","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:32:15 GMT","name":"file1169154833565109979","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360219353063574","etag":"0x8DB9880D82C2096","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:32:15 GMT","name":"file2169154833580907384","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360219354435197","etag":"0x8DB9880D8410E7D","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:32:15 GMT","name":"file3169154833594606642","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e7aa1d8-601f-0024-2869-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e78373c0-03ea-4ede-ae84-cf7794342591',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:32:14 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833415704542/file0169154833494509955')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219357269615',
  'x-ms-request-id',
  '0e7aa1d9-601f-0024-2969-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5b944f15-47d0-4e20-876c-4aaa6c9090c7',
  'Date',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833415704542/file1169154833565109979')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219358771354',
  'x-ms-request-id',
  '0e7aa1da-601f-0024-2a69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ffecba2a-552a-41cc-877a-f4e0a7f89f50',
  'Date',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833415704542/file2169154833580907384')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219360188074',
  'x-ms-request-id',
  '0e7aa1db-601f-0024-2b69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '16fa0c28-4fa3-409b-b773-5c96ea6ce6c2',
  'Date',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833415704542/file3169154833594606642')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360219361602279',
  'x-ms-request-id',
  '0e7aa1df-601f-0024-2f69-ca0fa1000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '37cafca1-01a4-48c3-847f-7f600129e160',
  'Date',
  'Wed, 09 Aug 2023 02:32:15 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154833415704542')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0aadca7a-601e-0046-7c69-cacd86000000',
  'x-ms-client-request-id',
  'd8e942ea-5286-4bd2-8a3f-0e4a4f110d88',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:32:16 GMT'
]);
