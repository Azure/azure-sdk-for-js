let nock = require('nock');

module.exports.hash = "12a2e874f5ac69d51dcdd4c95c84d982";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem167782474464604150","file":"file167782474492006795","testfile":"testfile167782474646306711"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474464604150')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:45 GMT',
  'ETag',
  '"0x8DB1BB01F07E14B"',
  'x-ms-request-id',
  '9c318187-201e-0000-0798-4de568000000',
  'x-ms-client-request-id',
  'f4c35d0e-1c68-408b-a85a-798280ae312b',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:44 GMT'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474464604150/file167782474492006795')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'ETag',
  '"0x8DB1BB01FA31351"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f3d-601f-0002-4798-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '279c8334-f3f7-4145-93c8-c5da5ad11ede',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474464604150/file167782474492006795', "Hello World")
  .query(true)
  .reply(202, "", [
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f3f-601f-0002-4898-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  '97aedc38-cf1a-4ac6-8e98-98a28cff6f3d',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem167782474464604150/file167782474492006795')
  .query(true)
  .reply(200, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'ETag',
  '"0x8DB1BB01FF72A16"',
  'x-ms-request-server-encrypted',
  'false',
  'x-ms-request-id',
  'b9fc0f40-601f-0002-4998-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'faf9d6b6-bc6d-414a-bd86-cd22ab6f82a4',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem167782474464604150/testfile167782474646306711')
  .query(true)
  .reply(201, "", [
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'ETag',
  '"0x8DB1BB0201F303A"',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'b9fc0f41-601f-0002-4a98-4de805000000',
  'x-ms-version',
  '2022-11-02',
  'x-ms-client-request-id',
  'fad7e71d-93ba-46b9-8772-dd1de7c55334',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT',
  'Content-Length',
  '0'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem167782474464604150/testfile167782474646306711')
  .reply(200, "", [
  'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 03 Mar 2023 06:25:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB1BB0201F303A"',
  'x-ms-request-id',
  '9c31818a-201e-0000-0898-4de568000000',
  'x-ms-client-request-id',
  'fab212c5-4729-4e86-8030-20adbabcb768',
  'x-ms-version',
  '2021-12-02',
  'x-ms-resource-type',
  'file',
  'x-ms-creation-time',
  'Fri, 03 Mar 2023 06:25:47 GMT',
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
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-r-----',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem167782474464604150')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '9c31818c-201e-0000-0998-4de568000000',
  'x-ms-client-request-id',
  'd165dd67-7c85-4856-8987-c58681c19e3a',
  'x-ms-version',
  '2021-12-02',
  'Date',
  'Fri, 03 Mar 2023 06:25:46 GMT'
]);
