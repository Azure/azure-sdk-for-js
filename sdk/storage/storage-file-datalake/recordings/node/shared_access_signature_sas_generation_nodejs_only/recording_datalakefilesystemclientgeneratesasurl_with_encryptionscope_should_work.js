let nock = require('nock');

module.exports.hash = "5b8cd537679f42082233ad69db12107f";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415141609908","file":"file165940415163302019","dir":"dir165940415178604255"},"newDate":{"now":"2022-08-02T01:35:51.633Z","tmr":"2022-08-02T01:35:51.633Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415141609908')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'ETag',
  '"0x8DA742755CB814C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9d6-601e-0034-3a10-a6cac9000000',
  'x-ms-client-request-id',
  'f18349c1-03c3-4e7f-aeb0-b5f33fa81e79',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165940415141609908')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'ETag',
  '"0x8DA742755CB814C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9de-601e-0034-4110-a6cac9000000',
  'x-ms-client-request-id',
  '583a4dc7-0665-4aaf-ab3a-d8943f942485',
  'x-ms-version',
  '2021-08-06',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-immutable-storage-with-versioning-enabled',
  'false',
  'x-ms-default-encryption-scope',
  'test1',
  'x-ms-deny-encryption-scope-override',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-immutable-storage-with-versioning-enabled,x-ms-default-encryption-scope,x-ms-deny-encryption-scope-override,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415141609908/file165940415163302019')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'ETag',
  '"0x8DA742755F407AD"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  '7c70b0f1-601f-000b-5410-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  'dd8fb7a4-0238-4267-abd2-aac9a159a925',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415141609908/dir165940415178604255')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'ETag',
  '"0x8DA74275604D5E3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  '7c70b0f2-601f-000b-5510-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '41657f5d-bbde-44ed-834d-c9e94c0e8047',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem165940415141609908')
  .query(true)
  .reply(200, {"paths":[{"EncryptionScope":"test1","contentLength":"0","creationTime":"133038777522050531","etag":"0x8DA74275604D5E3","expiryTime":"0","group":"$superuser","lastModified":"Tue, 02 Aug 2022 01:35:52 GMT","name":"dir165940415178604255","owner":"$superuser","permissions":"rw-r-----"},{"EncryptionScope":"test1","contentLength":"0","creationTime":"133038777520949165","etag":"0x8DA742755F407AD","expiryTime":"0","group":"$superuser","lastModified":"Tue, 02 Aug 2022 01:35:52 GMT","name":"file165940415163302019","owner":"$superuser","permissions":"rw-r-----"}]}, [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7c70b0f3-601f-000b-5610-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '6dac82f1-20b0-4799-9d7c-a9127b0afe8a',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,Transfer-Encoding,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415141609908/file165940415163302019')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133038777524207085',
  'x-ms-request-id',
  '7c70b0f4-601f-000b-5710-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '90d6ce3c-1256-4485-9b10-712684f0d38f',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415141609908/dir165940415178604255')
  .query(true)
  .reply(200, "", [
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-delete-type-permanent',
  'false',
  'x-ms-deletion-id',
  '133038777525591775',
  'x-ms-request-id',
  '7c70b0f5-601f-000b-5810-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '89e12859-149d-43b7-bb7e-f5e4597da448',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415141609908')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9fe-601e-0034-5e10-a6cac9000000',
  'x-ms-client-request-id',
  'e04bc4d2-0210-4407-bd48-2021e1f397b8',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT'
]);
