let nock = require('nock');

module.exports.hash = "0c88ba1452b682193d7fb023282bf984";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750911901503","file0":"file0169154750925608774","file1":"file1169154750939003267","file2":"file2169154750951808402"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750911901503')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'ETag',
  '"0x8DB987EEB6A3EAD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c265d2-101e-002e-6867-caab16000000',
  'x-ms-client-request-id',
  '30202810-0f3c-407b-a4be-9490984fa0fe',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750911901503/file0169154750925608774')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'ETag',
  '"0x8DB987EEB80F43B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d63-f01f-0054-2567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'e9829480-7444-4396-8f15-a12182a0f22e',
  'Date',
  'Wed, 09 Aug 2023 02:18:27 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750911901503/file1169154750939003267')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'ETag',
  '"0x8DB987EEB94A1B1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d64-f01f-0054-2667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c447572a-0819-4504-b30e-95a76c88bbe2',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750911901503/file2169154750951808402')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:29 GMT',
  'ETag',
  '"0x8DB987EEBA81A78"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d65-f01f-0054-2767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9c3d924d-12d7-4d7b-b479-089d9d9d3b53',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750911901503')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211087455291","etag":"0x8DB987EEB80F43B","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:28 GMT","name":"file0169154750925608774","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211088744881","etag":"0x8DB987EEB94A1B1","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:28 GMT","name":"file1169154750939003267","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211090020984","etag":"0x8DB987EEBA81A78","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:29 GMT","name":"file2169154750951808402","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d66-f01f-0054-2867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5dc92c3f-9100-43db-b589-9a25f6feaa52',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750911901503/file0169154750925608774')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211092550824',
  'x-ms-request-id',
  'f1673d69-f01f-0054-2b67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '16745ebb-2bf6-4731-980b-2cbe7f3aa6a3',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750911901503/file1169154750939003267')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211094037109',
  'x-ms-request-id',
  'f1673d6d-f01f-0054-2f67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '55ca7d6d-9620-41c9-93b8-2f2aa6cf6dfb',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750911901503/file2169154750951808402')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211095448613',
  'x-ms-request-id',
  'f1673d6f-f01f-0054-3167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '00ff663f-9914-4e36-adfb-a90791709545',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750911901503')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c266e1-101e-002e-5d67-caab16000000',
  'x-ms-client-request-id',
  '397df243-c829-495d-86cc-0c4c203c8649',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:28 GMT'
]);
