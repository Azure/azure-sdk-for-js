let nock = require('nock');

module.exports.hash = "b5fdbbe44c2762c8a087a2b955380ccc";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750802107967","file":"file169154750816106955"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750802107967')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'ETag',
  '"0x8DB987EEAC2CCAE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2653e-101e-002e-7767-caab16000000',
  'x-ms-client-request-id',
  '41d4122b-283c-46ea-8f26-a75be03d7fb7',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750802107967/file169154750816106955')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'ETag',
  '"0x8DB987EEAD9932C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d56-f01f-0054-1a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '59c4dab0-f8f9-48ca-a03b-c1b474a28016',
  'Date',
  'Wed, 09 Aug 2023 02:18:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750802107967/file169154750816106955', "Hello, World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d57-f01f-0054-1b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '8d40bf80-71b5-4016-bf3c-4f07a0affa6a',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem169154750802107967/file169154750816106955')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'ETag',
  '"0x8DB987EEB02ADF0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'f1673d5a-f01f-0054-1c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '4ecd6a77-9bd9-4d00-8492-ec6fe0f3225c',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750802107967/file169154750816106955')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'ETag',
  '"0x8DB987EEB02ADF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26573-101e-002e-1e67-caab16000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '362c4873-92be-422e-9f0c-45dbdabef810',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750802107967')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"12","creationTime":"133360211076485932","etag":"0x8DB987EEB02ADF0","expiryTime":"133360247076485932","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:27 GMT","name":"file169154750816106955","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d5b-f01f-0054-1d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e6cc5f99-b858-4908-823f-bc04f1d80c7a',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750802107967/file169154750816106955')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211083167363',
  'x-ms-request-id',
  'f1673d5e-f01f-0054-2067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '07b28876-7ee9-40a0-a85b-406d3900abdd',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750802107967')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c265a4-101e-002e-3f67-caab16000000',
  'x-ms-client-request-id',
  'e36478b1-d74f-46f8-8482-a9d9e7c6b850',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT'
]);
