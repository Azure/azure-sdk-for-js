let nock = require('nock');

module.exports.hash = "e8b6a92670f0f0b3b1a2aa1ce3e797be";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415238609298","directory":"directory165940415250100356"},"newDate":{"tmr":"2022-08-02T01:35:52.501Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415238609298')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'ETag',
  '"0x8DA7427565F4740"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326ea08-601e-0034-6510-a6cac9000000',
  'x-ms-client-request-id',
  '5fd739ee-74cc-4b33-972e-0d7ff314e61d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415238609298/directory165940415250100356')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'ETag',
  '"0x8DA74275672C610"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  '7c70b0f6-601f-000b-5910-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '58ae5f59-3147-4115-8987-900e66f04f82',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem165940415238609298/directory165940415250100356')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:52 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA74275672C610"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326ea40-601e-0034-7910-a6cac9000000',
  'x-ms-client-request-id',
  'b260c228-a12b-467b-8c61-f58dbe66508b',
  'x-ms-version',
  '2021-08-06',
  'x-ms-resource-type',
  'directory',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-creation-time',
  'Tue, 02 Aug 2022 01:35:52 GMT',
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
  'rwxr-x---',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,x-ms-meta-hdi_isfolder,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-scope,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 02 Aug 2022 01:35:52 GMT'
]);
