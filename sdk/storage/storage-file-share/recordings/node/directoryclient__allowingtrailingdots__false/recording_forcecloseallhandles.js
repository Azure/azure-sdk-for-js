let nock = require('nock');

module.exports.hash = "9898d73f1792f47eaa7bbe2aca4c97b3";

module.exports.testInfo = {"uniqueName":{"share":"share167875884106805550","dir":"dir167875884131909920"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884106805550')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:01 GMT',
  'ETag',
  '"0x8DB242EFBC683F0"',
  'x-ms-request-id',
  'fd6a9f9d-e01a-0007-2d17-56fda4000000',
  'x-ms-client-request-id',
  '0611d887-1b34-4040-8272-cc785c97976d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884106805550/dir167875884131909920.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:54:01 GMT',
  'ETag',
  '"0x8DB242EFBF2BD17"',
  'x-ms-request-id',
  'fd6a9f9f-e01a-0007-2e17-56fda4000000',
  'x-ms-client-request-id',
  '314e362b-2f2e-40d7-9ff8-d54e06fd59f5',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:54:01.7142039Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:54:01.7142039Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:54:01.7142039Z',
  'x-ms-file-permission-key',
  '10761449611457319216*1871445747569276785',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 14 Mar 2023 01:54:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875884106805550/dir167875884131909920.')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9fa0-e01a-0007-2f17-56fda4000000',
  'x-ms-client-request-id',
  '960f7057-42d4-4879-817c-fe68b6631c10',
  'x-ms-version',
  '2022-11-02',
  'x-ms-number-of-handles-closed',
  '0',
  'x-ms-number-of-handles-failed',
  '0',
  'Date',
  'Tue, 14 Mar 2023 01:54:01 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875884106805550')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'fd6a9fa1-e01a-0007-3017-56fda4000000',
  'x-ms-client-request-id',
  'af54eef1-42cb-4463-8e62-a98a118474c6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:54:01 GMT'
]);
