let nock = require('nock');

module.exports.hash = "3df8c3f0bf2a256b593916563bb79a02";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750502700360","file":"file169154750517605368"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750502700360')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'ETag',
  '"0x8DB987EE8FA0FBC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c263c3-101e-002e-5367-caab16000000',
  'x-ms-client-request-id',
  'dda4b9b6-41f3-4925-944c-72e63bd9e379',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750502700360/file169154750517605368')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'ETag',
  '"0x8DB987EE9122E80"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673d44-f01f-0054-0867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'a2349a05-9087-4d7a-8ce0-2cb3a667cc1b',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750502700360/file169154750517605368')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'ETag',
  '"0x8DB987EE9122E80"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c263e8-101e-002e-7267-caab16000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '299c0968-b7c3-4ba2-91d0-5f0be4e0a8a7',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750502700360')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211046641280","etag":"0x8DB987EE9122E80","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:24 GMT","name":"file169154750517605368","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d45-f01f-0054-0967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9b281096-5fbd-4317-a3f3-c0a1f7bb0393',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750502700360/file169154750517605368')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211050683536',
  'x-ms-request-id',
  'f1673d46-f01f-0054-0a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '64fc0ff2-7de9-49d3-8b97-8be6cff2be8f',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750502700360')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26417-101e-002e-1b67-caab16000000',
  'x-ms-client-request-id',
  'ec40ebda-8153-432c-9f76-05a6be38645d',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:24 GMT'
]);
