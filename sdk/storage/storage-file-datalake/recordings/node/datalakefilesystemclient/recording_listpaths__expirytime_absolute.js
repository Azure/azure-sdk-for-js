let nock = require('nock');

module.exports.hash = "c64799872481f148782acae6cc75871a";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem171335510095907554","file":"file171335510250001264"},"newDate":{"now":"2024-04-17T11:58:22.500Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171335510095907554')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 17 Apr 2024 11:58:22 GMT',
  'ETag',
  '"0x8DC5ED5AE2C0C93"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1180ea03-e01e-006a-49be-903247000000',
  'x-ms-client-request-id',
  'fa8b9bc9-f34a-4e8a-a0bb-27a28b655d62',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 17 Apr 2024 11:58:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171335510095907554/file171335510250001264')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'ETag',
  '"0x8DC5ED5AEF3B859"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1424581e-e01f-0002-3dbe-902874000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '2e790e67-03c5-405e-b896-2eff8ef0b186',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem171335510095907554/file171335510250001264', "Hello, World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '1424581f-e01f-0002-3ebe-902874000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '239ef248-3a57-42b7-89fd-7e7dfdbe3b8a',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem171335510095907554/file171335510250001264')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'ETag',
  '"0x8DC5ED5AF187CAA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '14245820-e01f-0002-3fbe-902874000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '4b7c12a5-e3ee-4419-9437-b76c7a7ce1d9',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem171335510095907554/file171335510250001264')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'ETag',
  '"0x8DC5ED5AF187CAA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1180ea8c-e01e-006a-22be-903247000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '899dd7d9-5977-49cd-8ae7-fb352a05b1fb',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem171335510095907554')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"133578287036020825","etag":"0x8DC5ED5AF187CAA","expiryTime":"133578287320000000","group":"$superuser","lastModified":"Wed, 17 Apr 2024 11:58:23 GMT","name":"file171335510250001264","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14245822-e01f-0002-40be-902874000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '536da838-5cc8-4a3a-82b4-422737c0eac4',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171335510095907554/file171335510250001264')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133578287042188014',
  'x-ms-request-id',
  '14245823-e01f-0002-41be-902874000000',
  'x-ms-version',
  '2024-05-04',
  'x-ms-client-request-id',
  '4f890896-eca5-408f-87a9-37002a045138',
  'Date',
  'Wed, 17 Apr 2024 11:58:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem171335510095907554')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1180eaab-e01e-006a-3ebe-903247000000',
  'x-ms-client-request-id',
  '2a09e03d-a845-466f-b1ab-23b39a6bbde2',
  'x-ms-version',
  '2024-05-04',
  'Date',
  'Wed, 17 Apr 2024 11:58:24 GMT'
]);
