let nock = require('nock');

module.exports.hash = "d3198c97872e2a626a27d2ac1e3cdde1";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167703368609102416","file":"file167703368621309524","dirname":"dirname167703368658305293"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368609102416')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'ETag',
  '"0x8DB147E4B32D570"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64ef7-f01e-0019-0b67-4679ba000000',
  'x-ms-client-request-id',
  '4302b931-842c-4507-8c74-a9ae3f7ce0da',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:25 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368609102416/file167703368621309524')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'ETag',
  '"0x8DB147E4B4741BB"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966eb-501f-004d-4167-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  'cdcedd8b-e13c-4911-bcee-063086554ea4',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368609102416/file167703368621309524', "Hello World")
  .query(true)
  .reply(202, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966ec-501f-004d-4267-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '5b9bc67c-2aec-4540-86e4-ed89ffc4f882',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167703368609102416/file167703368621309524')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'ETag',
  '"0x8DB147E4B6CE654"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  '53f966ed-501f-004d-4367-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '7b457517-0860-487a-93f0-95a5eb601410',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167703368609102416/dirname167703368658305293')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'ETag',
  '"0x8DB147E4B7DFE4B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '53f966ee-501f-004d-4467-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '23689be0-369e-4f7e-9f85-079f51c5fa3f',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167703368609102416')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133215072868040267","etag":"0x8DB147E4B7DFE4B","expiryTime":"0","group":"$superuser","isDirectory":"true","lastModified":"Wed, 22 Feb 2023 02:41:26 GMT","name":"dirname167703368658305293","owner":"$superuser","permissions":"rwxr-x---"},{"contentLength":"11","creationTime":"133215072864453051","etag":"0x8DB147E4B6CE654","expiryTime":"0","group":"$superuser","lastModified":"Wed, 22 Feb 2023 02:41:26 GMT","name":"file167703368621309524","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53f966ef-501f-004d-4567-4636ed000000',
  'x-ms-version',
  '2021-12-02',
  'x-ms-client-request-id',
  '7a240282-e9b0-4047-b360-e26751d7f161',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167703368609102416')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '21a64f82-f01e-0019-0767-4679ba000000',
  'x-ms-client-request-id',
  'fcf39a03-938b-4e60-807e-225875237560',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Wed, 22 Feb 2023 02:41:26 GMT'
]);
