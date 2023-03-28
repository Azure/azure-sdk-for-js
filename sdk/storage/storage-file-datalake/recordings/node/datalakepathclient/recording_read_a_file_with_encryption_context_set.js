let nock = require('nock');

module.exports.hash = "071483589e4f9a2df83189db5dc89671";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167782474935205197","file":"file167782474962504072","file1":"file1167782475045405032"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474935205197')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:49 GMT',
  'ETag',
  '"0x8DB1BB021D5D234"',
  'x-ms-request-id',
  '9c31819b-201e-0000-1798-4de568000000',
  'x-ms-client-request-id',
  '89b60c3b-06d9-43fd-9127-bfb1065b6e09',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:49 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474935205197/file167782474962504072')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'ETag',
  '"0x8DB1BB022053569"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f46-601f-0002-4f98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '221b74a5-eea9-41a7-a724-490e7a86a528',
  'Date',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474935205197/file167782474962504072', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f47-601f-0002-5098-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '51ec0a57-8127-40fe-a318-01cf6563f46e',
  'Date',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474935205197/file167782474962504072')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'ETag',
  '"0x8DB1BB022584A92"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'b9fc0f48-601f-0002-5198-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'a43d3352-9916-471d-bd12-8a79b23ed030',
  'Date',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474935205197/file1167782475045405032')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'ETag',
  '"0x8DB1BB022803294"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f49-601f-0002-5299-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '25e6d888-5db0-41ee-83dc-35fff53c7374',
  'Date',
  'Fri, 03 Mar 2023 06:25:50 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474935205197/file1167782475045405032', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f4a-601f-0002-5399-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '31c76877-2b65-4230-8e86-08f5567f840b',
  'Date',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474935205197/file1167782475045405032')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'ETag',
  '"0x8DB1BB022DB52E7"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'b9fc0f4b-601f-0002-5499-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '32aaddbc-7a7f-4355-b957-9b9c31bf99f5',
  'Date',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/filesystem167782474935205197/file1167782475045405032')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1BB022DB52E7"',
  'x-ms-request-id',
  '9c31819d-201e-0000-1899-4de568000000',
  'x-ms-client-request-id',
  'be3df5c9-7bf4-437f-af9e-495698f549e7',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Fri, 03 Mar 2023 06:25:51 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-context',
  'EncryptionContext',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Date',
  'Fri, 03 Mar 2023 06:25:51 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782474935205197')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9c31819e-201e-0000-1999-4de568000000',
  'x-ms-client-request-id',
  'd29683c8-49da-47db-b9d5-ddcd435d3c81',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:51 GMT'
]);
