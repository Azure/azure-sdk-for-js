let nock = require('nock');

module.exports.hash = "ff9551cd16638e8557fb0cfbca3cb6cf";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750390509195","filesystem169154750390509195":"filesystem169154750390509195169154750404404313","file":"file169154750417900987","dir":"dir169154750431500127"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750390509195')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'ETag',
  '"0x8DB987EE84ECDC6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26342-101e-002e-6967-caab16000000',
  'x-ms-client-request-id',
  'cfd003c1-2ade-4e19-8d90-26042396598a',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750390509195169154750404404313')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'ETag',
  '"0x8DB987EE8640060"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26354-101e-002e-7867-caab16000000',
  'x-ms-client-request-id',
  'adfd535b-59e4-4eef-b920-7e16c851d544',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750390509195169154750404404313/file169154750417900987')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'ETag',
  '"0x8DB987EE87A1796"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f1673d3d-f01f-0054-0367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c5115cd3-6c7c-472d-93c8-66a9e7196941',
  'Date',
  'Wed, 09 Aug 2023 02:18:22 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750390509195169154750404404313/dir169154750431500127')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'ETag',
  '"0x8DB987EE88E37AA"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f1673d3e-f01f-0054-0467-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '05a69d03-bd2f-47ee-bab5-b504c9108bc4',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750390509195169154750404404313')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211037992874","etag":"0x8DB987EE88E37AA","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:23 GMT","name":"dir169154750431500127","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211036673942","etag":"0x8DB987EE87A1796","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:23 GMT","name":"file169154750417900987","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d3f-f01f-0054-0567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'eccb8bbf-f3a8-4ecf-8191-4a209a361e79',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750390509195169154750404404313/file169154750417900987')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211040676687',
  'x-ms-request-id',
  'f1673d40-f01f-0054-0667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'b2ce9ea2-b9fa-40c2-a1c1-3a9a82f063e2',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750390509195169154750404404313/dir169154750431500127')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211042185097',
  'x-ms-request-id',
  'f1673d43-f01f-0054-0767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'f63399fb-4890-43a6-a7e1-270c474b52a5',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750390509195')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c263ae-101e-002e-4167-caab16000000',
  'x-ms-client-request-id',
  'f42d4262-291d-43f8-bff9-4286f0588b4f',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:23 GMT'
]);
