let nock = require('nock');

module.exports.hash = "dd0e58f6fbcff0d89be193196ae8af27";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415273603874","file":"file165940415285201049"},"newDate":{"tmr":"2022-08-02T01:35:52.852Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415273603874')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:53 GMT',
  'ETag',
  '"0x8DA74275694CE62"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326ea4b-601e-0034-0210-a6cac9000000',
  'x-ms-client-request-id',
  '69eb833a-1f66-4be2-85a5-132fe9bc3466',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415273603874/file165940415285201049')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:53 GMT',
  'ETag',
  '"0x8DA742756A8B0B5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  '7c70b0fa-601f-000b-5c10-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '5dee2431-60fe-4b34-8d65-d5c7c1ecc0b2',
  'Date',
  'Tue, 02 Aug 2022 01:35:53 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165940415273603874/file165940415285201049')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:53 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA742756A8B0B5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326ea57-601e-0034-0810-a6cac9000000',
  'x-ms-client-request-id',
  'ceca9270-fe9f-49be-a3e5-9afd77713e8c',
  'x-ms-version',
  '2021-08-06',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Tue, 02 Aug 2022 01:35:53 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-scope,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 02 Aug 2022 01:35:53 GMT'
]);
