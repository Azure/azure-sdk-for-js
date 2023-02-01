let nock = require('nock');

module.exports.hash = "05b335342361cd93311d4a60c8a5894e";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165940415083207214","file":"file165940415094700536"},"newDate":{"tmr":"2022-08-02T01:35:50.832Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415083207214')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'ETag',
  '"0x8DA742755724AC8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9c1-601e-0034-2710-a6cac9000000',
  'x-ms-client-request-id',
  '7d65f40e-0f34-4ed9-8ecc-541f38f3cd3f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:50 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165940415083207214/file165940415094700536')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'ETag',
  '"0x8DA742755876167"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-scope',
  'test1',
  'x-ms-request-id',
  '7c70b0ef-601f-000b-5210-a6026a000000',
  'x-ms-version',
  '2021-02-12',
  'x-ms-client-request-id',
  '47925e55-e72a-4785-a18a-da5acedad6ab',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165940415083207214')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3326e9ca-601e-0034-2f10-a6cac9000000',
  'x-ms-client-request-id',
  'e7393ded-9a77-47a8-964c-0c03304b8da1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Tue, 02 Aug 2022 01:35:51 GMT'
]);
