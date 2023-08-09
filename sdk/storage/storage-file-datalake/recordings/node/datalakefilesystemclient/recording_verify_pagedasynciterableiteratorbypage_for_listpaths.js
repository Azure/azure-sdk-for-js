let nock = require('nock');

module.exports.hash = "12fa4a0581c9aceb77550eb3d7c04799";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem169154751228504220","file0":"file0169154751241407892","file1":"file1169154751254309197","file2":"file2169154751266702002","file3":"file3169154751279600449"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751228504220')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'ETag',
  '"0x8DB987EED4D8495"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c267da-101e-002e-1e67-caab16000000',
  'x-ms-client-request-id',
  '0ce6a2be-859d-40c3-9034-199fe2a06b24',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:30 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751228504220/file0169154751241407892')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'ETag',
  '"0x8DB987EED623323"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673e25-f01f-0054-4167-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '6e6b0aae-8591-405c-8d95-b620edfc9249',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751228504220/file1169154751254309197')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'ETag',
  '"0x8DB987EED757300"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673e30-f01f-0054-4c67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '7df5aff9-8445-45c5-b288-78f738d242b0',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751228504220/file2169154751266702002')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'ETag',
  '"0x8DB987EED882E14"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673e3b-f01f-0054-5767-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '0a2bb426-7d59-41cf-a9fa-3417518fe4b0',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem169154751228504220/file3169154751279600449')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'ETag',
  '"0x8DB987EED9BDEE4"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f1673e51-f01f-0054-6d67-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '3b6e5746-8ffa-4562-bead-028817d5428f',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751228504220')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211118994211","etag":"0x8DB987EED623323","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:31 GMT","name":"file0169154751241407892","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211120255744","etag":"0x8DB987EED757300","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:32 GMT","name":"file1169154751254309197","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-continuation',
  'VBa43orq15uQu6oBGGkYZC9lbW1hZGF0YWxha2UBMDFENkZBMDAwMTkxNjUzNy9maWxlc3lzdGVtMTY5MTU0NzUxMjI4NTA0MjIwATAxRDlDQTY3Q0FENkMwMjkvZmlsZTIxNjkxNTQ3NTEyNjY3MDIwMDIWAAAA',
  'x-ms-request-id',
  'f1673e5f-f01f-0054-7967-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'c9e9b82e-d10d-4e19-bc31-bf1526b9f814',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-continuation,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem169154751228504220')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","creationTime":"133360211121483284","etag":"0x8DB987EED882E14","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:32 GMT","name":"file2169154751266702002","owner":"$superuser","permissions":"rw-r-----"},{"contentLength":"0","creationTime":"133360211122773732","etag":"0x8DB987EED9BDEE4","expiryTime":"0","group":"$superuser","lastModified":"Wed, 09 Aug 2023 02:18:32 GMT","name":"file3169154751279600449","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f1673e69-f01f-0054-0267-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '82d987d1-8701-4b3e-85c2-d5a4a6812e4a',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751228504220/file0169154751241407892')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211126678708',
  'x-ms-request-id',
  'f1673e7c-f01f-0054-1567-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  'ecc80266-4812-47d9-91a9-45bd59da2612',
  'Date',
  'Wed, 09 Aug 2023 02:18:31 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751228504220/file1169154751254309197')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211128237300',
  'x-ms-request-id',
  'f1673e8a-f01f-0054-2367-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '14548f30-f13c-47e5-bef0-2e8fb27ca657',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751228504220/file2169154751266702002')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211129785071',
  'x-ms-request-id',
  'f1673e97-f01f-0054-3067-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '2d4f239a-0f24-4c8e-b2fc-b531b5c52a8c',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751228504220/file3169154751279600449')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133360211131197675',
  'x-ms-request-id',
  'f1673e9d-f01f-0054-3667-cab656000000',
  'x-ms-version',
  '2023-08-03',
  'x-ms-client-request-id',
  '20668a92-03d2-4c07-b68b-b92a4b7fff54',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem169154751228504220')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28c26908-101e-002e-3667-caab16000000',
  'x-ms-client-request-id',
  '02064c20-e9fc-43d2-a32d-0e3fc94bbc09',
  'x-ms-version',
  '2023-08-03',
  'Date',
  'Wed, 09 Aug 2023 02:18:32 GMT'
]);
