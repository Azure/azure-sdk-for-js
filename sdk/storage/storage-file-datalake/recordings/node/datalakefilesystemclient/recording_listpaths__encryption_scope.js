let nock = require('nock');

module.exports.hash = "580a123333f183d0031b26c04ea2f629";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154750174309625","filesystem169154750174309625":"filesystem169154750174309625169154750189800540","file":"file169154750202107484","dir":"dir169154750214603965"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750174309625')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'ETag',
  '"0x8DB987EE704F22A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c2625f-101e-002e-2267-caab16000000',
  'x-ms-client-request-id',
  '58457d7c-c171-448d-9c9d-6aca6f3d4a17',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750174309625169154750189800540')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'ETag',
  '"0x8DB987EE71D3188"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26270-101e-002e-3167-caab16000000',
  'x-ms-client-request-id',
  '4ce7704b-3ae3-4463-8521-239a3952c4a9',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750174309625169154750189800540/file169154750202107484')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'ETag',
  '"0x8DB987EE7320240"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f1673d32-f01f-0054-7867-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5c8aeb42-dbc3-4c47-9d2b-ed2c1319fa55',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154750174309625169154750189800540/dir169154750214603965')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'ETag',
  '"0x8DB987EE7438030"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  'f1673d33-f01f-0054-7967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9260d963-faf3-4b2f-ae22-7c4965f3b969',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154750174309625169154750189800540')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211016319024","etag":"0x8DB987EE7438030","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:21 GMT","name":"dir169154750214603965","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133360211015172672","etag":"0x8DB987EE7320240","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:21 GMT","name":"file169154750202107484","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673d34-f01f-0054-7a67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '9cc19f6e-9deb-4dd8-8230-0a5a510435a7',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:20 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750174309625169154750189800540/file169154750202107484')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211018859142',
  'x-ms-request-id',
  'f1673d36-f01f-0054-7c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '5b2e45a9-ad35-46bd-af56-a07924257864',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750174309625169154750189800540/dir169154750214603965')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211020320944',
  'x-ms-request-id',
  'f1673d37-f01f-0054-7d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '69e2a187-ceb5-4990-ab37-e5a52da988db',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154750174309625')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c262c6-101e-002e-0267-caab16000000',
  'x-ms-client-request-id',
  'd9b31ff7-0bbc-4b75-8c38-92fbfa82b58f',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:21 GMT'
]);
