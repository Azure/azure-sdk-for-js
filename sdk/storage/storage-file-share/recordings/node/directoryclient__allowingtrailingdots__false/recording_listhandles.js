let nock = require('nock');

module.exports.hash = "23b025b71787a30364a6ae60a747fd6e";

module.exports.testInfo = {"uniqueName":{"share":"share167875883356704972","dir":"dir167875883382101063"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883356704972')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:53 GMT',
  'ETag',
  '"0x8DB242EF74E16DA"',
  'x-ms-request-id',
  '0b0de3b4-701a-0008-2a17-56c247000000',
  'x-ms-client-request-id',
  '57b7bdd9-6121-4c27-8f94-dd44aebeff18',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167875883356704972/dir167875883382101063.')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 14 Mar 2023 01:53:54 GMT',
  'ETag',
  '"0x8DB242EF7788E59"',
  'x-ms-request-id',
  '0b0de3b6-701a-0008-2b17-56c247000000',
  'x-ms-client-request-id',
  '72e5ba9b-f7be-4241-aaa9-d216fbb9fea0',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-03-14T01:53:54.2025817Z',
  'x-ms-file-last-write-time',
  '2023-03-14T01:53:54.2025817Z',
  'x-ms-file-creation-time',
  '2023-03-14T01:53:54.2025817Z',
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
  'Tue, 14 Mar 2023 01:53:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167875883356704972/dir167875883382101063.')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  '0b0de3b7-701a-0008-2c17-56c247000000',
  'x-ms-client-request-id',
  '7c25b233-5459-4f1e-8948-f648b7dc7acf',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 14 Mar 2023 01:53:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167875883356704972')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '0b0de3b8-701a-0008-2d17-56c247000000',
  'x-ms-client-request-id',
  '5c184897-895e-4281-9fc8-4d7143b04a5c',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Tue, 14 Mar 2023 01:53:54 GMT'
]);
