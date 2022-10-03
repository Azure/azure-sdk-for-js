let nock = require('nock');

module.exports.hash = "07a56fc20f56dfb14e599dbc5242e0e0";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem164865535362606013","file":"file164865535549002050"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164865535362606013')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Wed, 30 Mar 2022 15:49:15 GMT',
  'ETag',
  '"0x8DA1264D7F48458"',
  'x-ms-request-id',
  '9eaa2f20-601e-0002-7d4d-44e805000000',
  'x-ms-client-request-id',
  '581875b1-ec13-4b93-950d-e8b8b4b30950',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 15:49:15 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem164865535362606013/file164865535549002050')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'ETag',
  '"0x8DA1264D8E7A201"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12ecdb-a01f-0003-1c4d-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'd7e522e9-ab6f-413f-b384-a7e3d6adff94',
  'Date',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164865535362606013/file164865535549002050', "Hello, World!")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12ecdc-a01f-0003-1d4d-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  'e3d227b6-6c98-4800-a39b-dbe0a3c985f3',
  'Date',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem164865535362606013/file164865535549002050')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'ETag',
  '"0x8DA1264D93C86EB"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  '2f12ecdd-a01f-0003-1e4d-441608000000',
  'x-ms-version',
  '2021-06-08',
  'x-ms-client-request-id',
  '267d5967-1dd7-4b22-8c56-e16d593d6531',
  'Date',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem164865535362606013/file164865535549002050')
  .reply(200, "Hello, World!", [
  'Content-Length',
  '13',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1264D93C86EB"',
  'x-ms-request-id',
  '9eaa2f25-601e-0002-7e4d-44e805000000',
  'x-ms-client-request-id',
  'fba081d4-4568-4074-8f7f-8d0dfe319ddc',
  'x-ms-version',
  '2021-04-10',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Wed, 30 Mar 2022 15:49:17 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-resource-type,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,x-ms-owner,x-ms-group,x-ms-permissions',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 30 Mar 2022 15:49:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem164865535362606013')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9eaa2f26-601e-0002-7f4d-44e805000000',
  'x-ms-client-request-id',
  '80c42f10-3e0d-47e9-8fe8-7a3ab6d94a7e',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Wed, 30 Mar 2022 15:49:18 GMT'
]);
